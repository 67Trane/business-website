import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Reusable centered heading (eyebrow + title + optional description) for all sections. */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-2xl text-center">
      <span class="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
        {{ eyebrow() }}
      </span>
      <h2 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="mt-4 text-base leading-relaxed text-slate-400">{{ description() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>();
}
