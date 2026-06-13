import { Profile, SocialLink } from '../models/portfolio.models';

/** Central business data – edit this to update name, e-mail and links everywhere. */
export const PROFILE: Profile = {
  name: 'Mehmet Deliaci',
  email: 'info@mehmet-deliaci.net',
  githubUrl: 'https://www.github.com/67Trane',
  linkedinUrl: 'https://www.linkedin.com/in/mehmet-deliaci-24285535a',
};

// Profile links for the social row. The e-mail has its own prominent link in the
// contact section (rendered browser-side via the appEmail directive), so it's not
// duplicated here — that also keeps the address out of the static HTML entirely.
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: PROFILE.githubUrl, icon: 'github' },
  { name: 'LinkedIn', url: PROFILE.linkedinUrl, icon: 'linkedin' },
];
