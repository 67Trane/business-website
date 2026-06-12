import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

const BASE_URL = 'https://mehmet-deliaci.net';

/**
 * Sets per-page SEO tags (description, robots, canonical, og:url).
 * Runs during prerendering, so the tags end up in the static HTML.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(options: { path: string; description: string; noindex?: boolean }): void {
    const url = `${BASE_URL}${options.path}`;

    this.meta.updateTag({ name: 'description', content: options.description });
    this.meta.updateTag({
      name: 'robots',
      content: options.noindex ? 'noindex, follow' : 'index, follow',
    });
    this.meta.updateTag({ property: 'og:url', content: url });

    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }
}
