import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DEMOS } from '../../data/demos.data';
import { PROFILE } from '../../data/site.data';
import { DemoIndustry, DemoSite } from '../../models/portfolio.models';
import { LanguageService } from '../../services/language';
import { Icon } from '../../shared/icon/icon';

interface HeadlineWord {
  text: string;
  /** Position across the whole headline – drives the entrance stagger. */
  index: number;
}

/** A run of words inside one headline line; accent runs are italic, blue and never split. */
interface HeadlineRun {
  accent: boolean;
  words: HeadlineWord[];
}

/** Phones in the hero, left to right. The middle one sits in front. */
const HERO_PHONES: DemoIndustry[] = ['immobilien', 'gastronomie', 'kfz'];

/**
 * Hero: value proposition on the left, three live demos on phones on the right
 * (below the copy on phones). Everything enters once on load; the phones drift
 * apart a little while the hero scrolls away (CSS scroll timeline, no JS).
 */
@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly content = inject(LanguageService).content;
  protected readonly profile = PROFILE;

  protected readonly phones = HERO_PHONES.map(
    (industry) => DEMOS.find((demo) => demo.industry === industry) as DemoSite,
  );

  /** Path of the 300px-wide hero variant of a demo poster (`x.webp` → `x-300.webp`). */
  protected small(poster: string): string {
    return poster.replace(/\.webp$/, '-300.webp');
  }

  /**
   * Headline as lines of word runs, so each word can rise out of its own mask.
   * Markup in i18n: `|` starts a new line, `*…*` marks the accent run.
   */
  protected readonly headline = computed<HeadlineRun[][]>(() => {
    let index = 0;
    return this.content()
      .hero.headline.split('|')
      .map((line) =>
        line
          .split('*')
          .map((part, position) => ({
            // Text between the asterisks lands on odd positions.
            accent: position % 2 === 1,
            words: part
              .split(' ')
              .filter(Boolean)
              .map((text) => ({ text, index: index++ })),
          }))
          .filter((run) => run.words.length > 0),
      );
  });
}
