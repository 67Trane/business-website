import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  host: { '(window:scroll)': 'onWindowScroll()' },
})
export class Hero {
  protected readonly content = inject(LanguageService).content;

  private readonly reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly scrollY = signal(0);

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

  protected onWindowScroll(): void {
    if (!this.reducedMotion) {
      this.scrollY.set(Math.min(window.scrollY, 1000));
    }
  }
}
