# Lokale Vorschau

Zeigt das **Produktiv-Frontend** von www.ies.swiss mit den Inhalten des aktuellen Checkouts (`content/`).

Frontend (Stand 12.11.2026): Vite + React, React Router, react-i18next, Tailwind CSS. Der Quellcode liegt im privaten Repo `iesng/landing-page-deploy`. Die Markdown-Dateien aus `content/` sind roh im JS-Bundle eingebettet; `build.mjs` ersetzt sie durch den lokalen Stand.

```bash
cd preview
node mirror.mjs   # Frontend-Shell von www.ies.swiss laden (einmalig bzw. nach Frontend-Release)
node build.mjs    # Inhalte aus content/ einsetzen
node serve.mjs    # http://localhost:4321/de
```

Hinter einem Proxy: `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=<ca-bundle> node mirror.mjs`.

## Grenzen

- Nur **bestehende** Inhaltsdateien werden ersetzt. Neue Dateien (z. B. zusätzliche FAQ) und neue Schemafelder erscheinen erst nach einem Build im Deploy-Repo.
- Änderungen an `Translations.*.json` werden nicht übernommen (im Bundle kompiliert).
- Keine Abhängigkeiten, nur Node ≥ 22 und Git.
