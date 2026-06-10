# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A business portfolio site built with Angular 21 (standalone components, signals) with server-side rendering via `@angular/ssr` and an Express server. Styling is Tailwind CSS v4 (configured through `.postcssrc.json` with `@tailwindcss/postcss`; no `tailwind.config.js` — Tailwind is imported in `src/styles.css` via `@import "tailwindcss"`).

## Commands

```bash
npm start                              # Dev server at http://localhost:4200
npm run build                          # Production build to dist/business-portfolio
npm run watch                          # Development build in watch mode
npm test                               # Run unit tests (Vitest via @angular/build:unit-test)
npm test -- --include src/app/app.spec.ts   # Run a single test file
npm run serve:ssr:business-portfolio   # Serve the built SSR app (port 4000, after build)
ng generate component <name>           # Scaffold a new component
```

Note: despite the README mentioning Karma, tests actually run on Vitest (jsdom) via the `@angular/build:unit-test` builder.

## Architecture

- **Standalone app, no NgModules.** Bootstrapped in `src/main.ts` with `appConfig` from `src/app/app.config.ts` (router, client hydration with event replay, global error listeners).
- **SSR setup spans three entry points:**
  - `src/main.ts` — browser bootstrap
  - `src/main.server.ts` — server bootstrap, merges `app.config.server.ts` (server rendering + server routes) over the base config
  - `src/server.ts` — Express server; serves static files from `dist/.../browser` and delegates everything else to `AngularNodeAppEngine`. Custom API endpoints go here.
- **Routing is split:** client routes in `src/app/app.routes.ts`, server render modes in `src/app/app.routes.server.ts`. All routes currently prerender (`RenderMode.Prerender` on `**`); when adding routes that need request-time data, change their render mode there.
- Static assets go in `public/` (mapped as build assets).

## Code Style

- Prettier is configured in `package.json`: 100-char width, single quotes, Angular parser for HTML templates.
- TypeScript is strict (`strict`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, Angular strict template options in `tsconfig.json`).
- Components use the new Angular naming convention without suffixes (`app.ts` / `App` class, not `app.component.ts` / `AppComponent`); follow this for new components and prefer signals for state.
