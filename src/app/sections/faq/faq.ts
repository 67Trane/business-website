import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** FAQ section: answers the questions that hold visitors back from enquiring. */
@Component({
  selector: 'app-faq',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq.html',
})
export class Faq {
  protected readonly content = inject(LanguageService).content;
}
