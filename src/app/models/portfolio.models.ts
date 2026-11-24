import type { IconName } from '../shared/icon/icon';

/**
 * Shared domain models for the business website.
 * All translated copy lives in `data/i18n.data.ts`; these models cover
 * the language-independent data (links, demo assets).
 */

/** External profile link rendered with an icon (footer, contact, ...). */
export interface SocialLink {
  name: string;
  url: string;
  icon: IconName;
}

/** Industries with a showcase demo. The copy for each lives under `showcase.demos[id]`. */
export type DemoIndustry = 'gastronomie' | 'immobilien' | 'barbershop' | 'kfz';

/**
 * Colours of one demo's showcase card, taken from the demo site itself, so
 * every industry card reads as that business's own look, not the portfolio's.
 * `muted` must keep >= 4.5:1 contrast on `bg` (WCAG AA).
 */
export interface DemoTheme {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  /** Text colour on top of the accent (buttons). */
  onAccent: string;
  /** Hairlines and frame borders. */
  line: string;
}

/** A live demo website shown in the industry showcase. */
export interface DemoSite {
  industry: DemoIndustry;
  liveUrl: string;
  /** Phone-format scroll recording of the live demo (H.264, 480×1038). */
  video: string;
  /** Settled first screen of the demo on a phone (480×1038), also the video poster. */
  poster: string;
  /** Desktop first screen (1280×800), shown in the browser frame on large screens. */
  desktop: string;
  theme: DemoTheme;
}

/** Business and contact information used across the site and legal pages. */
export interface Profile {
  name: string;
  email: string;
  /** Display format, e.g. "+49 15567 432567". */
  phone: string;
  /** `tel:`-link target (no spaces). */
  phoneHref: string;
  /** WhatsApp deep link (wa.me). */
  whatsappUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}
