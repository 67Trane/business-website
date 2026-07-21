# CLAUDE.md

Business portfolio site (mehmet-deliaci.net): Angular 21, standalone components, signals, SSR via `@angular/ssr` + Express. Tailwind CSS v4 through `.postcssrc.json` — no `tailwind.config.js`; imported in `src/styles.css` via `@import "tailwindcss"`.

## Commands

```bash
npm start                              # Dev server, http://localhost:4200
npm run build                          # Prod build to dist/business-portfolio
npm test                               # Vitest (jsdom) — NOT Karma, despite README
npm test -- --include src/app/app.spec.ts
npm run serve:ssr:business-portfolio   # Serve built SSR app on port 4000
```

## Where things live

- `src/app/sections/` — homepage sections: hero, trust, services, about, process, projects, faq, contact
- `src/app/layout/` — header, footer · `src/app/pages/` — home, legal · `src/app/shared/` — icon, project-card, section-heading
- `src/app/data/i18n.data.ts` — ALL copy (de/en/tr); components read it via `LanguageService.content` signal (`src/app/services/language.ts`)
- `src/app/data/projects.data.ts`, `site.data.ts` — project list, site constants
- `src/app/services/seo.ts` — meta tags; domain mehmet-deliaci.net hardcoded here + in robots/sitemap/llms.txt
- `src/styles.css` — Tailwind `@theme` tokens (`--color-ink/copy/canvas/brand`, fonts, keyframes) and reusable component classes (`.site-shell`, `.eyebrow`, `.display-title`, `.primary-button`, …)
- `public/` — static assets: favicons, fonts (preloaded latin subsets), images, llms.txt, robots.txt, sitemap, .htaccess
- SSR entries: `src/main.ts` (browser), `src/main.server.ts`, `src/server.ts` (Express — custom API endpoints go here)
- Routes split: `src/app/app.routes.ts` (client) / `app.routes.server.ts` (render modes; currently everything prerenders)

## Rules

- Prettier: 100 chars, single quotes, Angular parser for HTML. TS strict + strict templates — code must be diagnostics-clean.
- Component naming without suffixes (`hero.ts` / class `Hero`); prefer signals for state.
- Site copy is German (Sie-Form), de/en/tr in i18n.data.ts. Design is light/editorial — no heavy always-on animations (multi-path SVG effects were tried and rejected; they broke Chrome paint).
- Verify visual/runtime changes in a real browser before calling them done (headless Playwright with `channel: 'chrome'` works; a port conflict on :4200 means the user's dev server is already running — use it).
- Deploy = FTP upload of `dist/business-portfolio/browser` contents (incl. `.htaccess` + `media/`) to all-inkl. Changes to `public/` files only affect live Lighthouse audits after upload.
- End each change with a copyable `git commit -am "..."` (kurz, deutsch, lowercase, prefix style `fix:`/`feat:`/`rework:`).
