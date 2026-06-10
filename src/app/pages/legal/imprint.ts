import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/site.data';

/**
 * Imprint page (legally required for commercial websites in Germany).
 * TODO: Replace the placeholder address and add your VAT ID / business details before going live.
 */
@Component({
  selector: 'app-imprint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Imprint Page -->
    <section class="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Impressum</h1>

      <div class="mt-10 space-y-8 leading-relaxed text-slate-400">
        <div>
          <h2 class="text-lg font-semibold text-white">Angaben gemäß § 5 DDG</h2>
          <p class="mt-3">
            {{ profile.name }}<br />
            Nördliche Ring str.23<br />
            91781 Weißenburg<br />
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-white">Kontakt</h2>
          <p class="mt-3">
            E-Mail:
            <a
              [href]="'mailto:' + profile.email"
              class="text-cyan-400 transition-colors hover:text-cyan-300"
            >
              {{ profile.email }}
            </a>
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-white">Umsatzsteuer</h2>
          <p class="mt-3">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: folgt
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-white">Verantwortlich für den Inhalt</h2>
          <p class="mt-3">{{ profile.name }} (Anschrift wie oben)</p>
        </div>
      </div>
    </section>
  `,
})
export class Imprint {
  protected readonly profile = PROFILE;
}
