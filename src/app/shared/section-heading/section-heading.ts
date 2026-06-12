import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Reusable editorial heading used across the light redesign. */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-3xl">
      <span class="eyebrow">{{ eyebrow() }}</span>
      <h2 class="display-title mt-3">{{ title() }}</h2>
      @if (description()) {
        <p class="mt-5 max-w-2xl text-lead text-copy">
          {{ description() }}
        </p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>();
}
