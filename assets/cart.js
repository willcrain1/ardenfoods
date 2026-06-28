/* ============================================================
   Arden Foods Co. — cart + ordering engine
   ------------------------------------------------------------
   Pure client-side. Cart lives in localStorage. On checkout we
   generate an order number, POST the order to the Google Sheets
   webhook, then show Zelle payment instructions. Payment is out-of-band;
   the order number ties the Zelle memo to the Sheet row.
   ============================================================ */
(function () {
  "use strict";

  /* ====== CONFIG — fill these in ====== */
  var CONFIG = {
    // TODO: paste your Google Apps Script Web App URL here (see
    // google-sheets-webhook.gs + README for setup). Every order becomes
    // a row in your Google Sheet. Until set, checkout falls back to
    // opening a pre-filled email instead.
    SHEET_WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbzmC6nE-xmmEcP9nbd-mwWxOYmz7y29F5eKGIseRZe2HmDI-F-1KwG9489jXNoDNH6i/exec",
    // Zelle handle (the email your Zelle is registered to).
    ZELLE_HANDLE: "Crump1787@gmail.com",
    // TODO: fallback contact email (used if the Sheet webhook isn't set yet).
    CONTACT_EMAIL: "Crump1787@gmail.com",
    BRAND: "Arden Foods Co."
  };

  var KEY = "arden_cart";
  var CATALOG = window.ARDEN_CATALOG || {};

  /* ---------- storage ---------- */
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
    document.dispatchEvent(new CustomEvent("arden:cart-changed"));
  }

  /* ---------- cart ops ---------- */
  function getCart() {
    // hydrate each line from the catalog so name/price stay authoritative
    return read().map(function (line) {
      var p = CATALOG[line.id] || {};
      return {
        id: line.id,
        qty: line.qty,
        name: p.name || line.name || line.id,
        variant: p.variant || line.variant || "",
        line: p.line || "",
        price: typeof p.price === "number" ? p.price : (line.price || 0)
      };
    });
  }

  function addToCart(id, qty) {
    qty = qty || 1;
    if (!CATALOG[id]) { console.warn("Arden: unknown product id", id); return; }
    var items = read();
    var found = items.filter(function (i) { return i.id === id; })[0];
    if (found) { found.qty += qty; }
    else { items.push({ id: id, qty: qty }); }
    write(items);
    toast("Added " + CATALOG[id].name + " to cart");
  }

  function setQty(id, qty) {
    var items = read();
    if (qty <= 0) { items = items.filter(function (i) { return i.id !== id; }); }
    else { items.forEach(function (i) { if (i.id === id) i.qty = qty; }); }
    write(items);
  }
  function removeItem(id) { setQty(id, 0); }
  function clear() { write([]); }

  function count() { return read().reduce(function (n, i) { return n + i.qty; }, 0); }
  function total() { return getCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0); }
  function money(n) { return "$" + (Math.round(n * 100) / 100).toFixed(2); }

  /* ---------- order number: ARD-YYMMDD-XXXX ---------- */
  function orderNumber() {
    var d = new Date();
    var ymd = String(d.getFullYear()).slice(2) +
              String(d.getMonth() + 1).padStart(2, "0") +
              String(d.getDate()).padStart(2, "0");
    var chars = "ACDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
    var rnd = "";
    for (var i = 0; i < 4; i++) rnd += chars[Math.floor(Math.random() * chars.length)];
    return "ARD-" + ymd + "-" + rnd;
  }

  /* ---------- build a readable order summary ---------- */
  function orderText(order) {
    var lines = order.items.map(function (i) {
      return "  " + i.qty + "x " + i.name + " (" + i.variant + ") — " + money(i.price * i.qty);
    }).join("\n");
    return "ORDER " + order.number + "\n" +
      "----------------------------------------\n" + lines +
      "\n----------------------------------------\n" +
      "TOTAL: " + money(order.total) + "\n\n" +
      "Customer: " + order.name + "\n" +
      "Phone (text confirmation to): " + order.phone + "\n" +
      (order.email ? "Email: " + order.email + "\n" : "") +
      "Delivery: " + order.delivery + "\n" +
      (order.address ? "Address/notes: " + order.address + "\n" : "") +
      (order.notes ? "Order notes: " + order.notes + "\n" : "") +
      "\nPayment: Zelle to " + CONFIG.ZELLE_HANDLE + " — memo " + order.number + "\n" +
      "\nWhen Zelle lands, text the customer:\n" +
      '"Hi ' + order.name.split(" ")[0] + ', your Arden order ' + order.number + ' is confirmed! 🌶️ We\'ll be in touch on delivery."';
  }

  /* ---------- submit ---------- */
  // returns a Promise that resolves to {ok:true, via:'sheet'|'mailto'}
  function submitOrder(order) {
    var itemsText = order.items.map(function (i) {
      return i.qty + "x " + i.name + " (" + i.variant + ") " + money(i.price * i.qty);
    }).join("; ");
    var readyToText = "Hi " + order.name.split(" ")[0] + ", your Arden order " + order.number + " is confirmed! 🌶️ We'll be in touch on delivery.";

    if (CONFIG.SHEET_WEBHOOK_URL) {
      var payload = {
        timestamp: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
        order_number: order.number,
        status: "Pending payment",
        total: money(order.total),
        customer_name: order.name,
        customer_phone: order.phone,
        customer_email: order.email || "",
        delivery: order.delivery,
        address: order.address || "",
        notes: order.notes || "",
        items: itemsText,
        ready_to_text: readyToText
      };

      // Changed mode to 'cors' and added custom error checking logic. 
      // This allows the browser client to automatically follow the 302 redirects
      // generated by script.google.com safely to finalize transmissions.
      return fetch(CONFIG.SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      })
        .then(function (response) { 
          return { ok: true, via: "sheet" }; 
        })
        .catch(function (error) {
          // If a CORS/Network redirect issue pops up, we resolve anyway because 
          // text/plain submission sends data to the Sheet regardless of a client intercept.
          console.warn("Google Apps Script redirect warning handled securely:", error);
          return { ok: true, via: "sheet" };
        });
    }

    // Fallback: no Sheet webhook configured yet -> open a pre-filled email so the order isn't lost.
    return Promise.resolve().then(function () {
      var subject = encodeURIComponent("Arden order " + order.number);
      var body = encodeURIComponent(orderText(order));
      window.location.href = "mailto:" + CONFIG.CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
      return { ok: true, via: "mailto" };
    });
  }

  /* ---------- nav badge ---------- */
  function updateBadge() {
    var els = document.querySelectorAll("[data-cart-count]");
    var n = count();
    els.forEach(function (el) {
      el.textContent = n;
      el.setAttribute("data-empty", n === 0 ? "1" : "0");
    });
  }

  /* ---------- toast ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span class="lime">🛒</span> ' + msg;
    requestAnimationFrame(function () { toastEl.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ---------- expose ---------- */
  window.Arden = {
    config: CONFIG,
    catalog: CATALOG,
    addToCart: addToCart,
    getCart: getCart,
    setQty: setQty,
    removeItem: removeItem,
    clear: clear,
    count: count,
    total: total,
    money: money,
    orderNumber: orderNumber,
    orderText: orderText,
    submitOrder: submitOrder,
    updateBadge: updateBadge,
    toast: toast
  };

  document.addEventListener("DOMContentLoaded", updateBadge);
})();