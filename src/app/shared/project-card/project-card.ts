import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService } from '../../services/language';
import { Project } from '../../models/portfolio.models';

/** Single project card used in the projects grid. */
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.html',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  protected readonly content = inject(LanguageService).content;
}
