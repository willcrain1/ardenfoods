/* ============================================================
   Florida Man Fire Sauce Co. — product catalog (single source of truth)
   ------------------------------------------------------------
   The cart reads name + price from here by id, so the buttons
   on the product pages always match the totals at checkout.

   >>> TODO: prices below are PLACEHOLDERS. Update to your real
   prices. Use whole dollars or decimals (e.g. 9, 9.5, 12).
   ============================================================ */
window.ARDEN_CATALOG = {
  /* ---------------- HOT SAUCE ---------------- */
  "hs-hoa":       { line: "Hot Sauce",     name: "HOA Violation Heat",        variant: "5 oz bottle", price: 10 },
  "hs-golfcart":  { line: "Hot Sauce",     name: "Golf Cart Road Rage",       variant: "5 oz bottle", price: 10 },
  "hs-ring":      { line: "Hot Sauce",     name: "Caught on Ring Camera",     variant: "5 oz bottle", price: 10 },
  "hs-amenity":   { line: "Hot Sauce",     name: "The Amenity Isn't Open Yet",variant: "5 oz bottle", price: 11 },
  "hs-ardenaf":   { line: "Hot Sauce",     name: "Arden AF",                  variant: "5 oz bottle", price: 12 },
  "hs-trio":      { line: "Hot Sauce",     name: "Build-a-Bench 3-Pack",      variant: "Pick any 3",  price: 27 },

  /* ---------------- FOCACCIA ---------------- */
  "fo-rosemary":  { line: "Focaccia",      name: "Rosemary HOA Approval",       variant: "Half sheet",  price: 14 },
  "fo-tomato":    { line: "Focaccia",      name: "Cherry Tomato Block Party",   variant: "Half sheet",  price: 15 },
  "fo-garlic":    { line: "Focaccia",      name: "Roasted Garlic Ring Repellent", variant: "Half sheet",  price: 15 },
  "fo-olive":     { line: "Focaccia",      name: "Castelvetrano Clubhouse Key", variant: "Half sheet",  price: 16 },

  /* ---------------- COOKIES ---------------- */
  "ck-choc":      { line: "Cookies",       name: "Brown Butter Bake-Sale Violation", variant: "Half dozen", price: 12 },
  "ck-snicker":   { line: "Cookies",       name: "Snickerdoodle Newsletter Bribe",   variant: "Half dozen", price: 11 },
  "ck-oat":       { line: "Cookies",       name: "Oatmeal Cranberry Plausible Deniability", variant: "Half dozen", price: 12 },
  "ck-doublechoc":{ line: "Cookies",       name: "Double Dark Ring Camera Footage",  variant: "Half dozen", price: 13 },
  "ck-dozen":     { line: "Cookies",       name: "The Group Chat Dozen",             variant: "12 cookies", price: 22 },

  /* ---------------- SALSA ---------------- */
  "sa-red":       { line: "Salsa",         name: "Caught Dipping Red",        variant: "16 oz jar",   price: 9 },
  "sa-tomatillo": { line: "Salsa",         name: "Tomatillo Comment Section", variant: "16 oz jar",   price: 9 },
  "sa-avocado":   { line: "Salsa",         name: "Avocado HOA Settlement",    variant: "16 oz jar",   price: 10 },
  "sa-corn":      { line: "Salsa",         name: "Roasted Corn Golf Cart Bribe", variant: "16 oz jar",   price: 10 },
  "sa-flight":    { line: "Salsa",         name: "The Farm Stand Flight",     variant: "4 × 8 oz",    price: 28 },

  /* ---------------- MARGARITA MIX ---------------- */
  "mg-spicy":     { line: "Margarita Mix", name: "Spicy 3-Way Stop Mix",       variant: "32 oz bottle", price: 14 },
  "mg-skinny":    { line: "Margarita Mix", name: "Skinny Wristband Wait Mix",  variant: "32 oz bottle", price: 14 },
  "mg-pineapple": { line: "Margarita Mix", name: "Pineapple Deck-Not-Open Mix",variant: "32 oz bottle", price: 15 },
  "mg-mango":     { line: "Margarita Mix", name: "Mango Dock Sunset Mix",      variant: "32 oz bottle", price: 15 },
  "mg-flight":    { line: "Margarita Mix", name: "Cul-de-Sac Party Pack",      variant: "4 × 12 oz",    price: 30 }
};
