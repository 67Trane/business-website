import { Service } from '../models/portfolio.models';

/** Service offerings rendered as cards in the services section. */
export const SERVICES: Service[] = [
  {
    icon: 'monitor',
    title: 'Websites & Landingpages',
    description:
      'Individuelle Unternehmensseiten, die Ihre Marke professionell präsentieren – ' +
      'maßgeschneidert statt Baukasten von der Stange.',
    points: ['Responsive Design', 'Klares, modernes Layout', 'Suchmaschinenoptimiert'],
  },
  {
    icon: 'code',
    title: 'Web-Anwendungen',
    description:
      'Maßgeschneiderte Web-Apps mit Angular – vom internen Tool bis zur Kundenplattform, ' +
      'sauber strukturiert und erweiterbar.',
    points: ['Angular & TypeScript', 'Skalierbare Architektur', 'Durchdachte UI/UX'],
  },
  {
    icon: 'database',
    title: 'Backend & Schnittstellen',
    description:
      'Sichere REST-APIs und serverseitige Logik mit Python und Django – das stabile ' +
      'Fundament Ihrer Anwendung.',
    points: ['Django REST APIs', 'Datenbankdesign', 'Authentifizierung & Rechte'],
  },
  {
    icon: 'gauge',
    title: 'Performance & SEO',
    description:
      'Schnelle Ladezeiten und Sichtbarkeit bei Google – durch Server-Side Rendering, ' +
      'Prerendering und technisch sauberes Markup.',
    points: ['Server-Side Rendering', 'Core Web Vitals', 'Technisches SEO'],
  },
  {
    icon: 'wrench',
    title: 'Wartung & Weiterentwicklung',
    description:
      'Ihre Website bleibt aktuell, sicher und wächst mit Ihrem Unternehmen – mit ' +
      'regelmäßigen Updates und neuen Funktionen.',
    points: ['Updates & Sicherheit', 'Fehlerbehebung', 'Ausbau neuer Features'],
  },
  {
    icon: 'message',
    title: 'Beratung & Konzept',
    description:
      'Von der Idee zum Konzept: Ich berate Sie ehrlich, welche Lösung zu Ihren Zielen ' +
      'und Ihrem Budget passt.',
    points: ['Kostenloses Erstgespräch', 'Klare Empfehlungen', 'Transparente Angebote'],
  },
];
