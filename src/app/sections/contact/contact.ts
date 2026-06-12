import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { PROFILE, SOCIAL_LINKS } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly content = inject(LanguageService).content;

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const company = data.get('company');
    const sender = company ? `${data.get('name')} (${company})` : `${data.get('name')}`;
    const subject = encodeURIComponent(`${this.content().contact.subject} ${sender}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n- ${sender}\n${data.get('email')}`);
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }
}
