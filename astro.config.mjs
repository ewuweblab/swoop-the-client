// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// Keystatic now runs in production too, so editors can open /keystatic on the
// live site. Its admin page and API routes are rendered on demand (they are not
// prerendered), which is why the site needs a server adapter: the Cloudflare
// adapter turns those two routes into a Cloudflare Worker. Every other page is
// still prerendered to static HTML at build time.
//
// The adapter is only used for `astro build` and `astro preview`. In
// `astro dev` it would run the Keystatic API inside workerd, which can't
// read or write files on disk, so local storage (what dev uses, see
// keystatic.config.ts) would fail. Without an adapter, dev runs everything
// in Node.
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  integrations: [react(), keystatic()],
  adapter: isDev ? undefined : cloudflare({
    // Prerender the static pages with Node instead of Cloudflare's workerd
    // runtime. index.astro reads src/content/profile.json from disk with
    // Keystatic's reader, and that file system access needs Node.
    prerenderEnvironment: 'node',
    // The page uses plain <img> tags, so no Cloudflare Images binding is needed.
    imageService: 'passthrough',
  }),
  // Keystatic doesn't use Astro sessions, so skip the KV namespace the adapter
  // would otherwise create for them.
  session: false,
  vite: {
    plugins: [tailwindcss()],
  },
});
