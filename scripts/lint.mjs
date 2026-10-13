import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url);
const failures = [];

function walk(directory) {
  const path = new URL(directory, root);
  if (!existsSync(path)) return;
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, path);
    if (entry.isDirectory()) walk(child.pathname);
    else if (/\.(ts|css)$/.test(entry.name)) {
      const content = readFileSync(child, 'utf8');
      if (/TODO|FIXME/.test(content)) failures.push(`${child.pathname}: unresolved TODO/FIXME`);
      if (/\bconsole\.log\s*\(/.test(content)) failures.push(`${child.pathname}: console.log is not allowed`);
    }
  }
}

walk('');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Lint PASS · no unresolved TODO/FIXME markers or console.log calls');
}
