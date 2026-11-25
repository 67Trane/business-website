# Local SEO Analysis: mehmet-deliaci.net (2026-11-24)

Scope: live homepage `https://mehmet-deliaci.net/` and `/impressum/`, fetched and parsed with the claude-seo 2.6.2 runtime. Off-site sources (Google Business Profile, directories, review platforms) were **not** searched, because that would mean sending the business name to outside services; see Limitations.

## Status update 2026-11-25

Done (via the browser, owner approved):
- **Google Business Profile "Mehmet Deliaci Webentwicklung"** (CID 1316972623301301534) checked: verified, primary category Webdesigner, address hidden, service area Weißenburg, Treuchtlingen, Gunzenhausen, Pleinfeld, Roth, Eichstätt, Ansbach, hours Mon–Sat 09–19 (all already correct).
- New description (websites with animations per industry), website link with `utm_source=gbp`, LinkedIn linked.
- Services: 6 software services removed (owner wants a website-only public focus); 4 added: Website für Gastronomie / Immobilienmakler / Friseure und Barbershops / Kfz-Werkstätten, each "ab 1.000 €" with description.
- Photos: MD logo, Bosporus demo as cover, 3 more demo screenshots.
- Site schema: `alternateName`, `areaServed` (same 7 towns), `openingHoursSpecification`, `priceRange`, `hasMap` + `sameAs` to the Maps profile. Sitemap lastmod updated.
- Search Console: re-indexing of `/` requested (Google still showed the old title "Webentwickler Weißenburg: Websites & Web-Apps"), sitemap submitted for the first time. `/privacy-policy` (old URL, 404) now redirects to `/datenschutz/`.

Still open: reviews (0; link https://g.page/r/CR7VyY6f00YSECE/review), Bing Places import, German directories, industry pages, old subdomains `join.` / `pollo.mehmet-deliaci.net` reported as redirect errors in Search Console.

## Local SEO Score: 29/100 (before the changes above)

| Dimension | Weight | Score | Weighted | Main reason |
|---|---|---|---|---|
| GBP signals | 25% | 15 | 3.8 | No profile link, map, place ID or review widget on the site; GBP existence unverified |
| Reviews & reputation | 20% | 5 | 1.0 | No reviews, ratings or testimonials anywhere |
| Local on-page | 20% | 55 | 11.0 | City in title and copy, click-to-call; H1 has no local intent, no service pages |
| NAP & citations | 15% | 40 | 6.0 | Page and schema agree; Impressum lacks phone; citations unverified |
| Local schema | 10% | 60 | 6.0 | Valid `ProfessionalService` graph; `areaServed` too broad, no hours/priceRange |
| Local links & authority | 10% | 10 | 1.0 | No chamber, press, partner or client credit links detectable |
| **Total** | | | **28.8 → 29** | |

**How to read this:** the parts the website controls (on-page and schema) are in decent shape. The score collapses on the off-site 70 % (profile, reviews, citations, links), which for a new solo business is normal and mostly fixable for free. The single biggest lever is a Google Business Profile.

## Business type: Service Area Business (hybrid working mode)

- No storefront; the street address appears only in the Impressum (`noindex`), schema is locality-only on purpose (comment in `src/index.html:35-37`).
- Service language: "Vor Ort in der Region und remote" (about facts), "Webdesign aus Weißenburg in Bayern" (hero eyebrow).
- Consequence: map embed and full-address consistency checks are skipped. On Google the address should be **hidden** and a service area set instead (Google's rule for businesses that don't receive customers at their address).

## Vertical: web design / professional service (generic LocalBusiness path)

None of the six specialised verticals apply. `ProfessionalService` is a valid LocalBusiness subtype and the right choice; no change needed. Industry-specific angle: the site sells to local businesses by industry, so the natural "service pages" are per-industry pages built around the existing demos (see action 4).

## GBP optimization checklist

| Signal | Status |
|---|---|
| Profile exists / verified | **Exists** (owner confirmed 2026-11-25). Settings, verification state and reviews not yet checked; not linked from the site |
| Link from site to profile (sameAs / hasMap / "Bewertungen" link) | Missing |
| Primary category | Recommend **Webdesigner** (EN UI: "Website designer"); this is the #1 local pack factor |
| Secondary categories | Pick from the picker what is true, e.g. Webentwickler / Internet-Marketing-Service; don't add categories you don't sell |
| Service area | Set Weißenburg in Bayern, Treuchtlingen, Gunzenhausen, Pappenheim, Ellingen, Pleinfeld, Roth, Eichstätt (max. 20 areas, ~2 h drive) |
| Address | Hide it (SAB) |
| Hours | Not shown anywhere; add to GBP and mirror on the site ("open now" is a ranking factor) |
| Photos | Use the real assets you have: avatar, demo screenshots (`public/images/demos/*-desktop.webp`), phone mockups |
| Services list | Mirror the six `makesOffer` services from the schema, with "ab 1.000 €" where it fits |
| Description | Reuse the humanized About/hero copy; answer the FAQ questions there too (public Q&A is being phased out) |
| Posts | Optional; one post per new demo or finished project keeps the profile active |
| Website link | Homepage with a UTM tag (`?utm_source=gbp&utm_medium=organic`) so GBP traffic is separable from Google Ads in analytics |

**Name:** use the same name you use on invoices and in the Impressum. "Mehmet Deliaci" is safe; "Mehmet Deliaci Webdesign" only if that is the real business name everywhere. Adding keywords that aren't part of the real name ("Webdesign Weißenburg Mehmet") risks suspension.

## Review health snapshot

| Check | Finding |
|---|---|
| Google review count | None detectable (threshold that matters: 10) |
| Star rating / `aggregateRating` | None. Don't add `aggregateRating` until real reviews exist |
| Recency / velocity | n/a |
| Owner responses | n/a |
| Other platforms | None (ProvenExpert and Trustpilot are the usual second platforms for German service providers) |
| Testimonials on site | None; `.agents/product-marketing.md` lists "real client quotes with permission" as not yet supported |
| Review gating | None found (good). Keep it that way: send every client the same direct review link, no "were you happy?" pre-filter and no incentives |

## NAP consistency audit

| Source | Name | Address | Phone |
|---|---|---|---|
| Homepage visible text | "Mehmet Deliaci · Webdesign & Entwicklung" (footer), "Mehmet Deliaci" (about) | "Weißenburg in Bayern" (hero, about facts); no street | "+49 15567 432567" as `tel:` link (hero, contact, sticky bar) |
| JSON-LD `#business` | "Mehmet Deliaci, Webdesign & Entwicklung" | Weißenburg in Bayern, 91781, DE (no street, by design) | +4915567432567 |
| Impressum | "Mehmet Deliaci" | Nördliche Ringstraße 23, 91781 Weißenburg in Bayern | **missing** (email only) |
| GBP | unverified | unverified | unverified |

Findings:
1. **Phone missing from the Impressum.** Not a legal problem (email is enough), but it is the one page with the full legal NAP. Add the same `+49 15567 432567`.
2. **Name has two forms** ("Mehmet Deliaci" vs. "Mehmet Deliaci, Webdesign & Entwicklung"). The core name matches, so this is minor. Decide which form goes into GBP and the directories and use it everywhere, including the Impressum if you add the trade name there.
3. **Street spelling** "Nördliche Ringstraße 23" was normalised from your input in June and is still unconfirmed. Confirm it before submitting to any directory; directories copy each other's errors.
4. Phone digits match between page and schema. Use the exact visible format (`+49 15567 432567`) in every directory.

## Citation presence check

Not checked (would require searching your name on outside services). Tier-1 targets for a German SAB, in order:

1. Google Business Profile (action 1)
2. Bing Places (import directly from GBP; Bing feeds ChatGPT and Copilot)
3. Apple Business Connect (Apple Maps, Siri)
4. Das Örtliche, Gelbe Seiten, Das Telefonbuch
5. 11880.com, Cylex, Yelp, Foursquare, meinestadt.de

Same name, same phone format, address hidden or locality-only wherever the directory allows it.

## Local schema status

Present and valid: `@graph` with `WebSite`, `Person`, `ProfessionalService` (`@id`, name, url, image, telephone, PostalAddress locality+postal code, founder, sameAs, makesOffer ×6, description) and an `ItemList` of the four demos. 0 invalid blocks.

Gaps:
- `areaServed: "DE"` is the whole country; the local signal is the region.
- No `openingHoursSpecification`, no `priceRange`.
- No link to the Google profile (`hasMap` / `sameAs`), because there isn't one on the site yet.
- `geo` deliberately left out: with a hidden address, coordinates would either expose the home address or point at a spot that isn't the business. Keep it out unless you decide to show the street.

**Ready-to-use fix** (merge these keys into the `#business` node in `src/index.html`; confirm hours first, add the two GBP lines only after action 1):

```json
{
  "areaServed": [
    { "@type": "City", "name": "Weißenburg in Bayern" },
    { "@type": "City", "name": "Treuchtlingen" },
    { "@type": "City", "name": "Gunzenhausen" },
    { "@type": "City", "name": "Pappenheim" },
    { "@type": "City", "name": "Ellingen" },
    { "@type": "City", "name": "Pleinfeld" },
    { "@type": "City", "name": "Roth" },
    { "@type": "City", "name": "Eichstätt" },
    { "@type": "AdministrativeArea", "name": "Landkreis Weißenburg-Gunzenhausen" },
    { "@type": "Country", "name": "Deutschland" }
  ],
  "priceRange": "ab 1.000 €",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "hasMap": "https://maps.google.com/?cid=<GBP-CID>",
  "sameAs": [
    "https://www.github.com/67Trane",
    "https://www.linkedin.com/in/mehmet-deliaci-24285535a",
    "https://maps.google.com/?cid=<GBP-CID>"
  ]
}
```

## Location page quality

Single location, no location pages. Do **not** create city pages ("Webdesign Gunzenhausen", "Webdesign Treuchtlingen") with swapped town names; that is the doorway pattern that loses rankings. Industry pages (action 4) are the better structure, and the GBP service area covers the towns.

## Top 10 prioritized actions

| # | Priority | Action | Why (first principle) | Done when / how we'd know it failed |
|---|---|---|---|---|
| 1 | Critical | **Complete the existing Google Business Profile** (exists since before 2026-11-25) as SAB: hidden address, primary category Webdesigner, service area as above, hours, 5–10 real photos, services, description; then link it from the site | GBP is ~32 % of local pack weight; without it you can't appear in the map pack at all | Profile verified and visible for "Webdesigner Weißenburg". Failed if it still doesn't show after 4 weeks: check category and verification status |
| 2 | Critical | **Start reviews**: after every finished project send the direct review link (GBP → "Ask for reviews"), answer every review. First target: 10 | Reviews ~20 % of local weight; 10 is the first visible threshold | Steady flow, no gap longer than 2–3 weeks while projects run. Watch: review count in GBP |
| 3 | High | **Bing Places** (import from GBP) and **Apple Business Connect** | Bing feeds ChatGPT and Copilot; Apple feeds Siri and Apple Maps. 30 minutes once GBP exists | Listings live with identical NAP. Depends on #1 |
| 4 | High | **One page per industry** (e.g. `/webdesign-gastronomie/`, `/webdesign-immobilienmakler/`, `/webdesign-friseur/`, `/webdesign-werkstatt/`) built on each demo: what that industry's site needs, the demo, price, FAQ | Dedicated service pages are the #1 local organic factor. They also give each Google Ads ad group a matching landing page | 4 prerendered routes in the sitemap and indexed in Search Console. Watch: impressions per page in GSC |
| 5 | High | **Schema update** from the fix above (areaServed, priceRange, hours; GBP links after #1) | Lets Google and AI assistants read the service region and price without guessing | Rich Results Test passes, no warnings. Depends on hours decision and #1 |
| 6 | Medium | **German directories** (Das Örtliche, Gelbe Seiten, Das Telefonbuch, 11880, Cylex, Yelp, Foursquare) with identical NAP | Citations are 3 of the top 5 AI-visibility factors | Listed and consistent. Confirm the street spelling first |
| 7 | Medium | **Local intent in the H1 without touching the headline**: move the eyebrow "Webdesign aus Weißenburg in Bayern" inside the `<h1>` as a visually unchanged span | The chosen headline stays; the H1 text gains city + service | H1 reads "Webdesign aus Weißenburg in Bayern So kann Ihre neue Website aussehen." with no visual change and no LCP regression (check in browser) |
| 8 | Medium | **Impressum**: add the phone number, and the trade name if you use one; while there, resolve the "USt-ID: folgt" line (legal TODO since June) | Completes the one page with the full legal NAP | Impressum, homepage, schema and GBP show the same name and phone |
| 9 | Medium | **Sitemap**: `lastmod` is still 2026-07-23. Generate it at build time, submit in Search Console and Bing Webmaster Tools | A stale lastmod tells crawlers nothing changed since July, though the whole site was rebuilt | lastmod matches the deploy date. Needed anyway for #4 |
| 10 | Low | **Local links**: a small credit link ("Website: Mehmet Deliaci", brand anchor) on every client site, a story in the local paper about the industry demos, listings with the city's or district's business development office | Links are ~26 % of local organic ranking; brand mentions also drive AI visibility | First 3 local referring domains. Watch: Bing Webmaster Tools → backlinks |

Order of dependency: 1 → 3, 5 (GBP lines), 6 → 2 runs continuously. 4 and 9 belong together. 7 and 8 are small and independent.

## AI search note

ChatGPT doesn't read GBP; it draws on Bing, Yelp and similar sources, which is why #3 and #6 matter beyond Google. `llms.txt` is in place. For the full AI-visibility check run `/seo geo https://mehmet-deliaci.net`.

## Limitations

This analysis could **not** assess:
- Whether a Google Business Profile already exists, its category, verification state or Insights data
- Existing directory listings and their NAP (not searched, see scope)
- Geo-grid rankings and real local pack position for "Webdesigner Weißenburg" and nearby towns
- Domain authority and the full backlink profile
- Search volume for local web-design queries in the district

Tools that fill these gaps: Local Falcon or BrightLocal (geo-grid), Whitespark or BrightLocal (citation audit), DataForSEO business listings via `/seo maps` (needs the DataForSEO extension), Google Search Console (actual queries and impressions), Bing Webmaster Tools (free backlink data).
