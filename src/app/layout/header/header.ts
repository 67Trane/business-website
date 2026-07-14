import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
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
  /* True while the header still overlaps the dark hero (home page only). */
  private readonly overHero = signal(true);

  private readonly onHome = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
      map((url) => url.split('#')[0].split('?')[0] === '/'),
    ),
    { requireSync: true },
  );

  /* Dark, transparent header state: melts into the hero so its animation shows
     through. Falls back to the light bar as soon as the mobile menu opens,
     because the dropdown panel is light. */
  protected readonly dark = computed(() => this.onHome() && this.overHero() && !this.menuOpen());

  protected readonly navLinkClass = computed(() =>
    this.dark() ? 'text-white/75 hover:text-white' : 'text-copy hover:text-brand',
  );

  constructor() {
    /* Navigation doesn't always fire a scroll event (e.g. arriving at the top
       of the home page from a legal page), so recompute the hero overlap after
       the new page has rendered. */
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
    const hero = document.getElementById('top');
    this.overHero.set(hero !== null && window.scrollY < hero.offsetHeight - 72);
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
