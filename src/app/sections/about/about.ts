import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/site.data';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** About section: the person behind the business, facts card and tech stack. */
@Component({
  selector: 'app-about',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
})
export class About {
  protected readonly profile = PROFILE;

  /** Label/value pairs for the facts card. */
  protected readonly facts = [
    { label: 'Standort', value: PROFILE.location },
    { label: 'Zusammenarbeit', value: 'Remote & vor Ort' },
    { label: 'Reaktionszeit', value: 'In der Regel unter 24 h' },
    { label: 'Verfügbarkeit', value: 'Projekte ab sofort' },
  ];

  /** Technologies shown as chips below the introduction. */
  protected readonly techStack = [
    'Angular',
    'TypeScript',
    'Tailwind CSS',
    'Python',
    'Django',
    'REST APIs',
    'PostgreSQL',
    'Docker',
    'Git',
  ];
}
