import { Injectable, signal } from '@angular/core';

/**
 * Hands a ready-made message from a call to action to the contact form, e.g.
 * "So eine Website anfragen" on a showcase card pre-fills which demo the
 * visitor liked. The visitor can still edit or replace the text.
 */
@Injectable({ providedIn: 'root' })
export class ContactPrefill {
  readonly message = signal('');

  set(message: string): void {
    this.message.set(message);
  }
}
