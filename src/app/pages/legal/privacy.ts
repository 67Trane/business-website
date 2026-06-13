import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE } from '../../data/site.data';
import { Seo } from '../../services/seo';
import { EmailLink } from '../../shared/email-link';

/**
 * Privacy policy page (GDPR / DSGVO).
 * TODO: This is a minimal starting point – have it reviewed or generated with a
 * professional DSGVO generator before going live (hosting provider, fonts, analytics etc.).
 */
@Component({
  selector: 'app-privacy',
  imports: [EmailLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Privacy Page -->
    <section class="mx-auto max-w-3xl px-6 pt-36 pb-24">
      <span class="eyebrow">Rechtliches</span>
      <h1 class="display-title mt-3">Datenschutzerklärung</h1>

      <div class="mt-10 space-y-8 leading-relaxed text-copy">
        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">1. Verantwortlicher</h2>
          <p class="mt-3">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            {{ profile.name }}, Nördliche Ringstraße 23, 91781 Weißenburg in Bayern,
            <a appEmail class="font-medium text-brand hover:underline"></a>.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">2. Hosting & Server-Logfiles</h2>
          <p class="mt-3">
            Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige
            Daten (z.&nbsp;B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite) in
            sogenannten Server-Logfiles. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO zur Sicherstellung eines störungsfreien Betriebs.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">3. Kontaktaufnahme</h2>
          <p class="mt-3">
            Wenn Sie mich per E-Mail oder über das Kontaktformular kontaktieren, werden Ihre
            Angaben ausschließlich zur Bearbeitung der Anfrage und für mögliche Anschlussfragen
            gespeichert (Art. 6 Abs. 1 lit. b DSGVO). Eine Weitergabe an Dritte findet nicht
            statt.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">4. Schriftarten</h2>
          <p class="mt-3">
            Die auf dieser Website verwendeten Schriftarten („Spectral", „Hanken Grotesk",
            „Spline Sans Mono") werden lokal auf dem eigenen Server gehostet. Es findet keine
            Verbindung zu Servern von Google oder anderen Drittanbietern statt.
          </p>
        </div>

        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">5. Ihre Rechte</h2>
          <p class="mt-3">
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
            der Verarbeitung Ihrer personenbezogenen Daten sowie ein Beschwerderecht bei einer
            Datenschutz-Aufsichtsbehörde.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class Privacy {
  protected readonly profile = PROFILE;

  constructor() {
    inject(Seo).apply({
      path: '/datenschutz',
      description: 'Datenschutzerklärung von Mehmet Deliaci – Webentwicklung & digitale Lösungen.',
      noindex: true,
    });
  }
}
