import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PROFILE } from '../../data/site.data';

/**
 * Hero section with portrait, subtle scroll parallax and CTAs.
 * Parallax uses transform-only updates (GPU compositing, no layout work)
 * and is disabled for users who prefer reduced motion.
 */
@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  host: { '(window:scroll)': 'onWindowScroll()' },
})
export class Hero {
  protected readonly profile = PROFILE;

  /** Short trust arguments shown below the CTAs. */
  protected readonly trustPoints = [
    'Maßgeschneidert statt Baukasten',
    'Performance & SEO inklusive',
    'Ein Ansprechpartner – von Konzept bis Launch',
  ];

  /** True when the OS asks for reduced motion – parallax stays off then. */
  private readonly reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Current scroll position, clamped to the range where the hero is visible. */
  private readonly scrollY = signal(0);

  /** Background glows move slowest – they appear farthest away. */
  protected readonly glowShift = computed(() => `translate3d(0, ${this.scrollY() * 0.3}px, 0)`);

  /** The portrait lags slightly behind the scroll for a gentle depth effect. */
  protected readonly portraitShift = computed(
    () => `translate3d(0, ${this.scrollY() * 0.12}px, 0)`,
  );

  protected onWindowScroll(): void {
    if (this.reducedMotion) {
      return;
    }
    this.scrollY.set(Math.min(window.scrollY, 1000));
  }
}
