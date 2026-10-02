import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// anything up to 12 -> 12, 13 -> 13, 14 -> 14, 15..17 -> 15 (18px+ is left alone)
const snap = (n) => (n <= 12 ? 12 : n === 13 ? 13 : n === 14 ? 14 : 15);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of walk('src').filter((f) => /\.(jsx?|css)$/.test(f))) {
  const before = readFileSync(file, 'utf8');
  const after = before.replace(/text-\[(\d{1,2})px\]/g, (m, n) => (+n <= 17 ? `text-[${snap(+n)}px]` : m));
  if (after !== before) {
    writeFileSync(file, after);
    console.log('updated', file);
  }
}