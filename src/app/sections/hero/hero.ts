import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { PROFILE } from '../../data/site.data';
import { ConsentService } from '../../services/consent';
import { LanguageService } from '../../services/language';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: { '(window:scroll)': 'onWindowScroll()' },
})
export class Hero {
  protected readonly content = inject(LanguageService).content;
  protected readonly profile = PROFILE;
  protected readonly consent = inject(ConsentService);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly scrollY = signal(0);
  private readonly rotatingWordIndex = signal(0);
  private readonly previousRotatingWord = signal<string | null>(null);

  protected readonly rotatingWord = computed(() => {
    const words = this.content().hero.rotating;
    return words[this.rotatingWordIndex() % words.length];
  });
  protected readonly exitingRotatingWords = computed(() => {
    const word = this.previousRotatingWord();
    return word ? [word] : [];
  });

  protected readonly blueBlobShift = computed(
    () => `translate3d(0, ${this.scrollY() * 0.15}px, 0)`,
  );
  protected readonly peachBlobShift = computed(
    () => `translate3d(0, ${this.scrollY() * -0.18}px, 0)`,
  );
  protected readonly cyanBlobShift = computed(
    () => `translate3d(0, ${this.scrollY() * 0.25}px, 0)`,
  );
  protected readonly portraitShift = computed(
    () => `translate3d(0, ${this.scrollY() * 0.4}px, 0)`,
  );

  constructor() {
    if (isPlatformBrowser(this.platformId) && !this.reducedMotion) {
      const rotationTimer = window.setInterval(() => {
        this.previousRotatingWord.set(this.rotatingWord());
        this.rotatingWordIndex.update((index) => index + 1);
      }, 3200);

      this.destroyRef.onDestroy(() => window.clearInterval(rotationTimer));
    }
  }

  protected onWindowScroll(): void {
    if (!this.reducedMotion) {
      this.scrollY.set(Math.min(window.scrollY, 1000));
    }
  }
}
