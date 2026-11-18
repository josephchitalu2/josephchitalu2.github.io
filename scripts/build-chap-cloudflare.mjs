import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = new URL('../cyber-hygiene/', import.meta.url);
const output = new URL('../dist/chap-platform/', import.meta.url);
const files = [
  'index.html', 'app.js', 'accounts.js', 'vault.js', 'vault-ui.js',
  'guidelines.js', 'menu.js', 'style.css', 'fonts.css', 'figma.css', 'vault.css',
];

// Read the required entry points before replacing the generated directory.
const contents = await Promise.all(files.map(name => readFile(new URL(name, source))));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(files.map((name, index) => writeFile(new URL(name, output), contents[index])));
await cp(new URL('assets/', source), new URL('assets/', output), { recursive: true });
console.log(`CHAP static files prepared at ${fileURLToPath(output)}`);
