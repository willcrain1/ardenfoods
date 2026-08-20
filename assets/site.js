/* ============================================================
   Florida Man Fire Sauce Co. — shared site chrome
   Renders the nav + footer on every page, wires the mobile
   menu, scroll-reveal, add-to-cart buttons, and cart badge.
   Edit the nav/footer ONCE here, not per page.
   ============================================================ */
(function () {
  "use strict";

  var PAGES = [
    { key: "hotsauce", href: "hotsauce.html", label: "Hot Sauce" },
    { key: "salsa",    href: "salsa.html",    label: "Salsa" },
    { key: "cookies",  href: "cookies.html",  label: "Cookies" }
  ];

  var current = document.body.getAttribute("data-page") || "";

  /* ---------- NAV ---------- */
  function buildNav() {
    var links = PAGES.map(function (p) {
      return '<a href="' + p.href + '"' + (p.key === current ? ' class="active"' : "") + '>' + p.label + "</a>";
    }).join("");

    var header = document.createElement("header");
    header.className = "nav";
    header.innerHTML =
      '<div class="wrap nav-inner">' +
        '<a href="index.html" class="brand"><span class="flame" aria-hidden="true">🌶️</span> Florida Man Fire Sauce Co.</a>' +
        '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>' +
        '<nav class="nav-links" id="navlinks">' + links +
          '<a href="cart.html" class="nav-cart' + (current === "cart" ? " active" : "") + '">🛒 Cart ' +
            '<span class="count" data-cart-count data-empty="1">0</span></a>' +
        '</nav>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);

    var toggle = header.querySelector(".nav-toggle");
    var linksEl = header.querySelector("#navlinks");
    toggle.addEventListener("click", function () {
      var open = linksEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    linksEl.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { linksEl.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }
    });
  }

  /* ---------- papel picado bunting (decorative) ---------- */
  function buildBunting() {
    var colors = ["#d81b68", "#ff8a3d", "#ffc23c", "#8fd14f", "#00bfc2"];
    var flags = "";
    for (var i = 0; i < 60; i++) {
      flags += '<div class="pennant" style="background:' + colors[i % colors.length] + '"></div>';
    }
    var bunting = document.createElement("div");
    bunting.className = "papel-picado";
    bunting.setAttribute("aria-hidden", "true");
    bunting.innerHTML = flags;
    var nav = document.querySelector("header.nav");
    nav.parentNode.insertBefore(bunting, nav.nextSibling);
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    var year = new Date().getFullYear();
    var footLinks = PAGES.concat([{ href: "cart.html", label: "Cart" }]).map(function (p) {
      return '<a href="' + p.href + '">' + p.label + "</a>";
    }).join("");

    var footer = document.createElement("footer");
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="top">' +
          '<div>' +
            '<div class="brand" style="color:var(--cream)"><span aria-hidden="true">🌶️</span> Florida Man Fire Sauce Co.</div>' +
            '<p style="max-width:38ch;margin:.6rem 0 0;color:#a8957f">Small-batch hot sauce, salsa &amp; premium cookies — all organic, locally sourced, made by your neighbors in the Arden agrihood, Loxahatchee, FL.</p>' +
            '<div class="foot-links">' + footLinks + '</div>' +
          '</div>' +
          '<div class="disclaimers" aria-label="Label warnings">' +
            '<span>⚠️ May cause neighborhood-wide discussion.</span>' +
            '<span>Not responsible for Facebook posts.</span>' +
            '<span>Best enjoyed during HOA meetings.</span>' +
            '<span>Pairs well with wine &amp; unsolicited opinions.</span>' +
            '<span>Made in Arden. Complained about in Arden.</span>' +
          '</div>' +
        '</div>' +
        '<p class="fine">“Keeping Arden spicy since the amenities opened… eventually.” Contains peppers, sarcasm, and community drama. Not affiliated with the Arden HOA, its developer, the second clubhouse, the pool wristband committee, or any data center. Product names are neighborhood satire — all in good fun, neighbors.</p>' +
        '<div class="legal">' +
          '<span>© ' + year + ' Florida Man Fire Sauce Co.</span>' +
          '<span>Loxahatchee, FL</span>' +
          '<span>Heat level: someone parked at the mailbox.</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(footer);
  }

  /* ---------- promo modal ---------- */
  function buildPromoModal() {
    if (sessionStorage.getItem("arden_promo_seen")) return;

    var overlay = document.createElement("div");
    overlay.className = "promo-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Special offer");
    overlay.innerHTML =
      '<div class="promo-box">' +
        '<button class="promo-close" aria-label="Close offer">✕</button>' +
        '<span class="promo-eyebrow">📦 Delivery update</span>' +
        '<h2>Sunday<br>Delivery<br>This Week.</h2>' +
        '<p>All orders placed between now and Sunday, August 23rd will be delivered on <b>Sunday 8/23</b>.<br><br>Place your order, pay by Zelle, and we\'ll text you when it\'s confirmed.</p>' +
        '<a href="#shop" class="btn btn-primary" style="width:100%">Shop the lineup →</a>' +
        '<p class="promo-fine">Order by Sunday 8/23. Cannot be combined with pool wristbands.</p>' +
      '</div>';

    function close() {
      overlay.classList.add("closing");
      sessionStorage.setItem("arden_promo_seen", "1");
      setTimeout(function () { overlay.remove(); }, 260);
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.closest(".promo-close")) close();
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); }
    });

    document.body.appendChild(overlay);
    overlay.querySelector(".promo-close").focus();
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("revealed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("revealed"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });

    // dark heat-index meter fill on reveal
    var hi = document.querySelector(".heatindex");
    if (hi) {
      new IntersectionObserver(function (e, o) {
        if (e[0].isIntersecting) { hi.classList.add("revealed"); o.disconnect(); }
      }, { threshold: 0.25 }).observe(hi);
    }
  }

  /* ---------- add-to-cart (event delegation) ---------- */
  function initAddToCart() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-add]");
      if (!btn || !window.Arden) return;
      window.Arden.addToCart(btn.getAttribute("data-add"), 1);
      var label = btn.textContent;
      btn.classList.add("added");
      btn.textContent = "Added ✓";
      setTimeout(function () { btn.classList.remove("added"); btn.textContent = label; }, 1100);
    });
  }

  function init() {
    buildNav();
    buildBunting();
    buildFooter();
    initReveal();
    initAddToCart();
    if (window.Arden) window.Arden.updateBadge();
    setTimeout(buildPromoModal, 900);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
