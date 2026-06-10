import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROCESS_STEPS } from '../../data/process.data';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Process section explaining the collaboration in numbered steps. */
@Component({
  selector: 'app-process',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './process.html',
})
export class Process {
  protected readonly steps = PROCESS_STEPS;
}
