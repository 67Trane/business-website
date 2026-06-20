import { Project } from '../models/portfolio.models';

/**
 * Reference projects rendered in the references grid.
 * Descriptions here are the German defaults – the projects section overlays
 * the translated description from `i18n.data.ts` by index.
 * The muted `gradient` colors match the redesign palette.
 */
export const PROJECTS: Project[] = [
  {
    title: 'Join',
    description:
      'Projektmanagement-Tool im Kanban-Stil mit Drag & Drop, Kontaktverwaltung und ' +
      'Authentifizierung.',
    tags: ['Angular', 'TypeScript', 'Firebase', 'Tailwind'],
    gradient: 'from-[#2c5f8a] to-[#3e7cb1]',
    liveUrl: 'https://mehmet-deliaci.net/nightstalker',
    repoUrl: 'https://github.com/67Trane/join',
    featured: true,
  },
  {
    title: 'Videoflix',
    description:
      'Video-Streaming-Plattform mit Django-Backend, REST-API und automatischer ' +
      'Video-Konvertierung.',
    tags: ['Django', 'DRF', 'PostgreSQL', 'Docker'],
    gradient: 'from-[#7a2c3e] to-[#b13e5c]',
    repoUrl: 'https://github.com/67Trane/videoflix',
    featured: true,
  },
  {
    title: 'Coderr',
    description:
      'REST-API für eine Dienstleister-Plattform mit Angeboten, Bestellungen und ' +
      'Bewertungssystem.',
    tags: ['Python', 'DRF', 'JWT'],
    gradient: 'from-[#2a4e8a] to-[#3a6bb4]',
    repoUrl: 'https://github.com/67Trane/coderr',
  },
  {
    title: 'Nightstalker',
    description:
      'Interaktives Browser-Game auf Canvas-Basis mit eigener Spiellogik, Animationen und Sound.',
    tags: ['JavaScript', 'OOP', 'Canvas'],
    gradient: 'from-[#7a4a2c] to-[#b17040]',
    liveUrl: 'https://mehmet-deliaci.net/nightstalker',
    repoUrl: 'https://github.com/67Trane/nightstalker',
  },
];
