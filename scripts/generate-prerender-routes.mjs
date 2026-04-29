import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const workspaceRoot = process.cwd();
const articlesDir = join(workspaceRoot, 'content', 'article');
const outputFile = join(workspaceRoot, 'src', 'prerender-routes.txt');

const files = await readdir(articlesDir, { withFileTypes: true });
const slugs = files
  .filter((f) => f.isFile() && f.name.toLowerCase().endsWith('.md'))
  .map((f) => f.name.replace(/\.md$/i, ''))
  .sort((a, b) => a.localeCompare(b));

const routes = ['/', ...slugs.map((slug) => `/blog/${slug}`)];
await writeFile(outputFile, routes.join('\n') + '\n', 'utf8');

console.log(`Generated ${routes.length} prerender routes -> ${outputFile}`);

