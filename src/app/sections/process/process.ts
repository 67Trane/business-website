import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Four-step process with a guide line that draws itself on scroll, plus a mid-page CTA. */
@Component({
  selector: 'app-process',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './process.html',
  styleUrl: './process.css',
})
export class Process {
  protected readonly content = inject(LanguageService).content;
}
