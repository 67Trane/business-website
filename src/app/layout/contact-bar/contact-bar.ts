import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { PROFILE } from '../../data/site.data';
import { ConsentService } from '../../services/consent';
import { LanguageService } from '../../services/language';
import { Icon } from '../../shared/icon/icon';

/**
 * Mobile-only sticky contact bar (call + WhatsApp). Appears after scrolling
 * past the hero, so the lowest-friction contact options stay one thumb-tap
 * away for ads traffic. Hidden on ≥ md, where the hero CTAs are visible.
 */
@Component({
  selector: 'app-contact-bar',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-bar.html',
  host: { '(window:scroll)': 'onWindowScroll()' },
})
export class ContactBar {
  protected readonly content = inject(LanguageService).content;
  protected readonly profile = PROFILE;
  protected readonly consent = inject(ConsentService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly visible = signal(false);

  protected onWindowScroll(): void {
    if (this.isBrowser) this.visible.set(window.scrollY > 420);
  }
}
