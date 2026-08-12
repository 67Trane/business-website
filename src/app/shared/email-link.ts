import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
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
 * A link that does carry a label keeps it and only gets the href.
 */
@Directive({ selector: 'a[appEmail]' })
export class EmailLink implements AfterViewInit {
  private readonly anchor = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly parts = PROFILE.email.split('@');
  private readonly fallbackText = `${this.parts[0]} [at] ${this.parts[1]}`;

  constructor() {
    afterNextRender(() => {
      const address = `${this.parts[0]}${String.fromCharCode(64)}${this.parts[1]}`;
      const el = this.anchor.nativeElement;
      el.setAttribute('href', `mailto:${address}`);

      /* Either the element is empty, or it holds the fallback from the
         prerendered HTML – both become the address. Anything else is a label
         the template put there and stays untouched. */
      const text = el.textContent?.trim() ?? '';
      if (text === '' || text === this.fallbackText) el.textContent = address;
    });
  }

  ngAfterViewInit(): void {
    /* Prerendering only: at this point the element's own content exists, so an
       empty link can be told apart from a labelled one. In the browser the
       hydrated DOM already carries whatever the server wrote. */
    if (this.isBrowser) return;

    const el = this.anchor.nativeElement;
    if (!el.textContent?.trim()) el.textContent = this.fallbackText;
  }
}
