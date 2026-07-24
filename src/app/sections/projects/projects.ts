import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FEATURED_DEMO } from '../../data/demos.data';
import { LanguageService } from '../../services/language';
import { BeforeAfter } from '../../shared/before-after/before-after';

/** Demo-websites showcase: one featured live demo plus upcoming industry teasers. */
@Component({
  selector: 'app-projects',
  imports: [BeforeAfter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly content = inject(LanguageService).content;
  protected readonly demo = FEATURED_DEMO;
}
