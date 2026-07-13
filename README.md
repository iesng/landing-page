# landing-page

Content repo for the static landing page at www.ies.swiss. This repo holds the **editorial
content** — `content/` (CMS-managed Markdown + uploads) and the `Translations.*.json` UI
strings.

Unlike the other IES micro-frontends (which are SPAs behind a login), the site is
pre-rendered static HTML for SEO purposes. The apex `ies.swiss` is reserved.

## How it works

### URL-based internationalization

Languages are encoded in the URL path rather than stored as a user preference:

```
/de/                       -> German home page
/en/                       -> English home page
/de/impressum              -> German legal notice
/en/legal-notice           -> English legal notice
/fr/conditions-d-utilisation -> French legal page
```

Supported languages: `de`, `en`, `fr`, `it`. Default language: `de`. UI strings for each
language live in the top-level `Translations.{de,en,fr,it}.json` files.

### Content management (CMS)

Editorial content lives in the top-level `content/` folder (Markdown).

## Privacy & analytics

This site ships with **no analytics, no third-party scripts, and no cookies**. That is a deliberate
launch decision, not an oversight — it's why there is no consent banner.

If analytics is requested post-launch, prefer consentless options (e.g. Plausible, anonymised Matomo)
so the no-banner stance can be preserved. Anything that sets cookies or sends personal data to a
third party will require revisiting consent UX, the privacy policy, and the deferred CSP work.
