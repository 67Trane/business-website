import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/site.data';

/**
 * Privacy policy page (GDPR / DSGVO).
 * TODO: This is a minimal starting point – have it reviewed or generated with a
 * professional DSGVO generator before going live (hosting provider, fonts, analytics etc.).
 */
@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Privacy Page -->
    <section class="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Datenschutzerklärung
      </h1>

      <div class="mt-10 space-y-8 leading-relaxed text-slate-400">
        <div>
          <h2 class="text-lg font-semibold text-white">1. Verantwortlicher</h2>
          <p class="mt-3">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            {{ profile.name }}, Musterstraße 1, 12345 Musterstadt,
            <a
              [href]="'mailto:' + profile.email"
              class="text-cyan-400 transition-colors hover:text-cyan-300"
            >
              {{ profile.email }} </a
            >.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-white">2. Hosting & Server-Logfiles</h2>
          <p class="mt-3">
            Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige
            Daten (z.&nbsp;B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite) in
            sogenannten Server-Logfiles. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO zur Sicherstellung eines störungsfreien Betriebs.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-white">3. Kontaktaufnahme</h2>
          <p class="mt-3">
            Wenn Sie mich per E-Mail oder über das Kontaktformular kontaktieren, werden Ihre
            Angaben ausschließlich zur Bearbeitung der Anfrage und für mögliche Anschlussfragen
            gespeichert (Art. 6 Abs. 1 lit. b DSGVO). Eine Weitergabe an Dritte findet nicht
            statt.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-white">4. Externe Schriftarten</h2>
          <p class="mt-3">
            Diese Website bindet die Schriftart „Inter" über Google Fonts ein. Dabei wird eine
            Verbindung zu Servern von Google hergestellt. Hinweis: Für eine DSGVO-konforme
            Nutzung sollten die Schriftarten lokal gehostet werden.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-white">5. Ihre Rechte</h2>
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
}
