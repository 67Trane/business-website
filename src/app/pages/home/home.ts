import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AboutSection } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Hero } from '../../sections/hero/hero';
import { Process } from '../../sections/process/process';
import { Projects } from '../../sections/projects/projects';
import { Services } from '../../sections/services/services';
import { TrustBar } from '../../sections/trust/trust';
import { Seo } from '../../services/seo';

/** Landing page composing all sections in order. */
@Component({
  selector: 'app-home',
  imports: [Hero, TrustBar, Services, Process, Projects, AboutSection, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    inject(Seo).apply({
      path: '/',
      description:
        'Webentwicklung aus einer Hand: moderne Websites, Web-Anwendungen und REST-APIs mit ' +
        'Angular, TypeScript, Python und Django – maßgeschneidert für Ihr Unternehmen.',
    });
  }
}
