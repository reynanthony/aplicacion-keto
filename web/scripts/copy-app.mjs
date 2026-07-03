/**
 * Post-build script: copies PWA files into dist/app/
 * so both web and app are served from the same origin in production.
 *
 * Web:  ketocore.app/          → dist/
 * App:  ketocore.app/app/      → dist/app/
 *
 * localStorage auth keys are shared across the same origin,
 * so ketocore_onboarding_done and KetoCore_guest work seamlessly.
 */

import { cp, mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import { existsSync } from 'fs';

const PWA_ROOT = resolve(import.meta.dirname, '../../');
const DIST_APP = resolve(import.meta.dirname, '../dist/app');

// Files and dirs to copy from PWA root
const COPY_ITEMS = [
  // All HTML pages
  '*.html',
  // Static assets
  'logo.svg',
  'favicon.svg',
  'manifest.json',
  'sw.js',
  // Data
  'data',
  // Icons
  'icons',
  // Images
  'images',
  // Styles
  'styles',
  // Utils
  'utils',
  // Modules
  'modules',
];

async function copyApp() {
  console.log('📦 Copying PWA to dist/app/...');

  await mkdir(DIST_APP, { recursive: true });

  // Copy all HTML files
  const { readdir } = await import('fs/promises');
  const entries = await readdir(PWA_ROOT, { withFileTypes: true });

  for (const entry of entries) {
    const src = join(PWA_ROOT, entry.name);
    const dest = join(DIST_APP, entry.name);

    // Copy HTML files
    if (entry.isFile() && entry.name.endsWith('.html')) {
      await cp(src, dest);
      console.log(`  ✓ ${entry.name}`);
      continue;
    }

    // Copy key static files
    if (entry.isFile() && ['logo.svg','favicon.svg','manifest.json','sw.js'].includes(entry.name)) {
      await cp(src, dest);
      console.log(`  ✓ ${entry.name}`);
      continue;
    }

    // Copy key directories
    if (entry.isDirectory() && ['data','icons','images','styles','utils','modules','preferences'].includes(entry.name)) {
      if (existsSync(src)) {
        await cp(src, dest, { recursive: true });
        console.log(`  ✓ ${entry.name}/`);
      }
    }
  }

  console.log('✅ PWA copied to dist/app/');
}

copyApp().catch(err => {
  console.error('❌ Copy failed:', err);
  process.exit(1);
});
