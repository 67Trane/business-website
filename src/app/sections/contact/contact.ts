import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ConsentService } from '../../services/consent';
import { LanguageService } from '../../services/language';
import { PROFILE, SOCIAL_LINKS } from '../../data/site.data';
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
  protected readonly profile = PROFILE;
  protected readonly content = inject(LanguageService).content;
  protected readonly consent = inject(ConsentService);
  protected readonly submitState = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  /**
   * Proof-of-JavaScript token for the mail script. Spam bots POST straight at
   * contact.php without ever running the page, so requiring a token they had
   * to fetch first filters them out without putting a captcha in front of real
   * visitors. Fetched fresh on submit rather than on load: it can never go
   * stale that way, and visitors who never use the form cost no extra request.
   */
  private async fetchToken(): Promise<{ ts: string; token: string } | null> {
    try {
      const response = await fetch('/contact.php?token=1', {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) return null;

      const data = (await response.json()) as { ts?: number; token?: string };
      if (typeof data.ts !== 'number' || typeof data.token !== 'string') return null;

      return { ts: String(data.ts), token: data.token };
    } catch {
      return null;
    }
  }

  protected async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (this.submitState() === 'sending') return;

    const form = event.currentTarget as HTMLFormElement;
    this.submitState.set('sending');

    try {
      const token = await this.fetchToken();
      // No token means the request would be rejected anyway – surfacing the
      // error state points the visitor at the phone number instead of letting
      // the enquiry vanish.
      if (!token) throw new Error('Could not obtain a form token');

      const body = new FormData(form);
      body.set('form_ts', token.ts);
      body.set('form_token', token.token);

      const response = await fetch(form.action, {
        method: 'POST',
        body,
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
