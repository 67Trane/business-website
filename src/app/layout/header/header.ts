import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Language } from '../../data/i18n.data';
import { LanguageService } from '../../services/language';
import { PROFILE } from '../../data/site.data';
import { Icon, IconName } from '../../shared/icon/icon';

@Component({
  selector: 'app-header',
  imports: [Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  host: { '(window:scroll)': 'onWindowScroll()' },
})
export class Header {
  protected readonly profile = PROFILE;
  protected readonly i18n = inject(LanguageService);
  private readonly router = inject(Router);
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  constructor() {
    /* Navigation doesn't always fire a scroll event, so refresh the header
       background state after the new page has rendered. */
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.router.events
        .pipe(
          takeUntilDestroyed(),
          filter((event) => event instanceof NavigationEnd),
        )
        .subscribe(() => setTimeout(() => this.onWindowScroll()));
    }
  }

  protected onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }

  protected flagIcon(language: string): IconName {
    return `flag-${language}` as IconName;
  }
}
