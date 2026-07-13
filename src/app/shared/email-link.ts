import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';
import { PROFILE } from '../data/site.data';

/**
 * Fills an <a> with the contact e-mail in the browser only, assembled from parts.
 *
 * The mailto: href and the plain address exist only in the hydrated DOM: simple
 * scrapers don't pick them up, and Cloudflare's "Email Address Obfuscation" has
 * nothing to rewrite — which previously made the address render twice (Cloudflare's
 * decoded copy plus Angular's hydrated text).
 *
 * The prerendered HTML still carries a human-readable "[at]" fallback so the link
 * is never an empty element for non-JS visitors, accessibility tools and crawlers.
 *
 * Usage: <a appEmail class="...">  (leave the element empty; href + text are set here)
 */
@Directive({ selector: 'a[appEmail]' })
export class EmailLink {
  private readonly anchor = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    const [user, domain] = PROFILE.email.split('@');
    const fallback = `${user} [at] ${domain}`;
    const el = this.anchor.nativeElement;

    // Runs during prerendering too, so the static HTML gets the fallback text.
    if (!el.textContent?.trim()) {
      el.textContent = fallback;
    }

    afterNextRender(() => {
      const address = `${user}${String.fromCharCode(64)}${domain}`;
      el.setAttribute('href', `mailto:${address}`);
      // Swap only our own fallback for the real address, so labelled buttons
      // keep their label.
      if (el.textContent?.trim() === fallback) {
        el.textContent = address;
      }
    });
  }
}
