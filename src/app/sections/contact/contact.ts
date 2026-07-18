import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ConsentService } from '../../services/consent';
import { LanguageService } from '../../services/language';
import { SOCIAL_LINKS } from '../../data/site.data';
import { EmailLink } from '../../shared/email-link';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading, Icon, EmailLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly content = inject(LanguageService).content;
  private readonly consent = inject(ConsentService);
  protected readonly submitState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  protected async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (this.submitState() === 'sending') return;

    const form = event.currentTarget as HTMLFormElement;
    this.submitState.set('sending');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error(`Contact request failed with ${response.status}`);

      form.reset();
      this.submitState.set('success');
      this.consent.trackLeadConversion();
    } catch {
      this.submitState.set('error');
    }
  }
}
