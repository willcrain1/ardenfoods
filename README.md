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
| `.nojekyll` | Serve files as-is on GitHub Pages. |

## How the ordering system works

GitHub Pages can't run a server, so the flow is intentionally simple and free:

1. Customer adds items across any pages into **one shared cart** (saved in their browser).
2. At checkout they enter name + phone, and **place the order** → the browser generates an **order number** (`ARD-YYMMDD-XXXX`).
3. The order is emailed to you (via Formspree), and the customer sees **Zelle instructions**: send the total, put the order number in the memo.
4. When you see the Zelle payment land, you **text the customer** the confirmation. The order email includes a ready-to-copy "confirmed" message and their phone number.

There's no automated SMS and no payment API — Zelle is out-of-band by design, and the order number ties the payment to the order.

## ⚙️ Before you go live — fill these in

**1. Orders + Zelle (`assets/cart.js`, top of the file):**
```js
FORMSPREE_ID: "",                          // your Formspree form id
ZELLE_HANDLE: "your-zelle@example.com",     // the phone/email your Zelle uses
CONTACT_EMAIL: "hello@example.com"          // fallback email
```
- **Formspree:** make a free form at <https://formspree.io>, copy its id (the part after `/f/`, e.g. `xeqyabcd`), and paste it into `FORMSPREE_ID`. Free tier = 50 orders/month.
- **Until `FORMSPREE_ID` is set**, placing an order opens a pre-filled email to `CONTACT_EMAIL` instead (so no order is ever lost).
- Set `ZELLE_HANDLE` to whatever your Zelle is registered to — it's shown on the confirmation screen.

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
