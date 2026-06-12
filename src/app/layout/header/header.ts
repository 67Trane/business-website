import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

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
