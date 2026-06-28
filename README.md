# 🌶️ Arden Hot Sauce Co.

A modern, fun, **single-page promo site** for Arden Hot Sauce Co. — a homemade, neighbor-to-neighbor hot sauce brand under **Arden Foods Co.**, based in the Arden agrihood in Loxahatchee, FL.

> *"Locally sourced gossip. Imported peppers."*
> Keeping Arden spicy since the amenities opened… eventually.

The whole site is one self-contained `index.html` — embedded CSS + vanilla JS, **no build step, no dependencies, no framework**. It runs straight off the file system and deploys to GitHub Pages with zero config.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire website (HTML, CSS, JS inline). |
| `assets/favicon.svg` | Pepper/flame favicon. |
| `assets/og-image.svg` | Social share preview image (Open Graph / Twitter). |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (no Jekyll processing). |

## Preview locally

Just **double-click `index.html`** — it renders fully with no server.

Or serve it (closer to how GitHub Pages behaves):

```bash
python -m http.server
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a GitHub repo and push these files to the `main` branch:
   ```bash
   git add .
   git commit -m "Arden Hot Sauce Co. single-page site"
   git push -u origin main
   ```
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set branch to **`main`** and folder to **`/ (root)`**, then **Save**.
5. Wait ~1 minute. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

(`index.html` is at the repo root, so no extra config is needed.)

## Fill these in before sharing

A few placeholders are left for you — search `index.html` for `TODO`:

- **Arden Facebook group link** — the “💬 Order via the Arden group” button in the *Get Some* section (`data-link="facebook"`, currently `href="#"`). Until set, it shows a friendly reminder popup.
- **Contact email** — the “✉️ Email us” button uses `mailto:hello@example.com`. Swap in your real address.
- **(Optional) Product photos** — the bottles are drawn with inline SVG so the page looks finished out of the box. Replace with real photos whenever you have them.

## Editing the sauces

All content lives in plain JS arrays near the bottom of `index.html`:

- `sauces` — the featured cards (name, slogan, heat level, label text).
- `vault` — the “full vault” expandable list of the rest of the names.
- `scale` — the Arden Heat Index™ rows.
- `posts` — the faux community-comment wall.

Add, remove, or reword entries in those arrays and the page updates itself — no other code to touch.

---

*Contains peppers, sarcasm, and community drama. Made in Arden. Complained about in Arden.*
Sauce names are neighborhood satire — all in good fun. Not affiliated with the Arden HOA, its developer, the (still-closed) second clubhouse, the pool wristband committee, or any data center.
