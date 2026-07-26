import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AboutSection } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Faq } from '../../sections/faq/faq';
import { Hero } from '../../sections/hero/hero';
import { Process } from '../../sections/process/process';
import { Projects } from '../../sections/projects/projects';
import { Services } from '../../sections/services/services';
import { TrustBar } from '../../sections/trust/trust';
import { Seo } from '../../services/seo';

/** Landing page composing all sections in order. */
@Component({
  selector: 'app-home',
  imports: [Hero, TrustBar, Services, Process, Projects, AboutSection, Faq, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    inject(Seo).apply({
      path: '/',
      description:
        'Freelance-Webentwickler aus Weißenburg in Bayern: moderne Websites, Web-Anwendungen ' +
        'und Automatisierungen, maßgeschneidert für Ihr Unternehmen, vor Ort und remote.',
    });
  }
}
