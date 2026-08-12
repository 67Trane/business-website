import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PROFILE } from '../data/site.data';
import { EmailLink } from './email-link';

@Component({
  imports: [EmailLink],
  template: `
    <a appEmail id="plain"></a>
    <a appEmail id="labelled">Schreiben Sie mir</a>
  `,
})
class Host {}

describe('EmailLink', () => {
  async function render() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('fills an empty link with the address, exactly once', async () => {
    const anchor = (await render()).querySelector<HTMLAnchorElement>('#plain')!;

    expect(anchor.getAttribute('href')).toBe(`mailto:${PROFILE.email}`);
    // Exact match, not "contains": Cloudflare's e-mail obfuscation once left the
    // address in the DOM twice, and that only shows up as a doubled text node.
    expect(anchor.textContent?.trim()).toBe(PROFILE.email);
  });

  it('leaves a labelled link its label and only adds the address as href', async () => {
    const anchor = (await render()).querySelector<HTMLAnchorElement>('#labelled')!;

    expect(anchor.getAttribute('href')).toBe(`mailto:${PROFILE.email}`);
    expect(anchor.textContent?.trim()).toBe('Schreiben Sie mir');
  });
});
