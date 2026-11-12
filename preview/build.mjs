// Baut dist/: Frontend-Shell aus .cache/live, eingebettete content/-Dateien durch den Stand des Checkouts ersetzt.
// Zuordnung über Git-Blob-Hash: Jede im Bundle eingebettete Datei wird über die Git-Historie ihrem Pfad zugeordnet.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const LIVE = path.join(import.meta.dirname, '.cache', 'live');
const OUT = path.join(import.meta.dirname, 'dist');
if (!fs.existsSync(LIVE)) { console.error('Zuerst «npm run mirror» ausführen.'); process.exit(1); }

const git = (args, input) => execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8', input, maxBuffer: 1 << 28 });
const blobPath = new Map();
for (const line of git(['rev-list', '--objects', '--all', '--', 'content']).split('\n')) {
  const [h, p] = [line.slice(0, 40), line.slice(41)];
  if (p?.startsWith('content/') && p.endsWith('.md')) blobPath.set(h, p);
}
const hash = (s) => git(['hash-object', '--stdin'], s).trim();
const unesc = (s) => s.replace(/\\(.)/gs, (m, c) => (c === 'n' ? '\n' : c === 't' ? '\t' : c));
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(LIVE, OUT, { recursive: true });
fs.cpSync(path.join(ROOT, 'content', 'uploads'), path.join(OUT, 'images', 'uploads'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'shell.html'),
  fs.readFileSync(path.join(LIVE, 'shell.html'), 'utf8').replace(/<div id="root">[\s\S]*<\/div>(\s*<\/body>)/, '<div id="root"></div>$1'));

// Einstiegsseiten je Sprache, damit auch einfache Static-Server ohne SPA-Fallback funktionieren
// (z. B. «python3 -m http.server»). Weitere Routen funktionieren per Client-Navigation.
const shell = fs.readFileSync(path.join(OUT, 'shell.html'), 'utf8');
fs.writeFileSync(path.join(OUT, 'index.html'), '<meta http-equiv="refresh" content="0;url=/de/">');
for (const l of ['de', 'fr', 'it', 'en']) {
  fs.mkdirSync(path.join(OUT, l), { recursive: true });
  fs.writeFileSync(path.join(OUT, l, 'index.html'), shell);
}

let replaced = 0, kept = 0;
for (const f of fs.readdirSync(path.join(OUT, 'assets')).filter((f) => f.endsWith('.js'))) {
  const file = path.join(OUT, 'assets', f);
  const js = fs.readFileSync(file, 'utf8');
  let out = '', last = 0;
  for (const m of js.matchAll(/`---\n/g)) {
    const i = m.index + 1; let j = i;
    for (;;) { j = js.indexOf('`', j); let k = j - 1, bs = 0; while (js[k] === '\\') { bs++; k--; } if (bs % 2 === 0) break; j++; }
    const text = unesc(js.slice(i, j));
    const p = blobPath.get(hash(text)) ?? blobPath.get(hash(text + '\n'));
    const cur = p && fs.existsSync(path.join(ROOT, p)) ? fs.readFileSync(path.join(ROOT, p), 'utf8') : null;
    out += js.slice(last, i) + (cur != null ? esc(cur) : js.slice(i, j));
    cur != null ? replaced++ : kept++;
    last = j;
  }
  fs.writeFileSync(file, out + js.slice(last));
}
console.log(`dist/ gebaut: ${replaced} Inhaltsdateien aus dem Checkout, ${kept} unverändert (nur im Deploy-Repo oder unbekannt).`);
console.log('Hinweis: Neue Dateien in content/ (z. B. zusätzliche FAQ) erscheinen erst nach einem echten Build im Deploy-Repo.');
