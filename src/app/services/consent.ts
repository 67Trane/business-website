import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

/** Google Ads conversion tracking (campaign "PMax Webdesign lokale Leads"). */
const ADS_ID = 'AW-18318016436';
const LEAD_CONVERSION_LABEL = '5hQOCLKA4dAcELT_2p5E';
const STORAGE_KEY = 'ads-consent';

export type ConsentStatus = 'unknown' | 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * DSGVO consent + Google Ads tag. gtag.js is only loaded after the visitor
 * accepts (Consent Mode v2, "basic" implementation: no consent, no requests
 * to Google at all). The choice is persisted in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly status = signal<ConsentStatus>('unknown');

  constructor() {
    if (!this.isBrowser) return;
    const stored = this.readStoredChoice();
    if (stored === 'granted' || stored === 'denied') {
      this.status.set(stored);
      if (stored === 'granted') this.loadGoogleTag();
    }
  }

  grant(): void {
    if (!this.isBrowser) return;
    this.persistChoice('granted');
    this.status.set('granted');
    this.loadGoogleTag();
  }

  deny(): void {
    if (!this.isBrowser) return;
    this.persistChoice('denied');
    this.status.set('denied');
  }

  /** Re-opens the banner (used on the privacy page to withdraw consent). */
  reset(): void {
    if (!this.isBrowser) return;
    this.persistChoice(null);
    this.status.set('unknown');
  }

  /** Reports a submitted lead form to Google Ads (no-op without consent). */
  trackLeadConversion(): void {
    if (!this.isBrowser || this.status() !== 'granted') return;
    window.gtag?.('event', 'conversion', {
      send_to: `${ADS_ID}/${LEAD_CONVERSION_LABEL}`,
    });
  }

  /* localStorage can be missing or blocked (jsdom tests, locked-down
     browsers); consent then simply isn't persisted across visits. */
  private readStoredChoice(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private persistChoice(choice: 'granted' | 'denied' | null): void {
    try {
      if (choice === null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* not persisted */
    }
  }

  private loadGoogleTag(): void {
    if (window.gtag) return;

    window.dataLayer = window.dataLayer ?? [];
    // gtag.js expects the Arguments object on the dataLayer, not a rest array.
    window.gtag = function () {
      window.dataLayer!.push(arguments);
    };

    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
    window.gtag('js', new Date());
    window.gtag('config', ADS_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    document.head.appendChild(script);
  }
}
