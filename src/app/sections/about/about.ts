import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** About: the person behind the websites – portrait, short story, key facts. */
@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutSection {
  readonly content = inject(LanguageService).content;
}
