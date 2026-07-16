import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutSection {
  readonly content = inject(LanguageService).content;
}
