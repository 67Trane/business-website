import type { IconName } from '../shared/icon/icon';

/**
 * Shared domain models for the business website.
 * All translated copy lives in `data/i18n.data.ts`; these models cover
 * the language-independent data (links, projects).
 */

/** External profile link rendered with an icon (footer, contact, ...). */
export interface SocialLink {
  name: string;
  url: string;
  icon: IconName;
}

/** A demo website showcased in the demos section (all copy lives in i18n.data.ts). */
export interface DemoSite {
  liveUrl: string;
  /** Path under /public, e.g. `/images/projects/….webp`. */
  image: string;
  /** Intrinsic dimensions – rendered as width/height attributes to avoid layout shift. */
  imageWidth: number;
  imageHeight: number;
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
