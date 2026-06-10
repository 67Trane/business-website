import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_ITEMS, PROFILE } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';

/** Fixed top navigation with blur background after scrolling and a mobile menu. */
@Component({
  selector: 'app-header',
  imports: [Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  host: { '(window:scroll)': 'onWindowScroll()' },
})
export class Header {
  protected readonly profile = PROFILE;
  protected readonly navItems = NAV_ITEMS;

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  /** Switches the header to a solid blurred background once the page is scrolled. */
  protected onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
