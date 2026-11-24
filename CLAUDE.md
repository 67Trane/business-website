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

- `src/app/sections/` — homepage sections in order: hero, showcase (industry demos, `#referenzen`), statement, services, process, about, faq, contact
- `src/app/layout/` — header, footer, contact-bar · `src/app/pages/` — home, legal · `src/app/shared/` — icon, section-heading, email-link, consent-banner
- `src/app/data/i18n.data.ts` — ALL copy (de/en/tr); components read it via `LanguageService.content` signal (`src/app/services/language.ts`). Hero headline markup: `|` = line break, `*…*` = accent
- `.agents/product-marketing.md` — offer, audience, usable proof and NOT-yet-supported claims; read by the marketing skills (copywriting, cro, …) before any copy work, keep its Learnings current
- `src/app/data/demos.data.ts` — industry demos (links, media, per-demo colour theme); copy under `showcase.demos[industry]` in i18n. The "herrmann" demo must never be listed (no permission to advertise it). `site.data.ts` — contact constants
- Demo media: `public/videos/<slug>.mp4` (phone scroll recording), `public/images/demos/<slug>.webp` (+ `-300`, `-desktop`). Regenerate with `tools/record-demo.mjs` (usage in its header) when a demo changes or a new one is added
- `src/app/services/seo.ts` — meta tags; domain mehmet-deliaci.net hardcoded here + in robots/sitemap/llms.txt
- `src/styles.css` — Tailwind `@theme` tokens (`--color-ink/copy/canvas/brand/brand-soft/mist/whatsapp`, fonts, keyframes), component classes (`.site-shell`, `.eyebrow`, `.display-title`, `.primary-button`, `.ghost-button`, `.form-field`, `.device-phone`, `.device-browser`) and the motion primitives (`.word-mask`, `.enter`, `.enter-rise`, `.enter-device`, `[data-reveal]`)
- `public/` — static assets: favicons, fonts (preloaded latin subsets), images, llms.txt, robots.txt, sitemap, .htaccess
- SSR entries: `src/main.ts` (browser), `src/main.server.ts`, `src/server.ts` (Express — custom API endpoints go here)
- Routes split: `src/app/app.routes.ts` (client) / `app.routes.server.ts` (render modes; currently everything prerenders)

## Rules

- Prettier: 100 chars, single quotes, Angular parser for HTML. TS strict + strict templates — code must be diagnostics-clean.
- Component naming without suffixes (`hero.ts` / class `Hero`); prefer signals for state.
- Site copy is German (Sie-Form), de/en/tr in i18n.data.ts. Positioning: premium websites with animations for local businesses, shown per industry. Design is light/editorial with a dark statement band and per-demo coloured showcase cards.
- Motion: transform/opacity only, entrances once on load, scroll effects via CSS scroll timelines behind `@supports` (mark them `data-scroll-fx` so reduced motion switches them off). No always-on multi-path SVG animations (tried and rejected; they broke Chrome paint). Keep the hero's largest text block free of opacity fades (LCP).
- Verify visual/runtime changes in a real browser before calling them done (headless Playwright with `channel: 'chrome'` works; a port conflict on :4200 means the user's dev server is already running — use it).
- Deploy = FTP upload of `dist/business-portfolio/browser` contents (incl. `.htaccess` + `media/`) to all-inkl. Changes to `public/` files only affect live Lighthouse audits after upload.
- End each change with a copyable `git commit -am "..."` (kurz, deutsch, lowercase, prefix style `fix:`/`feat:`/`rework:`).
