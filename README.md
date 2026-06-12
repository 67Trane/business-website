# mehmet-deliaci.net – Business-Website

Geschäftliche Website meiner Selbständigkeit als Webentwickler: **[mehmet-deliaci.net](https://mehmet-deliaci.net)**

Eine mehrsprachige One-Page-Site (Deutsch / Englisch / Türkisch) mit Leistungen, Arbeitsablauf, Projekten und Kontakt – gebaut mit Angular 21 und Tailwind CSS 4, vollständig prerendert und auf klassischem Shared Hosting deploybar.

## Qualität

| Lighthouse | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

- **Barrierefreiheit nach WCAG AA**: geprüfte Farbkontraste (≥ 4,5:1), Skip-Link, sichtbare Fokus-Ringe, Screenreader-Unterstützung, `prefers-reduced-motion` wird respektiert
- **DSGVO-freundlich**: keine Cookies, kein Tracking, selbst gehostete Fonts (kein Google-Fonts-CDN), Kontakt ohne serverseitige Datenverarbeitung
- **SEO**: Prerendering (volles HTML für Crawler), Canonical-URLs, Open Graph + Twitter Cards, strukturierte Daten (JSON-LD), `robots.txt` + `sitemap.xml`

## Tech-Stack

- **Angular 21** – Standalone Components, Signals, neue Control-Flow-Syntax (`@for`/`@if`), OnPush
- **SSR / Prerendering** via `@angular/ssr` – alle Routen werden beim Build zu statischem HTML
- **Tailwind CSS 4** – Theme-Tokens (Farben, Typo-Skala) in `src/styles.css`, keine `tailwind.config.js`
- **Fonts**: Spectral, Hanken Grotesk, Spline Sans Mono – selbst gehostet via `@fontsource`
- **Tests**: Vitest (jsdom) über den `@angular/build:unit-test`-Builder
- **i18n**: Eigene, leichtgewichtige Lösung – ein `LanguageService` (Signal) liefert die Texte aus `i18n.data.ts`, Sprachwechsel ohne Reload

## Befehle

```bash
npm start                              # Dev-Server auf http://localhost:4200
npm run build                          # Production-Build inkl. Prerendering nach dist/
npm test                               # Unit-Tests (Vitest)
npm run serve:ssr:business-portfolio   # Gebaute SSR-App lokal serven (Port 4000)
```

## Projektstruktur

```
src/app/
├── data/            # Inhalte: i18n-Texte (de/en/tr), Projekte, Profil/Links
├── services/        # LanguageService (Sprach-Signal), Seo (Canonical/Meta pro Seite)
├── models/          # Interfaces (Project, Profile, SocialLink)
├── layout/          # Header (Nav, Sprachumschalter), Footer
├── sections/        # hero, services, process, projects, about, contact
├── shared/          # Icon-Set (inline SVG), SectionHeading, ProjectCard
└── pages/           # home (Komposition der Sections), legal (Impressum, Datenschutz)
```

**Inhalte ändern:** Nahezu alle Texte liegen zentral in `src/app/data/i18n.data.ts` (drei Sprachen) bzw. `projects.data.ts` und `site.data.ts` – Templates müssen dafür nicht angefasst werden.

## Deployment (Shared Hosting / FTP)

Die Seite läuft ohne Node-Server – das Prerendering erzeugt fertiges statisches HTML:

1. `npm run build`
2. Den **Inhalt** von `dist/business-portfolio/browser/` per FTP in das DocumentRoot der Domain laden
3. Wichtig: die versteckte `.htaccess` (HTTPS-Redirect, Fallback-Routing, Caching, Kompression) sowie die Ordner `media/` (Fonts) und `images/` mit hochladen

© Mehmet Deliaci – Code darf gern als Referenz gelesen werden.
