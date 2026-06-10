import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';
import { PROFILE } from '../../data/site.data';
import { ProjectCard } from '../../shared/project-card/project-card';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Projects section rendering the project cards grid. */
@Component({
  selector: 'app-projects',
  imports: [SectionHeading, ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECTS;
  protected readonly profile = PROFILE;
}
