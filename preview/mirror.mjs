// Lädt die Frontend-Shell (HTML, JS, CSS, Fonts, statische Bilder) von www.ies.swiss nach .cache/live.
// Benötigt Netzwerkzugriff auf www.ies.swiss. Inhalte (content/) kommen NICHT von dort, sondern aus dem Checkout.
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.IES_BASE ?? 'https://www.ies.swiss';
const OUT = path.join(import.meta.dirname, '.cache', 'live');
const LANGS = ['de', 'fr', 'it', 'en'];

async function get(p, { optional = false } = {}) {
  const r = await fetch(BASE + p);
  if (!r.ok) { if (optional) return null; throw new Error(`${p}: HTTP ${r.status}`); }
  const buf = Buffer.from(await r.arrayBuffer());
  const f = path.join(OUT, p.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, buf);
  return buf.toString('utf8');
}

fs.rmSync(OUT, { recursive: true, force: true });
const html = await get('/de');
fs.renameSync(path.join(OUT, 'de'), path.join(OUT, 'shell.html'));
const refs = new Set();
const scan = (s) => {
  for (const m of s.matchAll(/["'(]\/?((?:assets|images|illustrations|logos)\/[A-Za-z0-9_.\-/]+\.(?:js|css|woff2?|webp|png|svg|jpg|ico))/g)) {
    if (!m[1].startsWith('images/uploads/')) refs.add('/' + m[1]);
  }
};
scan(html);
for (const p of ['/favicon.ico', '/favicon-96x96.png', '/apple-touch-icon.png', '/site.webmanifest']) await get(p, { optional: true });
const chunks = [...refs].filter((p) => /\.(js|css)$/.test(p));
for (let n = 0; n < chunks.length; n++) {
  const p = chunks[n];
  const s = await get(p);
  scan(s);
  // Dynamische Imports relativ zum Chunk, z. B. import("./Translations.de-xyz.js")
  for (const m of s.matchAll(/["']\.\/([A-Za-z0-9_.-]+\.(?:js|css))["']/g)) {
    const q = path.posix.join(path.posix.dirname(p), m[1]);
    if (!chunks.includes(q)) { chunks.push(q); refs.add(q); }
  }
}
for (const l of LANGS) for (const p of [`/images/app-store-badge-${l}.svg`, `/images/google-play-badge-${l}.png`]) refs.add(p);
for (const p of refs) if (!fs.existsSync(path.join(OUT, p))) await get(p, { optional: true });
console.log(`Gespiegelt: ${refs.size} Dateien nach ${OUT}`);
