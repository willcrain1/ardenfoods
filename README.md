# 🌶️ Arden Foods Co.

A modern, fun **multi-page storefront** for Arden Foods Co. — a homemade, neighbor-to-neighbor food brand based in the Arden agrihood in Loxahatchee, FL. Hot sauce, focaccia, premium cookies, salsa, and margarita mixes, with a lightweight **order-by-Zelle** flow.

> *"Keeping Arden spicy since the amenities opened… eventually."*

Still 100% static — plain HTML, one shared CSS file, and vanilla JS. **No build step, no framework, no dependencies.** Deploys to GitHub Pages with zero config.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Storefront hub — brand story, the 5 product lines, "how ordering works". |
| `hotsauce.html` | Hot sauce lineup + heat index + comment wall. |
| `focaccia.html` | Focaccia flavors. |
| `cookies.html` | Premium cookies. |
| `salsa.html` | Red, tomatillo, avocado & corn salsa (with heat ratings). |
| `margarita-mix.html` | Spicy, skinny, pineapple & mango mixes. |
| `cart.html` | Shared cart, checkout form, and the Zelle confirmation screen. |

## Shared assets

| File | Purpose |
|------|---------|
| `assets/styles.css` | All styling for every page (design tokens, components, responsive). |
| `assets/site.js` | Renders the shared nav + footer, mobile menu, scroll-reveal, add-to-cart wiring, cart badge. **Edit the nav/footer once here.** |
| `assets/catalog.js` | **Single source of truth for products and prices.** |
| `assets/cart.js` | Cart engine (localStorage), order numbers, and order submission. |
| `assets/favicon.svg`, `assets/og-image.svg` | Favicon + social share image. |
| `google-sheets-webhook.gs` | Paste into Google Apps Script to log every order as a row in your Google Sheet. |
| `.nojekyll` | Serve files as-is on GitHub Pages. |

## How the ordering system works

GitHub Pages can't run a server, so the flow is intentionally simple and free:

1. Customer adds items across any pages into **one shared cart** (saved in their browser).
2. At checkout they enter name, phone, email, and a porch-dropoff address, and **place the order** → the browser generates an **order number** (`ARD-YYMMDD-XXXX`).
3. The order is appended as a new row in your **Google Sheet** (via a small Apps Script webhook — see `google-sheets-webhook.gs`), and the customer sees **Zelle instructions**: send the total, put the order number in the memo.
4. When a customer Zelles you and gives you their order number, **look that order number up in the Sheet** to see exactly what they ordered. Mark the row's Status as "Paid", then **text the customer** the confirmation — the Sheet has a ready-to-copy message for that, plus their phone number.

There's no automated SMS and no payment API — Zelle is out-of-band by design, and the order number is the key that ties a Zelle payment to a row in the Sheet.

## ⚙️ Before you go live — fill these in

**1. Orders → Google Sheet:**
1. Create a new Google Sheet (any name, e.g. "Arden Orders").
2. Open **Extensions → Apps Script**, delete the starter code, and paste in the contents of [`google-sheets-webhook.gs`](google-sheets-webhook.gs).
3. **Deploy → New deployment** → type **Web app** → Execute as **Me** → Who has access **Anyone** → Deploy. Authorize when Google prompts you (it's your own script).
4. Copy the Web app URL (ends in `/exec`) and paste it into `SHEET_WEBHOOK_URL` near the top of `assets/cart.js`.
5. Place a test order on the site — a row should appear in the Sheet within a few seconds, with a header row added automatically.

```js
SHEET_WEBHOOK_URL: "",                      // your Apps Script Web App URL
ZELLE_HANDLE: "Crump1787@gmail.com",        // the email your Zelle is registered to
CONTACT_EMAIL: "hello@example.com"          // fallback email
```
- **Until `SHEET_WEBHOOK_URL` is set**, placing an order opens a pre-filled email to `CONTACT_EMAIL` instead (so no order is ever lost).
- If you edit `google-sheets-webhook.gs` later, redeploy via **Manage deployments → edit (pencil) → Version: New version → Deploy** to keep the same URL.

**2. Prices (`assets/catalog.js`):** every price is a clearly-marked **placeholder**. Update them to your real prices (the cart totals read from here).

**3. Carryover from v1:** the Arden Facebook group link and contact email still appear as `TODO`s if you want social/contact CTAs.

## Editing products

`assets/catalog.js` is the source of truth — change a name, variant label, or price there and it updates the buttons **and** the cart. Each product page has a small `items` array that controls the marketing copy (blurb, tag, heat rating) and which catalog ids appear.

## Preview locally

Double-click any `.html`, or serve the folder (closer to GitHub Pages):

```bash
python -m http.server
# open http://localhost:8000
```

## Deploy to GitHub Pages

Already enabled for this repo (`main` / root). Just merge to `main` and it auto-redeploys in ~1 minute to <https://willcrain1.github.io/ardenfoods/>. To set it up elsewhere: **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.

---

*Contains peppers, sarcasm, and community drama. Made in Arden. Complained about in Arden.*
Product names are neighborhood satire — all in good fun. Not affiliated with the Arden HOA, its developer, the (still-closed) second clubhouse, the pool wristband committee, or any data center.
