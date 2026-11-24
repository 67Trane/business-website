import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AboutSection } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Faq } from '../../sections/faq/faq';
import { Hero } from '../../sections/hero/hero';
import { Process } from '../../sections/process/process';
import { Services } from '../../sections/services/services';
import { Showcase } from '../../sections/showcase/showcase';
import { Statement } from '../../sections/statement/statement';
import { Seo } from '../../services/seo';

/** Landing page composing all sections in order. */
@Component({
  selector: 'app-home',
  imports: [Hero, Showcase, Statement, Services, Process, AboutSection, Faq, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    inject(Seo).apply({
      path: '/',
      description:
        'Premium-Webdesign aus Weißenburg in Bayern: Websites mit Animationen für Gastronomie, ' +
        'Immobilien, Friseure und Werkstätten. Live-Demos ansehen, Festpreis ab 1.000 €.',
    });
  }
}
