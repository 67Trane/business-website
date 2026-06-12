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

/** A reference project rendered as a card in the references section. */
export interface Project {
  title: string;
  /** Language-specific descriptions are layered over this in the projects section. */
  description: string;
  /** Tech stack shown as tags on the card. */
  tags: string[];
  /** Tailwind gradient classes (from-... to-...) for the card header. */
  gradient: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Highlighted projects get a small badge on the card. */
  featured?: boolean;
}

/** Business and contact information used across the site and legal pages. */
export interface Profile {
  name: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}
