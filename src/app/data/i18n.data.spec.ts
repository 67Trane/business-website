import { DEMOS } from './demos.data';
import { CONTENT, Language } from './i18n.data';

const LANGUAGES: Language[] = ['de', 'en', 'tr'];

/** Paths that may legitimately hold an empty string (none at the moment). */
const ALLOWED_EMPTY: string[] = [];

/**
 * Every leaf of the content tree as "path -> text", e.g. "hero.rotating.1".
 * Array indices are part of the path on purpose: a list that is one entry short
 * in one language then shows up as a missing path instead of passing silently.
 */
function leaves(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => leaves(item, `${path}.${index}`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      leaves(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

describe('i18n content', () => {
  it('ships exactly the three offered languages', () => {
    expect(Object.keys(CONTENT).sort()).toEqual([...LANGUAGES].sort());
  });

  for (const language of ['en', 'tr'] as const) {
    it(`"${language}" carries the same set of texts as "de"`, () => {
      expect(leaves(CONTENT[language]).map(([path]) => path)).toEqual(
        leaves(CONTENT.de).map(([path]) => path),
      );
    });
  }

  for (const language of LANGUAGES) {
    it(`"${language}" has no blank texts`, () => {
      const blank = leaves(CONTENT[language])
        .filter(([path, text]) => text.trim() === '' && !ALLOWED_EMPTY.includes(path))
        .map(([path]) => path);

      expect(blank).toEqual([]);
    });
  }

  describe('hero headline markup', () => {
    // `|` starts a new line, `*…*` marks the accent run (see Hero.headline).
    for (const language of LANGUAGES) {
      it(`"${language}" has one closed accent run and no empty lines`, () => {
        const headline: string = CONTENT[language].hero.headline;

        expect(headline.split('*').length - 1).toBe(2);
        expect(headline.split('|').every((line) => line.replaceAll('*', '').trim() !== '')).toBe(
          true,
        );
      });
    }
  });

  describe('showcase', () => {
    for (const language of LANGUAGES) {
      it(`"${language}" has copy for every listed demo`, () => {
        const demos: Record<string, unknown> = CONTENT[language].showcase.demos;
        const missing = DEMOS.map((demo) => demo.industry).filter((industry) => !demos[industry]);

        expect(missing).toEqual([]);
      });
    }
  });
});
