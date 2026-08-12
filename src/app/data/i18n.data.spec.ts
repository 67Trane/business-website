import { CONTENT, Language } from './i18n.data';

const LANGUAGES: Language[] = ['de', 'en', 'tr'];

/** Intentionally empty: the headline ends after the rotating phrase. */
const ALLOWED_EMPTY = ['hero.headlineEnd'];

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

  describe('hero headline', () => {
    /*
     * The rotating phrase sits in a frame exactly one line high
     * (.rotating-word-frame, overflow: hidden). Anything that wraps loses its
     * second line without a trace – that bug shipped once. The type scales with
     * the column width (9.6cqw), which leaves a budget of about 9.6em per
     * phrase; measured in the browser, the longest current phrase needs 9.75em
     * at 22 characters.
     *
     * Character count is only a rough proxy for that width – it catches a
     * phrase that is plainly too long, it does not prove one fits. The real
     * width still has to be checked in a browser.
     */
    const ROUGH_CHARACTER_BUDGET = 26;

    for (const language of LANGUAGES) {
      it(`"${language}" keeps every rotating phrase short enough for one line`, () => {
        const tooLong = CONTENT[language].hero.rotating.filter(
          (phrase) => phrase.length > ROUGH_CHARACTER_BUDGET,
        );

        expect(tooLong).toEqual([]);
      });
    }

    for (const language of LANGUAGES) {
      it(`"${language}" offers a rotating phrase for the screen-reader fallback`, () => {
        // The template reads rotating[0] for the sr-only copy of the headline.
        expect(CONTENT[language].hero.rotating[0]).toBeTruthy();
      });
    }
  });
});
