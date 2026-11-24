import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { Icon, IconName } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Services as six tiles; the icon order matches `services.items` in i18n.data.ts. */
@Component({
  selector: 'app-services',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly content = inject(LanguageService).content;
  protected readonly icons: IconName[] = [
    'design',
    'motion',
    'smartphone',
    'speed',
    'form',
    'care',
  ];
}
