import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/**
 * Services section with a spotlight interaction: hovering or focusing a row
 * highlights it (accent line, brand wash, animated miniature illustration)
 * while the other rows dim slightly. The first row starts highlighted.
 */
@Component({
  selector: 'app-services',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly content = inject(LanguageService).content;

  /** Index of the currently spotlighted row. */
  protected readonly activeIndex = signal(0);

  protected activate(index: number): void {
    this.activeIndex.set(index);
  }
}
