import { TestBed } from '@angular/core/testing';
import { CONTENT } from '../data/i18n.data';
import { LanguageService } from './language';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    document.documentElement.lang = '';
  });

  it('starts out in German', () => {
    expect(service.language()).toBe('de');
    expect(service.content()).toBe(CONTENT.de);
  });

  it('serves the content of the language it was switched to', () => {
    service.setLanguage('tr');
    expect(service.content()).toBe(CONTENT.tr);

    service.setLanguage('en');
    expect(service.content()).toBe(CONTENT.en);
  });

  it('keeps the document language in sync for screen readers and search engines', () => {
    service.setLanguage('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
