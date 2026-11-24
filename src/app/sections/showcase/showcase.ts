import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { DEMOS } from '../../data/demos.data';
import { DemoSite } from '../../models/portfolio.models';
import { ContactPrefill } from '../../services/contact-prefill';
import { LanguageService } from '../../services/language';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Share of a card that must be uncovered and on screen before its video plays. */
const PLAY_THRESHOLD = 0.35;

/**
 * Industry showcase: one card per live demo, each in that demo's own colours,
 * with a phone playing a scroll recording of the real site. On large screens
 * the cards stack on top of each other while scrolling (sticky + CSS scroll
 * timeline); on phones they simply follow each other.
 *
 * Only the card the visitor is actually looking at plays its video – cards
 * covered by the next one in the stack pause – and nothing autoplays under
 * prefers-reduced-motion or Save-Data.
 */
@Component({
  selector: 'app-showcase',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './showcase.html',
  styleUrl: './showcase.css',
})
export class Showcase {
  protected readonly content = inject(LanguageService).content;
  private readonly prefill = inject(ContactPrefill);
  protected readonly demos = DEMOS;

  /** Index of the card currently in view (-1: none) – highlights the index chip. */
  protected readonly active = signal(-1);

  /** Cards whose video has started playing at least once – the video then covers the still. */
  protected readonly started = signal<number[]>([]);

  private readonly items = viewChildren<ElementRef<HTMLElement>>('item');
  private readonly videos = viewChildren<ElementRef<HTMLVideoElement>>('video');

  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject<ElementRef<HTMLElement>>(ElementRef);

    afterNextRender(() => {
      const autoplay = !(
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
      );

      let frame = 0;
      const schedule = () => {
        if (!frame)
          frame = requestAnimationFrame(() => {
            frame = 0;
            this.update(autoplay);
          });
      };

      // Only listen to scrolling while the showcase is anywhere near the viewport.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            addEventListener('scroll', schedule, { passive: true });
            addEventListener('resize', schedule, { passive: true });
            schedule();
          } else {
            removeEventListener('scroll', schedule);
            removeEventListener('resize', schedule);
            this.setActive(-1, autoplay);
          }
        },
        { rootMargin: '10% 0px' },
      );
      observer.observe(host.nativeElement);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        removeEventListener('scroll', schedule);
        removeEventListener('resize', schedule);
        cancelAnimationFrame(frame);
      });
    });
  }

  protected markStarted(index: number): void {
    if (!this.started().includes(index)) this.started.update((list) => [...list, index]);
  }

  protected requestSimilar(demo: DemoSite): void {
    const content = this.content();
    this.prefill.set(
      content.contact.prefill.replace('{demo}', content.showcase.demos[demo.industry].name),
    );
  }

  /** Finds the card that is most visible – counting the next card in the stack as a cover. */
  private update(autoplay: boolean): void {
    const rects = this.items().map((item) => item.nativeElement.getBoundingClientRect());
    const viewport = innerHeight;
    let best = -1;
    let bestShare = PLAY_THRESHOLD;

    rects.forEach((rect, index) => {
      const next = rects[index + 1];
      const bottom = Math.min(
        rect.bottom,
        viewport,
        next && next.top < rect.bottom ? next.top : Infinity,
      );
      const visible = Math.max(0, bottom - Math.max(rect.top, 0));
      const share = visible / Math.min(rect.height, viewport);
      if (share > bestShare) {
        bestShare = share;
        best = index;
      }
    });

    this.setActive(best, autoplay);
  }

  private setActive(index: number, autoplay: boolean): void {
    if (index === this.active()) return;
    this.active.set(index);

    this.videos().forEach(({ nativeElement: video }, videoIndex) => {
      if (videoIndex === index && autoplay) {
        // Set as a property: the attribute alone is not reliably honoured after
        // hydration, and unmuted videos are not allowed to autoplay.
        video.muted = true;
        video.play().catch(() => {
          /* Autoplay refused (e.g. low-power mode): the poster stays. */
        });
      } else if (!video.paused) {
        video.pause();
      }
    });
  }
}
