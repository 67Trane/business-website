import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

/** Thin proof bar under the hero: real, verifiable credibility metrics. */
@Component({
  selector: 'app-trust-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust.html',
})
export class TrustBar {
  protected readonly content = inject(LanguageService).content;
}
