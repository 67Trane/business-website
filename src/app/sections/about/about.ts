import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
})
export class AboutSection {
  readonly content = inject(LanguageService).content;
  readonly techStack = [
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
