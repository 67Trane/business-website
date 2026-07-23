import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactBar } from './layout/contact-bar/contact-bar';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { LanguageService } from './services/language';
import { ConsentBanner } from './shared/consent-banner/consent-banner';

/** Root shell: skip link, fixed header, routed page content, footer, mobile contact bar. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ConsentBanner, ContactBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly content = inject(LanguageService).content;
}
