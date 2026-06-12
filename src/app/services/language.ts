import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CONTENT, Language } from '../data/i18n.data';

/** Holds the active language and exposes the matching translated content. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly language = signal<Language>('de');
  readonly content = computed(() => CONTENT[this.language()]);

  setLanguage(language: Language): void {
    this.language.set(language);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = language;
    }
  }
}
