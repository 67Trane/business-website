import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../services/seo';

/**
 * 404 page. Prerendered to /404/index.html; Apache serves it with a real
 * 404 status via `ErrorDocument` in public/.htaccess. The client-side
 * wildcard route renders it too, so in-app navigation to unknown URLs
 * shows the same page.
 */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 404 Page -->
    <section class="mx-auto flex max-w-3xl flex-col items-start px-6 pt-36 pb-24">
      <span class="eyebrow">Fehler 404</span>
      <h1 class="display-title mt-3">Diese Seite gibt es nicht.</h1>
      <p class="mt-6 max-w-130 leading-relaxed text-copy">
        Die aufgerufene Adresse existiert nicht oder wurde verschoben. Alles Wichtige –
        Leistungen, Projekte und Kontakt – finden Sie auf der Startseite.
      </p>
      <a routerLink="/" class="primary-button mt-9">Zur Startseite <span>→</span></a>
    </section>
  `,
})
export class NotFound {
  constructor() {
    inject(Seo).apply({
      path: '/404',
      description: 'Seite nicht gefunden – Mehmet Deliaci, Webentwicklung aus Weißenburg.',
      noindex: true,
    });
  }
}
