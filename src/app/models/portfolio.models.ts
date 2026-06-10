import type { IconName } from '../shared/icon/icon';

/**
 * Shared domain models for the business website.
 * All content data (services, projects, process steps, ...) is typed against these interfaces.
 */

/** A single entry in the main navigation, pointing to a section anchor on the home page. */
export interface NavItem {
  label: string;
  /** Anchor id of the target section, e.g. "leistungen". */
  anchor: string;
}

/** External profile link rendered with an icon (footer, contact, ...). */
export interface SocialLink {
  name: string;
  url: string;
  icon: IconName;
}

/** A service offering rendered as a card in the services section. */
export interface Service {
  icon: IconName;
  title: string;
  description: string;
  /** Short bullet points listed on the card. */
  points: string[];
}

/** One step of the collaboration process (rendered with its 1-based index). */
export interface ProcessStep {
  title: string;
  description: string;
}

/** A reference project rendered as a card in the references section. */
export interface Project {
  title: string;
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

/** Business and contact information used across hero, contact, footer and legal pages. */
export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
}
