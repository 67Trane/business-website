import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

/**
 * Statement band: one sentence set large on dark ink. Its words light up one
 * after another while the band scrolls through the viewport (CSS scroll
 * timeline); the closing sentence carries the accent. Without scroll-timeline
 * support, or with reduced motion, the text is simply fully lit.
 */
@Component({
  selector: 'app-statement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './statement.html',
  styleUrl: './statement.css',
})
export class Statement {
  protected readonly content = inject(LanguageService).content;

  protected readonly words = computed(() => {
    const text = this.content().statement.text;
    // The last sentence starts after the last ". " that is not the very end.
    const lastSentence = text.lastIndexOf('. ', text.length - 3) + 2;
    const words: { text: string; accent: boolean; at: number }[] = [];
    let offset = 0;

    for (const word of text.split(' ')) {
      words.push({ text: word, accent: offset >= lastSentence, at: 0 });
      offset += word.length + 1;
    }
    // Position in the reading order, 0..1 – staggers the lighting.
    words.forEach((word, index) => (word.at = index / words.length));
    return words;
  });
}
