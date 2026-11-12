# Linktree Page with Tailwind CSS — Step by Step

## Overview

In this exercise you style a plain HTML page into a Linktree-style links page using only Tailwind utility classes: there's no custom CSS. You'll work through 8 steps, each adding one layer: setup, page base, layout, profile, list spacing, buttons, interaction and dark mode.

**You need:** a code editor, a browser and an internet connection (Tailwind loads from a CDN, so there's no build step).

**How to work:** after each step, save the file and refresh the browser. Every step says what you should see. Change only the elements the step names; the snippets show just those lines.

## Starter HTML

Create `index.html` and paste in this unstyled markup. Open it in the browser: you'll see a plain image, a heading, a line of text and a bulleted list of underlined blue links.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Name — Links</title>
</head>
<body>
  <main>

    <img src="https://assets.codepen.io/16425/image-placeholder.png" alt="">
    <h1>Your Name</h1>
    <p>Short bio goes here.</p>

    <ul>
      <li><a href="#">Website</a></li>
      <li><a href="#">Social</a></li>
      <li><a href="#">GitHub</a></li>
      <li><a href="mailto:you@example.com">Contact</a></li>
    </ul>

  </main>
</body>
</html>
```

The `alt=""` on the image is intentional. The avatar is decorative because the name sits right below it, so screen readers should skip it.

The Contact link uses `mailto:`, which opens the visitor's email app with your address filled in. Replace `you@example.com` with your own address.

## Step 1 — Add Tailwind

Add the Tailwind v4 browser script inside `<head>`, below `<title>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

**Check:** refresh the page. The bullets, the link underlines, the heading size and the default margins all disappear. That's Tailwind's **Preflight** reset, which strips browser defaults so every bit of styling comes from the classes you add.

> The CDN script is for learning and prototyping. In a real project, install Tailwind with the `@tailwindcss/vite` plugin instead.

## Step 2 — Page base

Style the whole page through `<body>`: a soft background, dark text, and a minimum height of the full screen.

```html
<body class="min-h-dvh bg-neutral-50 text-neutral-900 antialiased">
```

| Class | What it does |
| --- | --- |
| `min-h-dvh` | At least 100% of the dynamic viewport height, so the background fills the screen on mobile too |
| `bg-neutral-50` | Very light grey background |
| `text-neutral-900` | Near-black text; child elements inherit it |
| `antialiased` | Smoother font rendering |

**Check:** the page background turns light grey all the way to the bottom of the window.

## Step 3 — Layout

Turn `<main>` into a narrow column centred on the page. This one element sets up the whole layout and keeps it readable on both phones and wide screens.

```html
<main class="mx-auto max-w-md px-6 py-16 text-center">
```

| Class | What it does |
| --- | --- |
| `max-w-md` | Caps the column width at 28rem (448px) |
| `mx-auto` | Auto left/right margins centre the column |
| `px-6` | 1.5rem side padding, so content never touches the screen edge on phones |
| `py-16` | 4rem space above and below |
| `text-center` | Centres the text inside the column |

**Check:** everything sits in a centred column. Resize the browser window narrow and wide: the column shrinks on small screens but never grows past 448px.

> **Mobile-first:** Tailwind classes with no prefix apply at every screen size. This page needs no breakpoints (`md:`, `lg:`) because a capped-width column already works everywhere.

## Step 4 — Profile

Style the avatar, name and bio as one group at the top of the page.

```html
<img src="https://assets.codepen.io/16425/image-placeholder.png" alt="" class="mx-auto size-full">
<h1 class="mt-4 text-xl font-semibold">Your Name</h1>
<p class="mt-1 text-sm text-neutral-500">Short bio goes here.</p>
```

| Element | Class                      | What it does                                                                              |
| ------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| `img`   | `size-full`                | Width and height both 100%, so the image fills the width of the column                    |
| `img`   | `mx-auto`                  | Centres it. Preflight makes images `display: block`, so `text-center` alone won't move it |
| `h1`    | `mt-4`                     | 1rem gap below the avatar                                                                 |
| `h1`    | `text-xl font-semibold`    | Larger size and semi-bold weight                                                          |
| `p`     | `mt-1`                     | Small 0.25rem gap, which keeps the bio grouped with the name                              |
| `p`     | `text-sm text-neutral-500` | Smaller, grey text, so the bio reads as secondary                                         |

**Check:** you see an avatar as wide as the column, a bold name and a smaller grey bio, all centred and tight together.

> **Spacing tells you what belongs together:** a small gap (`mt-1`) joins the name and bio; bigger gaps (`mt-4`, and `mt-8` in the next step) separate groups.

## Step 5 — Link list spacing

Separate the list from the profile and space the links evenly. Put the spacing on the `<ul>` (the parent), not on each `<li>`.

```html
<ul class="mt-8 space-y-3">
```

| Class | What it does |
| --- | --- |
| `mt-8` | 2rem gap between the profile and the links |
| `space-y-3` | 0.75rem vertical gap between each child, with no extra space before the first or after the last |

**Check:** the links sit in a stacked column with even gaps. They still look like plain text; the next step turns them into buttons.

> **Alternative:** `flex flex-col gap-3` gives the same result. `space-y-*` is shorter for a simple vertical stack.

## Step 6 — Link buttons

Make each `<a>` a full-width button. Add these classes to all four links:

```html
<a href="#" class="block rounded-lg border border-neutral-200 bg-white px-4 py-3 font-medium">Website</a>
```

| Class | What it does |
| --- | --- |
| `block` | Links are inline by default; `block` makes each one fill the column width, so the **whole button** can be clicked, not just the words |
| `rounded-lg` | 0.5rem rounded corners |
| `border border-neutral-200` | 1px light grey border |
| `bg-white` | White fill that stands out from the grey page |
| `px-4 py-3` | Inner padding gives a comfortable tap target (about 48px tall) |
| `font-medium` | Slightly heavier text |

**Check:** four white rounded buttons, each as wide as the column. Click anywhere on a button, not only on its text, and it should work.

## Step 7 — Interaction states

Give the buttons feedback on hover and when someone moves to them with the keyboard. Add these classes after the ones from Step 6:

```html
<a href="#" class="block rounded-lg border border-neutral-200 bg-white px-4 py-3 font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2">Website</a>
```

| Class | What it does |
| --- | --- |
| `hover:bg-neutral-100` | Background darkens slightly while the mouse is over the button |
| `transition-colors` | Fades the colour change instead of switching instantly |
| `focus-visible:outline-2` | Shows a 2px outline when the link is reached with the Tab key |
| `focus-visible:outline-offset-2` | Moves that outline 2px out from the edge so it's easy to see |

**Check:** hover over each button, and its background fades a shade darker. Then click on the page background and press **Tab**: an outline moves from button to button.

> **Variants:** a prefix like `hover:` or `focus-visible:` applies a class only in that state. `focus-visible` shows for keyboard users but not after a mouse click. Never remove focus styles without replacing them.

## Step 8 — Dark mode

Add `dark:` versions of every colour class. Tailwind applies them automatically when the visitor's device is set to dark mode.

| Element   | Light class (already there) | Add the dark class          |
| --------- | --------------------------- | --------------------------- |
| `body`    | `bg-neutral-50`             | `dark:bg-neutral-950`       |
| `body`    | `text-neutral-900`          | `dark:text-neutral-100`     |
| `p` (bio) | `text-neutral-500`          | `dark:text-neutral-400`     |
| `a`       | `border-neutral-200`        | `dark:border-neutral-800`   |
| `a`       | `bg-white`                  | `dark:bg-neutral-900`       |
| `a`       | `hover:bg-neutral-100`      | `dark:hover:bg-neutral-800` |

Notice the pattern: dark mode roughly **flips the scale**. Light shades (50–200) become dark shades (800–950). The bio moves from 500 to 400 so it stays readable on a dark background.

Variants stack: `dark:hover:bg-neutral-800` applies only in dark mode **and** on hover.

**Check:** turn on dark mode in your OS settings, or in DevTools open the Rendering panel and set *Emulate CSS prefers-color-scheme* to dark. The page should switch to a near-black background with dark grey buttons.

## Completed solution

Compare your file with this one. The classes in each attribute follow a consistent order (layout, box, colour, states, dark), which makes long class lists easier to scan.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Name — Links</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="min-h-dvh bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
  <main class="mx-auto max-w-md px-6 py-16 text-center">

    <img src="https://assets.codepen.io/16425/image-placeholder.png" alt="" class="mx-auto size-full">
    <h1 class="mt-4 text-xl font-semibold">Your Name</h1>
    <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Short bio goes here.</p>

    <ul class="mt-8 space-y-3">
      <li><a href="#" class="block rounded-lg border border-neutral-200 bg-white px-4 py-3 font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">Website</a></li>
      <li><a href="#" class="block rounded-lg border border-neutral-200 bg-white px-4 py-3 font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">Social</a></li>
      <li><a href="#" class="block rounded-lg border border-neutral-200 bg-white px-4 py-3 font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">GitHub</a></li>
      <li><a href="mailto:you@example.com" class="block rounded-lg border border-neutral-200 bg-white px-4 py-3 font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">Contact</a></li>
    </ul>

  </main>
</body>
</html>
```

## Styling review and extensions

Compared with the first draft of the template, the final version makes three changes:

- **Keyboard focus:** added `focus-visible:outline-2 focus-visible:outline-offset-2`. Without it, keyboard users couldn't tell which link was selected.
- **Hover transition:** added `transition-colors` so hover fades in rather than snapping.
- **Dark-mode contrast:** the bio now uses `dark:text-neutral-400`. Grey 500 was too dim on a near-black background.

The one weakness left is **repetition**: all four links carry the same long class list. Changing a button style means editing four lines.

**Extension 1: one shared class.** Add a Tailwind style block in `<head>`, then give each link `class="link"`:

```html
<style type="text/tailwindcss">
  @layer components {
    .link {
      @apply block rounded-lg border border-neutral-200 bg-white px-4 py-3 font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800;
    }
  }
</style>
```

In a component framework (Astro, React), the usual fix is to render the links from an array or component instead of using `@apply`.

**Other things to try:**

- Add a fifth link, then a featured link with a contrasting colour (e.g. `bg-neutral-900 text-white`).
- Swap `neutral` for another palette (`slate`, `stone`, `indigo`) across the page.
- Add a small `<footer>` with `mt-12 text-xs text-neutral-400`.

**Reference:** [Tailwind CSS docs](https://tailwindcss.com/docs) · [Hover, focus and other states](https://tailwindcss.com/docs/hover-focus-and-other-states) · [Dark mode](https://tailwindcss.com/docs/dark-mode)
