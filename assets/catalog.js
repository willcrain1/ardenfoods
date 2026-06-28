/* ============================================================
   Arden Foods Co. — product catalog (single source of truth)
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
  "fo-rosemary":  { line: "Focaccia",      name: "Farm Rosemary Focaccia",    variant: "Half sheet",  price: 14 },
  "fo-tomato":    { line: "Focaccia",      name: "Cherry Tomato & Sea Salt",  variant: "Half sheet",  price: 15 },
  "fo-garlic":    { line: "Focaccia",      name: "Roasted Garlic & Herb",     variant: "Half sheet",  price: 15 },
  "fo-olive":     { line: "Focaccia",      name: "Castelvetrano Olive",       variant: "Half sheet",  price: 16 },

  /* ---------------- COOKIES ---------------- */
  "ck-choc":      { line: "Cookies",       name: "Brown Butter Chocolate Chunk", variant: "Half dozen", price: 12 },
  "ck-snicker":   { line: "Cookies",       name: "Brown Sugar Snickerdoodle",    variant: "Half dozen", price: 11 },
  "ck-oat":       { line: "Cookies",       name: "Oatmeal Cranberry White-Choc", variant: "Half dozen", price: 12 },
  "ck-doublechoc":{ line: "Cookies",       name: "Double-Dark Sea Salt",         variant: "Half dozen", price: 13 },
  "ck-dozen":     { line: "Cookies",       name: "Mixed Dozen Box",              variant: "12 cookies", price: 22 },

  /* ---------------- SALSA ---------------- */
  "sa-red":       { line: "Salsa",         name: "Red Salsa",                 variant: "16 oz jar",   price: 9 },
  "sa-tomatillo": { line: "Salsa",         name: "Tomatillo Salsa Verde",     variant: "16 oz jar",   price: 9 },
  "sa-avocado":   { line: "Salsa",         name: "Avocado Salsa",             variant: "16 oz jar",   price: 10 },
  "sa-corn":      { line: "Salsa",         name: "Roasted Corn Salsa",        variant: "16 oz jar",   price: 10 },
  "sa-flight":    { line: "Salsa",         name: "The Salsa Flight",          variant: "4 × 8 oz",    price: 28 },

  /* ---------------- MARGARITA MIX ---------------- */
  "mg-spicy":     { line: "Margarita Mix", name: "Spicy Margarita Mix",       variant: "32 oz bottle", price: 14 },
  "mg-skinny":    { line: "Margarita Mix", name: "Skinny Margarita Mix",      variant: "32 oz bottle", price: 14 },
  "mg-pineapple": { line: "Margarita Mix", name: "Pineapple Margarita Mix",   variant: "32 oz bottle", price: 15 },
  "mg-mango":     { line: "Margarita Mix", name: "Mango Margarita Mix",       variant: "32 oz bottle", price: 15 },
  "mg-flight":    { line: "Margarita Mix", name: "Cul-de-Sac 4-Pack",         variant: "4 × 12 oz",    price: 30 }
};
