import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language';
import { ConsentService } from '../../services/consent';

/**
 * DSGVO cookie banner for the Google Ads tag. Rendered only in the browser
 * after hydration (never in the prerendered HTML), and only while the visitor
 * has not made a choice yet.
 */
@Component({
  selector: 'app-consent-banner',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (show()) {
      <div
        role="dialog"
        [attr.aria-label]="content().consent.label"
        class="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      >
        <div
          class="mx-auto max-w-2xl rounded-2xl border border-brand/10 bg-white p-5 shadow-[0_24px_52px_-24px_rgb(12_23_51/35%)] sm:p-6"
        >
          <p class="text-sm leading-relaxed text-copy">
            {{ content().consent.text }}
            <a routerLink="/datenschutz" class="font-medium text-brand hover:underline">
              {{ content().consent.privacy }}
            </a>
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <button type="button" class="primary-button px-5 py-2.5 text-sm" (click)="consent.grant()">
              {{ content().consent.accept }}
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
              (click)="consent.deny()"
            >
              {{ content().consent.decline }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConsentBanner {
  protected readonly consent = inject(ConsentService);
  protected readonly content = inject(LanguageService).content;

  private readonly hydrated = signal(false);
  protected readonly show = computed(() => this.hydrated() && this.consent.status() === 'unknown');

  constructor() {
    afterNextRender(() => this.hydrated.set(true));
  }
}
