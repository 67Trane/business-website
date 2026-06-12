import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-process',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './process.html',
})
export class Process {
  protected readonly content = inject(LanguageService).content;
}
