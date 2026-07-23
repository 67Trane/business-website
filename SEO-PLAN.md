# SEO-Plan mehmet-deliaci.net

Basierend auf dem Voll-Audit vom 23.07.2026 (Health Score: 75/100).
Strategie: lokal gewinnbare Nische zuerst („Webentwickler Weißenburg"), Trust mit echten
Projekten aufbauen, erst danach breitere Commercial-Keywords angreifen.

---

## Phase 0 — Sofort-Hygiene (diese Woche, ~1–2 h gesamt)

Rein mechanische Fixes aus dem Audit, keine Entscheidungen nötig:

- [ ] `public/sitemap.xml` auf `/` kürzen (Legal-Seiten sind noindex und gehören nicht rein)
- [ ] Canonical-Fix: `path: '/impressum/'` und `path: '/datenschutz/'` (Trailing-Slash) in
      `src/app/pages/legal/imprint.ts` + `privacy.ts` — Canonical darf nicht auf eine 301-URL zeigen
- [ ] FTP-Altlasten löschen: `/join/` und `/nightstalker/` liefern live noch HTTP 200
      (Reste alter Deploys; FTP löscht nichts von selbst)
- [ ] `public/llms.txt` neu schreiben: alte Projekte (Join, Videoflix, Coderr, Nightstalker) raus,
      aktueller Ein-Seiten-Stand + Demo-Showcase rein
- [ ] Cloudflare-Dashboard: „Block AI Bots"/Content-Signals-Setting prüfen und **bewusst** entscheiden
      (aktuell blockt Cloudflare am Edge u. a. ClaudeBot, GPTBot, CCBot — steht nicht im Repo!).
      Gewählten Stand danach in `public/robots.txt` spiegeln, damit Repo = Live
- [ ] JSON-LD in `src/index.html`: `inLanguage` auf `"de"` korrigieren, solange EN/TR nicht
      über eigene URLs indexierbar sind (Schema behauptet aktuell de/en/tr)
- [ ] `lastmod` in der Sitemap künftig nur noch ändern, wenn sich die Seite wirklich geändert hat

## Phase 1 — Conversion & CWV Foundation (Woche 1–4)

**Kernstück: der Mobile-Above-the-fold-Fix (Critical-Befund).**

- [ ] Consent-Banner auf Mobile als schmale Leiste statt gestapelter Karte; Platz reservieren
      oder SSR-Platzhalter → behebt gleichzeitig: verdeckte CTAs, LCP-Fehlattribution (2,9 s),
      97 % des CLS
- [ ] Hero auf Mobile umbauen: Foto-Höhe reduzieren bzw. Badge/H1/CTA vor das Foto,
      Ziel: Primär-CTA in einem 375×812-Viewport sichtbar — auch mit Banner
- [ ] Verifikation im echten Browser (Playwright, 375×812 + Desktop) — CLAUDE.md-Regel
- [ ] `srcset` für `profile.webp` (640×800 wird bei 347×433 angezeigt, ~150 ms LCP-Potenzial)
- [ ] Font-Audit: 11 Dateien / 199 KB = 50 % des Transfers — ungenutzte Schnitte streichen
      (Preload-Kaskade für Above-fold-Fonts NICHT anfassen, die ist korrekt)
- [ ] About-Sektion: doppeltes DOM (Bio + H2 zweimal wegen Zoom-Parallax) deduplizieren
- [ ] Google Search Console + Bing Webmaster Tools anmelden, Sitemap einreichen
- [ ] IndexNow: Key-Datei ins Root + `curl`-Ping in den Deploy-Ablauf
- [ ] Copy-Quickwins: je einmal „Webdesign" (neben Webentwicklung) und „KMU" natürlich einbauen
- [ ] USt-ID im Impressum nachtragen, sobald vorhanden („folgt" wirkt unfertig)
- [ ] SEO-Baseline setzen: `/seo drift baseline https://mehmet-deliaci.net`

**Messpunkt Ende Phase 1:** Lighthouse mobile LCP < 2,5 s, CLS ≈ 0, CTA above-the-fold,
Site in GSC verifiziert.

## Phase 2 — Content-Ausbau nach SERP-Realität (Woche 5–12)

Die SXO-Analyse zeigt: Nur „webentwickler weißenburg" passt zum aktuellen Seitentyp.
Für alles andere fehlen Formate, die Google dort belohnt.

- [ ] **Preise konkret machen:** FAQ-Antwort „hängt vom Umfang ab" ersetzen durch echte
      Spannen oder 2–3 Pakete (bei „kosten"-Queries ranken ausschließlich Seiten mit Zahlen)
- [ ] **Vergleichsblock** „Baukasten vs. Agentur vs. Freelancer" nahe Services
      (schwächste Persona im Scoring: vergleichender Erstgründer, 46/100)
- [ ] **Erste dedizierte Unterseite:** „Website erstellen lassen – Kosten" als ehrlicher
      Preis-Guide mit Tabelle + FAQ — matcht das dominante SERP-Format der Query,
      intern verlinkt aus FAQ/Services
- [ ] Weitere Astro-Demo(s) für zusätzliche Branchen → Demo-Showcase ausbauen
- [ ] Local-Entscheidung: Google Business Profile ja/nein (Abwägung gegen Adress-Privacy;
      ohne GBP kein Local Pack für „webentwickler weißenburg")
- [ ] Branchenbucheinträge (NAP konsistent): freelancermap, GULP, ggf. 11880/GelbeSeiten
- [ ] LinkedIn-Profil live + von dort verlinken (offenes Launch-TODO)

**Messpunkt:** GSC-Impressions für „webentwickler weißenburg" + Kosten-Query-Set,
erste Klicks organisch.

## Phase 3 — Trust & Authority (Monat 3–6)

Trust ist über alle Personas die schwächste Dimension (8–14/25) — behebbar nur mit echten Projekten.

- [ ] Nach jedem echten Kundenprojekt: kurzes Testimonial einholen (2–3 Sätze, Name + Firma)
- [ ] 1–2 echte Case Studies (Ausgangslage → Umsetzung → messbares Ergebnis → Zitat);
      ersetzt schrittweise die Beweislast der fiktiven Demo
- [ ] Kunden-Referenzseiten: um Verlinkung bitten (natürlichste Linkquelle)
- [ ] Erst wenn echte Bewertungen existieren: `AggregateRating`/`Review` ins Schema
      (nichts faken — aktuell korrekt weggelassen)
- [ ] EN/TR-Grundsatzentscheidung umsetzen: entweder `/en/` + `/tr/` Prerender-Routen
      mit hreflang ODER bewusst German-only und EN/TR nur als UI-Komfort behalten
- [ ] `BreadcrumbList` auf Legal-Seiten injizieren (JSON-LD liegt aus dem Audit vor)
- [ ] `dateModified` im JSON-LD + sichtbares „Stand:"-Datum

## Phase 4 — Skalierung & Monitoring (Monat 6–12)

- [ ] Optional Blog/Insights — nur bei echter Kapazität, Qualität vor Kadenz
      (Themen: lokale Fallstudien, Technik-Entscheidungen für KMU, Demo-Making-ofs)
- [ ] Weitere Branchen-Landingpages nur mit ≥60 % Unique-Content pro Seite (Quality Gate)
- [ ] CSP nachrüsten (nonce/hash-basiert, wegen Angular-Inline-Scripts separat testen)
- [ ] HSTS `preload` ergänzen
- [ ] Monatlich: `/seo drift compare` + GSC-Review (Queries, Indexierung, CWV-Felddaten)
- [ ] Optional: kostenloser Moz-API-Key für DA/PA in künftigen Audits

## Bewusst NICHT geplant

- **FAQPage-Schema** — Google hat FAQ-Rich-Results 05/2026 komplett eingestellt; die
  `<details>`-FAQ ist im SSR-HTML bereits perfekt maschinenlesbar
- **`geo`-Koordinaten/Öffnungszeiten im Schema** — kollidiert mit der bewussten
  Adress-Privacy-Entscheidung; nur relevant, falls GBP-Entscheidung pro Local ausfällt
- **Breite Head-Keywords** („webseite erstellen lassen" bundesweit, „webdesigner freelancer")
  — strukturell von Agenturen/Marketplaces besetzt, kein realistisches Ziel für eine Solo-Domain

## KPI-Ziele

| Metrik | Baseline (07/2026) | 3 Monate | 6 Monate | 12 Monate |
|---|---|---|---|---|
| Organische Klicks/Monat | ~0 (Domain neu) | erste Klicks | 50–150 | 300+ |
| „webentwickler weißenburg" | nicht gemessen | Top 10 | Top 5 | Top 3 |
| Indexierte Seiten | 1 | 2–3 | 3–5 | 5–8 |
| Referring Domains | 0 | 3–5 | 8–12 | 15+ |
| CWV (mobile, Lab) | LCP 2,9 s / CLS 0,07 | alles grün | grün (Felddaten in CrUX) | grün |
| Echte Testimonials | 0 | 1 | 2–3 | 5+ |
