import { NavItem, Profile, SocialLink } from '../models/portfolio.models';

/** Central business data – edit this to update name, claim, links etc. everywhere. */
export const PROFILE: Profile = {
  name: 'Mehmet Deliaci',
  role: 'Webentwicklung & digitale Lösungen',
  tagline:
    'Ich entwickle moderne Websites und Web-Anwendungen, die Ihr Unternehmen digital ' +
    'voranbringen – maßgeschneidert, performant und zuverlässig betreut.',
  email: 'mehmet.deliaci.dev@gmail.com',
  location: 'Deutschland',
  githubUrl: 'https://github.com/67Trane',
  linkedinUrl: 'https://www.linkedin.com/',
};

/** Main navigation – the contact link is rendered as a separate CTA button. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Leistungen', anchor: 'leistungen' },
  { label: 'Ablauf', anchor: 'ablauf' },
  { label: 'Referenzen', anchor: 'referenzen' },
  { label: 'Über mich', anchor: 'ueber-mich' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: PROFILE.githubUrl, icon: 'github' },
  { name: 'LinkedIn', url: PROFILE.linkedinUrl, icon: 'linkedin' },
  { name: 'E-Mail', url: `mailto:${PROFILE.email}`, icon: 'mail' },
];
