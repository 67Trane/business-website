import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FEATURED_DEMO } from '../../data/demos.data';
import { LanguageService } from '../../services/language';

/** Demo-websites showcase: the featured live demo presented on a full-width stage. */
@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly content = inject(LanguageService).content;
  protected readonly demo = FEATURED_DEMO;
}
