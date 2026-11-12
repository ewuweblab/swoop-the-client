# Set up your own copy

This guide walks you through making your own copy of this links page, putting it online, and connecting it to **Keystatic Cloud**. When you finish, you (or anyone you invite) can go to `https://your-site/keystatic`, sign in, and edit the page in the browser. No code editor needed.

You'll set up three free accounts, each with a different job:

| Service | What it does for you |
| --- | --- |
| **GitHub** | Stores your site's code and content. |
| **Keystatic Cloud** | Runs the sign-in for the `/keystatic` editor and saves your edits back to GitHub. |
| **Cloudflare** | Builds the site and hosts it on the web. It rebuilds automatically every time GitHub changes. |

How an edit reaches the web:

```
You click Save in /keystatic
  → Keystatic Cloud commits the change to your GitHub repo
    → Cloudflare sees the new commit, rebuilds and redeploys
      → The live page updates (about 1–2 minutes)
```

Plan on about 20–30 minutes. Do the parts in order: each one needs the one before it.

---

## Part 1: Create your repository from the template

1. Sign in to [GitHub](https://github.com). If you don't have an account yet, create one.
2. Go to **https://github.com/ewuweblab/astro-keystatic-landing-page-links**.
3. Click the green **Use this template** button (top right), then **Create a new repository**.
4. Fill in the form:
   - **Owner:** your own GitHub account.
   - **Repository name:** something short, for example `links-page`. Write it down, because you'll need it in Part 3.
   - **Visibility:** **Public**.
   - Leave **Include all branches** unchecked.
5. Click **Create repository**.

✅ **Checkpoint:** you're on `github.com/YOUR-USERNAME/links-page` and can see files like `README.md`, `keystatic.config.ts` and `wrangler.jsonc`.

---

## Part 2: Connect the repository to Keystatic Cloud

1. Go to [keystatic.cloud](https://keystatic.cloud) and sign in with your **GitHub** account.
2. **Create a team.** A team is the group of people allowed to edit. Give it a name. Keystatic turns that name into a short **team slug** (lowercase, with dashes, for example `jane-doe`).
3. **Create a project** inside the team. Give it a name, for example `links-page`. This also gets a **project slug**.
4. When it asks you to **connect a GitHub repository**, choose the repo you made in Part 1.
   - If GitHub asks you to **install the Keystatic GitHub app**, install it on your own account. When it asks which repositories it can use, pick **Only select repositories** and choose your new repo. This is what lets Keystatic save your edits into the repo.
5. Open the project's settings page. It shows a config snippet with a line like this:

   ```ts
   project: 'jane-doe/links-page',
   ```

   Copy the part in quotes: `team-slug/project-slug`.

### Put your project name into the code

You can do this in the browser:

1. In your GitHub repo, open **`keystatic.config.ts`** and click the **pencil icon** (Edit this file).
2. Find this line:

   ```ts
   const KEYSTATIC_CLOUD_PROJECT = 'your-team/your-project';
   ```

3. Replace `your-team/your-project` with what you copied, keeping the quotes:

   ```ts
   const KEYSTATIC_CLOUD_PROJECT = 'jane-doe/links-page';
   ```

4. Click **Commit changes…**, keep **Commit directly to the `main` branch** selected, and confirm.

✅ **Checkpoint:** `keystatic.config.ts` on GitHub shows your own `team/project` value, not `your-team/your-project`.

---

## Part 3: Put the site online with Cloudflare

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com). If you don't have an account yet, create a free one.
2. In the left sidebar, open **Workers & Pages** (sometimes listed under **Compute**). Click **Create application**.
3. Choose **Import a repository** (or **Continue with GitHub**). Let Cloudflare access your GitHub account, and when GitHub asks which repositories, pick your new repo.
4. Select your repo, then fill in the settings:

   | Setting | Value |
   | --- | --- |
   | **Project name** | `astro-keystatic-landing-page-links` (see the note below) |
   | **Build command** | `npm run build` |
   | **Deploy command** | `npx wrangler deploy` |

   > **Important: the name has to match.** Cloudflare requires the project name to match the `"name"` in your repo's `wrangler.jsonc`, which is `astro-keystatic-landing-page-links`. If they don't match, the build fails.
   >
   > If you'd like a shorter web address, change `"name"` in `wrangler.jsonc` first (edit it on GitHub like in Part 2), using lowercase letters, numbers and dashes only. Then type the same name here.

5. Click **Deploy** and wait for the build to finish. The first build takes a couple of minutes.
6. When it's done, Cloudflare shows your site's address. It looks like:

   ```
   https://astro-keystatic-landing-page-links.YOUR-SUBDOMAIN.workers.dev
   ```

✅ **Checkpoint:** opening that address shows the links page with the placeholder name and links.

---

## Part 4: Edit your page online

1. Open your site's address and add **`/keystatic`** to the end:

   ```
   https://astro-keystatic-landing-page-links.YOUR-SUBDOMAIN.workers.dev/keystatic
   ```

2. Click **Log in with Keystatic Cloud** and sign in. The first time, Keystatic asks you to allow access. Allow it.
3. Open **Profile** and make it yours:
   - Set your **name** and **bio**.
   - Upload an **avatar** (a placeholder shows until you do).
   - Edit the **links**. Change `you@example.com` in the Contact link to your email, and replace the `#` placeholders with real URLs. You can add, remove and reorder links, and give each one an optional icon.
4. Click **Save**.
5. Wait about 1–2 minutes, then reload your live site (not the `/keystatic` page). Your changes should be there.

✅ **Checkpoint:** your repo on GitHub has a new commit made by Keystatic, and the live page shows your edits.

---

## Optional: invite someone else to edit

On keystatic.cloud, open your team and invite them by email. They sign in at `your-site/keystatic` just like you. **They don't need a GitHub account.** The free plan allows up to 3 people per team.

## Optional: use your own domain

If you own a domain that's managed by Cloudflare, open your Worker in the Cloudflare dashboard, go to **Settings → Domains & Routes**, and add it as a **Custom domain**. The editor then works at `https://your-domain.com/keystatic`.

## Optional: work on your computer too

To change the design (Tailwind classes, layout) you'll work locally. You need [Node.js](https://nodejs.org) 22 or later and Git.

```bash
git clone https://github.com/YOUR-USERNAME/links-page.git
```

```bash
cd links-page
```

```bash
npm install
```

```bash
npm run dev
```

Then open http://127.0.0.1:4321 for the page, and http://127.0.0.1:4321/keystatic for the editor.

Good to know:

- **On your computer, `/keystatic` doesn't ask you to sign in.** It saves straight to the files on your computer. Nothing goes online until you commit and push:

  ```bash
  git add -A
  ```

  ```bash
  git commit -m "Update links page"
  ```

  ```bash
  git push
  ```

- **Run `git pull` before you start working.** Edits saved on the live site are commits on GitHub. Your computer won't have them until you pull, and skipping that leads to `git push` being rejected.

---

## Troubleshooting

| Problem | What to check |
| --- | --- |
| No **Use this template** button | Make sure you're signed in to GitHub. |
| The Cloudflare build fails and mentions the Worker **name** | The Cloudflare project name and `"name"` in `wrangler.jsonc` must be exactly the same. |
| `/keystatic` shows an error about the project after you log in | Check `KEYSTATIC_CLOUD_PROJECT` in `keystatic.config.ts`. It must be exactly `team-slug/project-slug` from keystatic.cloud, in quotes. |
| `/keystatic` can't save to the repo | On keystatic.cloud, check that the project is connected to the right repo. On GitHub, check that the Keystatic app can access that repo (**Settings → Applications → Installed GitHub Apps**). |
| You saved, but the live page didn't change | Wait 2 minutes and reload the page. Then check the build under your Worker's **Deployments** tab in Cloudflare. If the build failed, its log says why. |
| `/keystatic` on your computer still asks you to log in | You're probably looking at the live site. The local address is `http://127.0.0.1:4321/keystatic`. |
| `git push` is rejected | Run `git pull`, then push again. |
