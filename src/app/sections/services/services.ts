import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERVICES } from '../../data/services.data';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Services section rendering one card per service offering. */
@Component({
  selector: 'app-services',
  imports: [SectionHeading, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
})
export class Services {
  protected readonly services = SERVICES;
}
