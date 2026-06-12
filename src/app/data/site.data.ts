import { Profile, SocialLink } from '../models/portfolio.models';

/** Central business data – edit this to update name, e-mail and links everywhere. */
export const PROFILE: Profile = {
  name: 'Mehmet Deliaci',
  email: 'info@mehmet-deliaci.net',
  githubUrl: 'https://www.github.com/67Trane',
  linkedinUrl: 'https://www.linkedin.com/in/mehmet-deliaci-24285535a',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: PROFILE.githubUrl, icon: 'github' },
  { name: 'LinkedIn', url: PROFILE.linkedinUrl, icon: 'linkedin' },
  { name: 'E-Mail', url: `mailto:${PROFILE.email}`, icon: 'mail' },
];
