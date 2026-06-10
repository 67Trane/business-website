import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE, SOCIAL_LINKS } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/**
 * Contact section with contact info and a project inquiry form.
 * The form opens the visitor's mail client via a prefilled mailto link –
 * no backend required. Swap `onSubmit` for an HTTP call once an API exists.
 */
@Component({
  selector: 'app-contact',
  imports: [SectionHeading, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly socialLinks = SOCIAL_LINKS;

  /** Builds a prefilled mailto link from the form values and opens the mail client. */
  protected onSubmit(event: Event): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const company = data.get('company');
    const sender = company ? `${data.get('name')} (${company})` : `${data.get('name')}`;
    const subject = encodeURIComponent(`Projektanfrage von ${sender}`);
    const body = encodeURIComponent(
      `${data.get('message')}\n\n— ${sender}\n${data.get('email')}`,
    );
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }
}
