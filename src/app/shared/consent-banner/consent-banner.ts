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
      <!-- Mobile: slim full-width strip so the hero CTA stays visible above it.
           sm+: the familiar floating card. -->
      <div
        role="dialog"
        [attr.aria-label]="content().consent.label"
        class="fixed inset-x-0 bottom-0 z-50 sm:p-6"
      >
        <div
          class="mx-auto max-w-2xl border-t border-brand/10 bg-white px-3 py-2.5 shadow-[0_-12px_32px_-20px_rgb(12_23_51/35%)] sm:rounded-2xl sm:border sm:p-6 sm:shadow-[0_24px_52px_-24px_rgb(12_23_51/35%)]"
        >
          <p class="text-xs leading-tight text-copy sm:text-sm sm:leading-relaxed">
            {{ content().consent.text }}
            <a routerLink="/datenschutz" class="font-medium text-brand hover:underline">
              {{ content().consent.privacy }}
            </a>
          </p>
          <div class="mt-2.5 flex gap-2.5 sm:mt-4 sm:gap-3">
            <button
              type="button"
              class="primary-button min-h-11 flex-1 px-5 py-2.5 text-sm sm:flex-none"
              (click)="consent.grant()"
            >
              {{ content().consent.accept }}
            </button>
            <button
              type="button"
              class="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand sm:flex-none"
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
