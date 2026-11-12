# Linktree Page with Tailwind CSS

A small, browser-based exercise for building a Linktree-style profile page with Tailwind CSS. The tutorial takes a plain HTML page through layout, profile styling, link buttons, keyboard focus states, and dark mode.

> **Students: start with [SETUP.md](SETUP.md).** It shows how to make your own copy with **Use this template**, put it online with Cloudflare, and edit it at `your-site/keystatic` with Keystatic Cloud.

## Project structure

This is an [Astro](https://astro.build) project with Tailwind CSS v4 (via `@tailwindcss/vite`) and [Keystatic](https://keystatic.com) as a Git-based CMS: local storage in development, [Keystatic Cloud](https://keystatic.cloud) on the deployed site.

- `src/content/profile.json` — the page content (name, bio, avatar, links). Edit it in the Keystatic admin or by hand.
- `keystatic.config.ts` — the Keystatic schema: a single **Profile** entry with name, bio, optional avatar image and a list of links (each with a label, URL and optional icon).
- `src/pages/index.astro` — the links page. Reads the profile with Keystatic's reader API and renders the links with `profile.links.map(...)`.
- `src/layouts/Layout.astro` — the HTML shell (`<head>`, `<body>` classes) and global stylesheet import.
- `src/styles/global.css` — imports Tailwind and defines the shared `.link` button class.
- `public/images/avatar/` — avatar images uploaded through Keystatic land here.
- `public/images/icons/` — link icons uploaded through Keystatic land here.
- `linktree-tailwind-step-by-step.md` — the eight-step Tailwind tutorial and styling extensions.
- `SETUP.md` — step-by-step setup for your own copy: template → Keystatic Cloud → Cloudflare.

## Get started

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Then open http://127.0.0.1:4321 for the site and http://127.0.0.1:4321/keystatic for the admin. Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the site into `dist/` (static pages in `dist/client`, the Worker in `dist/server`) |
| `npm run preview` | Serves the built site locally in Cloudflare's runtime |
| `npm run check` | Type-checks `.astro` and TypeScript files |

Keystatic switches storage based on where it runs (see `keystatic.config.ts`):

- **`npm run dev`: local storage.** Saving in the admin writes straight to the files in `src/content/` and `public/images/`, with no sign-in. You commit those changes with Git.
- **The deployed site: Keystatic Cloud.** Editors open `https://your-domain.com/keystatic` and sign in with their keystatic.cloud account. Each save becomes a commit on the GitHub repo, which triggers a new Cloudflare build, so changes go live a minute or two later.

The site is still mostly static: `index.html` is prerendered at build time. Only `/keystatic` and `/api/keystatic` run on demand, in a Cloudflare Worker built by the `@astrojs/cloudflare` adapter.

To connect a copy of this repo to Keystatic Cloud and Cloudflare, follow [SETUP.md](SETUP.md).

## Make it yours

Run `npm run dev`, open `/keystatic`, and edit **Profile**: set your name and bio, upload an avatar (a placeholder shows while it's empty), and add, reorder or remove links. Each link can have an optional icon, shown to the left of its label. Replace `you@example.com` in the Contact link with your email address; the `#` links are placeholders for real destinations. Commit the changed content files when you're done.

## Accessibility

The link buttons include visible keyboard focus styles. The avatar uses an empty `alt` attribute because the adjacent heading provides the profile name; if you use an informative image, provide meaningful alternative text.

## Learn more

- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Hover, focus, and other states](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Dark mode](https://tailwindcss.com/docs/dark-mode)
