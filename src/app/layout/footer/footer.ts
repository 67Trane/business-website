import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_ITEMS, PROFILE, SOCIAL_LINKS } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';

/** Site footer with navigation, social links, legal links and copyright. */
@Component({
  selector: 'app-footer',
  imports: [Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly navItems = NAV_ITEMS;
  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly year = new Date().getFullYear();
}
