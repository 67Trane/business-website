import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/site.data';

/**
 * Imprint page (legally required for commercial websites in Germany).
 * TODO: Add your VAT ID (or small-business note) before going live.
 */
@Component({
  selector: 'app-imprint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Imprint Page -->
    <section class="mx-auto max-w-3xl px-6 pt-36 pb-24">
      <span class="eyebrow">Rechtliches</span>
      <h1 class="display-title mt-3">Impressum</h1>

      <div class="mt-10 space-y-8 leading-relaxed text-copy">
        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">Angaben gemäß § 5 DDG</h2>
          <p class="mt-3">
            {{ profile.name }}<br />
            Nördliche Ringstraße 23<br />
            91781 Weißenburg in Bayern
          </p>
        </div>

        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">Kontakt</h2>
          <p class="mt-3">
            E-Mail:
            <a
              [href]="'mailto:' + profile.email"
              class="font-medium text-brand hover:underline"
            >
              {{ profile.email }}
            </a>
          </p>
        </div>

        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">Umsatzsteuer</h2>
          <p class="mt-3">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: folgt
          </p>
        </div>

        <div>
          <h2 class="font-serif text-xl font-semibold text-ink">Verantwortlich für den Inhalt</h2>
          <p class="mt-3">{{ profile.name }} (Anschrift wie oben)</p>
        </div>
      </div>
    </section>
  `,
})
export class Imprint {
  protected readonly profile = PROFILE;
}
