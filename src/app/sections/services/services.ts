import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-services',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
})
export class Services {
  protected readonly content = inject(LanguageService).content;
}
