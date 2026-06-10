import { Project } from '../models/portfolio.models';

/**
 * Reference projects rendered in the references grid.
 * The `gradient` classes are picked up by Tailwind because this file is scanned as a source.
 */
export const PROJECTS: Project[] = [
  {
    title: 'Join',
    description:
      'Projektmanagement-Tool im Kanban-Stil mit Drag & Drop, Kontaktverwaltung und ' +
      'Nutzer-Authentifizierung – für strukturierte Zusammenarbeit im Team.',
    tags: ['Angular', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    gradient: 'from-cyan-500 to-blue-600',
    liveUrl: 'https://example.com/join',
    repoUrl: 'https://github.com/67Trane/join',
    featured: true,
  },
  {
    title: 'Videoflix',
    description:
      'Video-Streaming-Plattform mit Django-Backend, REST-API, automatischer ' +
      'Video-Konvertierung und sicherer Authentifizierung – Frontend in Angular.',
    tags: ['Django', 'Django REST Framework', 'PostgreSQL', 'Docker', 'Angular'],
    gradient: 'from-indigo-500 to-purple-600',
    repoUrl: 'https://github.com/67Trane/videoflix',
    featured: true,
  },
  {
    title: 'Coderr',
    description:
      'REST-API für eine Dienstleister-Plattform mit Angeboten, Bestellungen und ' +
      'Bewertungen – inklusive Filterung, Pagination, Rechteverwaltung und Tests.',
    tags: ['Python', 'Django REST Framework', 'SQLite', 'JWT'],
    gradient: 'from-emerald-500 to-teal-600',
    repoUrl: 'https://github.com/67Trane/coderr',
  },
  {
    title: 'El Pollo Loco',
    description:
      'Interaktives Browser-Game auf Canvas-Basis mit eigener Spiellogik, Animationen, ' +
      'Sound und mobiler Steuerung – komplett in objektorientiertem JavaScript.',
    tags: ['JavaScript', 'OOP', 'HTML Canvas', 'CSS'],
    gradient: 'from-amber-500 to-orange-600',
    liveUrl: 'https://example.com/el-pollo-loco',
    repoUrl: 'https://github.com/67Trane/el-pollo-loco',
  },
];
