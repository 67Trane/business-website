import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/site.data';

/** Hero section with business value proposition, CTAs and trust points. */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly profile = PROFILE;

  /** Short trust arguments shown below the CTAs. */
  protected readonly trustPoints = [
    'Maßgeschneidert statt Baukasten',
    'Performance & SEO inklusive',
    'Ein Ansprechpartner – von Konzept bis Launch',
  ];
}
