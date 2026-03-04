/**
 * Capture screenshots of every poster from the built Storybook.
 *
 * Usage:
 *   npm run build-storybook
 *   npm run capture
 *
 * Requires: npx playwright install chromium
 */

import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const STORYBOOK_DIR = join(import.meta.dirname, '..', 'storybook-static');
const OUTPUT_DIR = join(import.meta.dirname, '..', 'docs', 'screenshots');
const VIEWPORT = { width: 1080, height: 1080 };
const WAIT_MS = 3000;

const POSTERS: { name: string; storyId: string }[] = [
  { name: 'text-explosion', storyId: 'posters-textexplosion--default' },
  { name: 'word-reveal', storyId: 'posters-wordreveal--default' },
  { name: 'letter-grid', storyId: 'posters-lettergrid--mutiti-style' },
  { name: 'letter-chase', storyId: 'posters-letterchase--default' },
  { name: 'screen-flicker', storyId: 'posters-screenflicker--default' },
  { name: 'letter-scatter', storyId: 'posters-letterscatter--contrast-style' },
  { name: 'physics-blobs', storyId: 'posters-physicsblobs--default' },
  { name: 'static-typography', storyId: 'posters-statictypography--default' },
  { name: 'scroll-carousel', storyId: 'posters-scrollcarousel--default' },
];

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function serve(dir: string, port: number): Promise<ReturnType<typeof createServer>> {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let url = req.url?.split('?')[0] ?? '/';
      if (url.endsWith('/')) url += 'index.html';

      const filePath = join(dir, url);
      try {
        const data = await readFile(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(port, () => resolve(server));
  });
}

async function main() {
  if (!existsSync(STORYBOOK_DIR)) {
    console.error('Storybook not built. Run: npm run build-storybook');
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const port = 6099;
  const server = await serve(STORYBOOK_DIR, port);
  console.log(`Serving storybook-static on :${port}`);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });

  for (const poster of POSTERS) {
    const page = await context.newPage();
    const url = `http://localhost:${port}/iframe.html?id=${poster.storyId}&viewMode=story`;
    console.log(`  Capturing ${poster.name}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(WAIT_MS);
    await page.screenshot({ path: join(OUTPUT_DIR, `${poster.name}.png`) });
    await page.close();
  }

  // Gallery screenshot
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    const url = `http://localhost:${port}/iframe.html?id=overview-about--about&viewMode=story`;
    console.log('  Capturing gallery...');
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(WAIT_MS);
    await page.screenshot({ path: join(OUTPUT_DIR, 'gallery.png') });
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`Done. Screenshots saved to ${OUTPUT_DIR}`);
}

main();
