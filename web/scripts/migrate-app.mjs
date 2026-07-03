/**
 * Migrates KetoCore PWA HTML pages → Astro pages under src/pages/app/
 * Also copies static assets (JS, data, modules, icons, images) to public/app/
 * so they're served at /app/ in Astro dev and production.
 *
 * Run from web/ directory: node scripts/migrate-app.mjs
 * Or pass specific files:  node scripts/migrate-app.mjs index.html macros.html
 */

import { readFile, writeFile, mkdir, readdir, cp } from 'fs/promises';
import { existsSync } from 'fs';
import { join, resolve, basename } from 'path';

const PWA_ROOT  = resolve(import.meta.dirname, '../../');
const WEB_ROOT  = resolve(import.meta.dirname, '..');
const PAGES_DIR = join(WEB_ROOT, 'src/pages/app');
const PUBLIC_DIR = join(WEB_ROOT, 'public/app');

// HTML pages to skip — public web pages, dev tools, backups
const SKIP = new Set([
  'landing.html', 'recetas-publicas.html',
  'diagnostic.html', 'test.html', 'migrate.html',
  'entrenamientos_test.html', 'entrenamientos_v2_backup.html',
  'generate-recipe-images.html',
]);

// Pages that don't need the auth guard redirect
const NO_GUARD = new Set(['welcome.html', 'onboarding.html', 'offline.html']);

const PAGE_TITLES = {
  'index.html':          'KetoCore | Dashboard',
  'welcome.html':        'KetoCore | Bienvenido',
  'onboarding.html':     'KetoCore | Configuración Inicial',
  'plan.html':           'KetoCore | Mi Plan',
  'entrenamientos.html': 'KetoCore | Entrenamientos',
  'alimentos.html':      'KetoCore | Alimentos',
  'perfil.html':         'KetoCore | Perfil',
  'checklist.html':      'KetoCore | Checklist',
  'recetas.html':        'KetoCore | Recetas',
  'macros.html':         'KetoCore | Macros',
  'suplementos.html':    'KetoCore | Suplementos',
  'compras.html':        'KetoCore | Lista de Compras',
  'progreso.html':       'KetoCore | Progreso',
  'scanner.html':        'KetoCore | Escáner',
  'comunidad.html':      'KetoCore | Comunidad',
  'offline.html':        'KetoCore | Sin Conexión',
  'guia.html':           'KetoCore | Guía',
};

// Root-level JS files to copy to public/app/
const ROOT_JS = [
  'supabase-client.js', 'storage-manager.js', 'utils.js',
  'food-api.js', 'data-loader.js', 'compras.js',
];

// Static files to copy to public/app/
const STATIC_FILES = ['logo.svg', 'favicon.svg', 'manifest.json', 'sw.js'];

// Directories to copy to public/app/
const COPY_DIRS = ['data', 'modules', 'utils', 'icons', 'images'];

// ────────────────────────────────────────────────────────────────────────────
// Path rewriting helpers
// ────────────────────────────────────────────────────────────────────────────

function pageNameToAppPath(name) {
  const base = name.replace(/\.html$/, '');
  return base === 'index' ? '/app/' : `/app/${base}`;
}

/**
 * Rewrite relative HTML attribute src/href paths to /app/... absolute paths.
 * Leaves CDN (https://), absolute (/...), hash (#), and mailto: unchanged.
 */
function rewritePaths(html) {
  // href="X.html" → href="/app/X"
  html = html.replace(
    /\bhref="(?!https?:\/\/)(?!#)(?!mailto:)(?!\/)\/?([^"?#]+)\.html([^"]*)"/g,
    (_, name, rest) => `href="${pageNameToAppPath(name + '.html')}${rest}"`
  );

  // href="manifest.json" / favicon.svg / other local static assets
  html = html.replace(
    /\bhref="(?!https?:\/\/)(?!#)(?!mailto:)(?!\/)([^"]+\.(json|svg|xml|css|png|ico))"/g,
    (_, path) => `href="/app/${path}"`
  );

  // src="..." local files (JS, SVG, images, icons, data) — skip CDN and absolute
  html = html.replace(
    /\bsrc="(?!https?:\/\/)(?!\/)([^"]+)"/g,
    (_, path) => `src="/app/${path}"`
  );

  // CSS url() for local assets
  html = html.replace(
    /url\(['"]?(?!https?:\/\/)(?!\/)(?!data:)([^'")\s]+)['"]?\)/g,
    (_, path) => `url('/app/${path}')`
  );

  // JS location strings: 'X.html' in location.href / location.replace / redirect
  html = html.replace(
    /((?:location\.href|window\.location\.href|window\.location\.replace|window\.location\.assign)\s*(?:=\s*|)\(?['"])([a-zA-Z0-9_-]+)\.html(['"])/g,
    (_, prefix, name, suffix) => `${prefix}${pageNameToAppPath(name + '.html')}${suffix}`
  );

  // href property assignment in JS: el.href = 'X.html'
  html = html.replace(
    /(\.href\s*=\s*['"])([a-zA-Z0-9_-]+)\.html(['"'])/g,
    (_, prefix, name, suffix) => `${prefix}${pageNameToAppPath(name + '.html')}${suffix}`
  );

  return html;
}

/**
 * Strip scripts that AppLayout handles (CDN Tailwind, CDN Supabase, tailwind.config,
 * inline Supabase init, auth guard IIFE) from any stray occurrences in body.
 */
function stripAppLayoutScripts(html) {
  // CDN Tailwind
  html = html.replace(/<script[^>]+cdn\.tailwindcss\.com[^>]*><\/script>/gi, '');
  // CDN Supabase
  html = html.replace(/<script[^>]+cdn\.jsdelivr\.net\/npm\/@supabase[^>]*><\/script>/gi, '');
  // tailwind.config script block
  html = html.replace(/<script[^>]*>\s*(?:window\.)?tailwind(?:\.config\s*=|\s*=)\s*\{[\s\S]*?<\/script>/gi, '');
  // Inline Supabase URL/KEY init
  html = html.replace(/<script[^>]*>\s*window\.SUPABASE_URL\s*=[\s\S]*?<\/script>/gi, '');
  // Auth guard IIFE
  html = html.replace(/<script[^>]*>\s*!function\(\)\{var d=localStorage[\s\S]*?<\/script>/gi, '');
  return html;
}

/**
 * Add is:inline to <script> tags so Astro doesn't bundle them.
 * Handles both inline scripts and src-based scripts.
 */
function markScriptsInline(html) {
  // Already has is:inline — skip
  // Add is:inline to opening <script> tags that lack it
  return html.replace(/<script(?!\s+is:inline)([^>]*)>/gi, (_, attrs) => {
    return `<script is:inline${attrs}>`;
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Core migration
// ────────────────────────────────────────────────────────────────────────────

async function migrateFile(htmlFile) {
  const name = basename(htmlFile);
  const raw  = await readFile(htmlFile, 'utf-8');

  // Extract <title>
  const titleMatch = raw.match(/<title>([^<]+)<\/title>/i);
  const titleText  = PAGE_TITLES[name] || (titleMatch ? titleMatch[1].trim() : 'KetoCore');

  // Extract head <style> blocks (page-specific CSS)
  const headSection = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const headStyles  = [];
  const styleRe     = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = styleRe.exec(headSection)) !== null) {
    const css = m[1].trim();
    if (css) headStyles.push(css);
  }

  // Extract body
  const bodyMatch = raw.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) {
    console.warn(`  ⚠ No <body> found — skipping ${name}`);
    return;
  }
  let body = bodyMatch[2];

  // Transform body
  body = stripAppLayoutScripts(body);
  body = rewritePaths(body);
  body = markScriptsInline(body);

  // Build Astro file
  const slug      = name === 'index.html' ? 'index' : name.replace(/\.html$/, '');
  const authGuard = !NO_GUARD.has(name);

  const styleBlock = headStyles.length
    ? `\n<style is:global>\n${headStyles.join('\n\n')}\n</style>`
    : '';

  const content = `---
import AppLayout from '../../layouts/AppLayout.astro';
---

<AppLayout title="${titleText}" authGuard={${authGuard}}>${styleBlock}
${body.trimStart()}
</AppLayout>
`;

  const outPath = join(PAGES_DIR, `${slug}.astro`);
  await writeFile(outPath, content, 'utf-8');
  console.log(`  ✓ ${name} → src/pages/app/${slug}.astro`);
}

// ────────────────────────────────────────────────────────────────────────────
// Static asset copy
// ────────────────────────────────────────────────────────────────────────────

async function copyAssets() {
  console.log('\n📂 Copying static assets to public/app/...');
  await mkdir(PUBLIC_DIR, { recursive: true });

  for (const file of [...ROOT_JS, ...STATIC_FILES]) {
    const src  = join(PWA_ROOT, file);
    const dest = join(PUBLIC_DIR, file);
    if (existsSync(src)) {
      await cp(src, dest);
      console.log(`  ✓ ${file}`);
    } else {
      console.warn(`  ⚠ Not found: ${file}`);
    }
  }

  for (const dir of COPY_DIRS) {
    const src  = join(PWA_ROOT, dir);
    const dest = join(PUBLIC_DIR, dir);
    if (existsSync(src)) {
      await cp(src, dest, { recursive: true });
      console.log(`  ✓ ${dir}/`);
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

async function main() {
  await mkdir(PAGES_DIR, { recursive: true });

  // Determine which files to process
  let targets;
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // Specific files passed as arguments
    targets = args.map(a => join(PWA_ROOT, a));
  } else {
    // All HTML files in PWA root
    const entries = await readdir(PWA_ROOT, { withFileTypes: true });
    targets = entries
      .filter(e => e.isFile() && e.name.endsWith('.html') && !SKIP.has(e.name))
      .map(e => join(PWA_ROOT, e.name));
  }

  if (targets.length === 0) {
    console.log('No files to migrate.');
    return;
  }

  console.log(`\n🔄 Migrating ${targets.length} page(s) to src/pages/app/...\n`);
  for (const f of targets) {
    await migrateFile(f).catch(err => console.error(`  ✗ ${basename(f)}: ${err.message}`));
  }

  await copyAssets();

  console.log('\n✅ Migration complete.');
  console.log('   → Astro pages in  src/pages/app/');
  console.log('   → Static assets in public/app/');
}

main().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
