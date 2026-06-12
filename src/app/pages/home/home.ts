import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutSection } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Hero } from '../../sections/hero/hero';
import { Process } from '../../sections/process/process';
import { Projects } from '../../sections/projects/projects';
import { Services } from '../../sections/services/services';

/** Landing page composing all sections in order. */
@Component({
  selector: 'app-home',
  imports: [Hero, Services, Process, Projects, AboutSection, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {}
