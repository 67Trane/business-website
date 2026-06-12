import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PROJECTS } from '../../data/projects.data';
import { LanguageService } from '../../services/language';
import { PROFILE } from '../../data/site.data';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly content = inject(LanguageService).content;
  protected readonly profile = PROFILE;
  protected readonly projects = computed(() =>
    PROJECTS.map((project, index) => ({
      ...project,
      description: this.content().projects.descriptions[index],
    })),
  );
}
