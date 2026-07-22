import { DemoSite } from '../models/portfolio.models';

/**
 * Featured demo website shown in the demos section.
 * Copy (industry, description, features, …) is translated in `i18n.data.ts`;
 * this file only holds the language-independent link and image data.
 */
export const FEATURED_DEMO: DemoSite = {
  liveUrl: 'https://mehmet-deliaci.net/demos/immobilienmakler',
  image: '/images/projects/demo-immobilienmakler.webp',
  imageWidth: 1600,
  imageHeight: 1067,
};
