import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';
import { PROFILE } from '../data/site.data';

/**
 * Fills an <a> with the contact e-mail in the browser only, assembled from parts.
 *
 * The address is therefore absent from the prerendered HTML: simple scrapers
 * don't pick it up, and Cloudflare's "Email Address Obfuscation" has nothing to
 * rewrite — which previously made the address render twice (Cloudflare's decoded
 * copy plus Angular's hydrated text).
 *
 * Usage: <a appEmail class="...">  (leave the element empty; href + text are set here)
 */
@Directive({ selector: 'a[appEmail]' })
export class EmailLink {
  private readonly anchor = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const [user, domain] = PROFILE.email.split('@');
      const address = `${user}${String.fromCharCode(64)}${domain}`;
      const el = this.anchor.nativeElement;
      el.setAttribute('href', `mailto:${address}`);
      // Only fill text if the link is empty, so labelled buttons keep their label.
      if (!el.textContent?.trim()) {
        el.textContent = address;
      }
    });
  }
}
