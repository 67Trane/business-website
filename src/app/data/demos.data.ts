import { DemoSite } from '../models/portfolio.models';

/**
 * Live demo websites in the industry showcase, in display order.
 * Copy (industry, name, description, features) is translated in `i18n.data.ts`
 * under `showcase.demos[industry]`; this file holds links, media and colours.
 *
 * Media were recorded from the live demos (headless Chrome, 390×844 @2x):
 * `videos/*.mp4` is a ~12 s scroll-through, `images/demos/*.webp` the settled
 * first screen. Re-record when a demo changes visibly.
 *
 * Not listed on purpose: the "herrmann" demo (no permission to advertise it).
 */
export const DEMOS: DemoSite[] = [
  {
    industry: 'gastronomie',
    liveUrl: 'https://mehmet-deliaci.net/demos/bosporus/',
    video: '/videos/bosporus.mp4',
    poster: '/images/demos/bosporus.webp',
    desktop: '/images/demos/bosporus-desktop.webp',
    theme: {
      bg: '#1a1410',
      ink: '#f6efe2',
      muted: '#cbbca3',
      accent: '#c9a254',
      onAccent: '#1a1410',
      line: 'rgb(246 239 226 / 14%)',
    },
  },
  {
    industry: 'immobilien',
    liveUrl: 'https://mehmet-deliaci.net/demos/immobilienmakler/',
    video: '/videos/immobilienmakler.mp4',
    poster: '/images/demos/immobilienmakler.webp',
    desktop: '/images/demos/immobilienmakler-desktop.webp',
    theme: {
      bg: '#1e2b25',
      ink: '#f1ede4',
      muted: '#bdb8aa',
      accent: '#c09a62',
      onAccent: '#16201b',
      line: 'rgb(241 237 228 / 14%)',
    },
  },
  {
    industry: 'barbershop',
    liveUrl: 'https://mehmet-deliaci.net/demos/jefferson/',
    video: '/videos/jefferson.mp4',
    poster: '/images/demos/jefferson.webp',
    desktop: '/images/demos/jefferson-desktop.webp',
    theme: {
      bg: '#f5f5f2',
      ink: '#0b0b0b',
      muted: '#52524e',
      accent: '#0b0b0b',
      onAccent: '#ffffff',
      line: 'rgb(11 11 11 / 14%)',
    },
  },
  {
    industry: 'kfz',
    liveUrl: 'https://mehmet-deliaci.net/demos/reifenservice/',
    video: '/videos/reifenservice.mp4',
    poster: '/images/demos/reifenservice.webp',
    desktop: '/images/demos/reifenservice-desktop.webp',
    theme: {
      bg: '#111112',
      ink: '#f5f3ee',
      muted: '#aeaba4',
      accent: '#f5c518',
      onAccent: '#111112',
      line: 'rgb(245 243 238 / 13%)',
    },
  },
];
