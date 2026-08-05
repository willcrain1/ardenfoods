/* ============================================================
   Florida Man Fire Sauce Co. — product catalog (single source of truth)
   ------------------------------------------------------------
   The cart reads name + price from here by id, so the buttons
   on the product pages always match the totals at checkout.
   ============================================================ */
window.ARDEN_CATALOG = {
  /* ---------------- HOT SAUCE ---------------- */
  "hs-caribbean": { line: "Hot Sauce", name: "Caribbean Mango Habanero", variant: "5 oz bottle", price: 7 },
  "hs-serrano":   { line: "Hot Sauce", name: "Serrano Sunrise",          variant: "5 oz bottle", price: 7 },

  /* ---------------- SALSA ---------------- */
  "sa-red":              { line: "Salsa", name: "Classic Red Salsa",      variant: "16 oz jar", price: 10 },
  "sa-tomatillo":        { line: "Salsa", name: "Tomatillo Salsa",        variant: "16 oz jar", price: 10 },
  "sa-creamy-tomatillo": { line: "Salsa", name: "Creamy Tomatillo Salsa", variant: "16 oz jar", price: 10 },

  /* ---------------- COOKIES — per cookie, choose your style ---------------- */
  "ck-plain":       { line: "Cookies", name: "Chocolate Chip Cookie",                     variant: "per cookie", price: 3 },
  "ck-cbutter":     { line: "Cookies", name: "Choc Chip + Cookie Butter Core",            variant: "per cookie", price: 4 },
  "ck-choc-milk":   { line: "Cookies", name: "Choc Chip + Milk Chocolate Core",           variant: "per cookie", price: 4 },
  "ck-choc-dark":   { line: "Cookies", name: "Choc Chip + Dark Chocolate Core",           variant: "per cookie", price: 4 },
  "ck-marshmallow": { line: "Cookies", name: "Choc Chip + Vanilla Bean Marshmallow",      variant: "per cookie", price: 5 },
  "ck-cream":       { line: "Cookies", name: "Choc Chip Cookies & Cream",                 variant: "per cookie", price: 5 },
  "ck-buttercream": { line: "Cookies", name: "Choc Chip + Vanilla Buttercream",           variant: "per cookie", price: 5 },
  "ck-pistachio":   { line: "Cookies", name: "Choc Chip + Pistachio Butter Core",         variant: "per cookie", price: 5 }
};
