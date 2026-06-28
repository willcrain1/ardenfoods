/* ============================================================
   Arden Foods Co. — shared site chrome
   Renders the nav + footer on every page, wires the mobile
   menu, scroll-reveal, add-to-cart buttons, and cart badge.
   Edit the nav/footer ONCE here, not per page.
   ============================================================ */
(function () {
  "use strict";

  var PAGES = [
    { key: "hotsauce",  href: "hotsauce.html",      label: "Hot Sauce" },
    { key: "focaccia",  href: "focaccia.html",      label: "Focaccia" },
    { key: "cookies",   href: "cookies.html",       label: "Cookies" },
    { key: "salsa",     href: "salsa.html",         label: "Salsa" },
    { key: "margarita", href: "margarita-mix.html", label: "Margarita Mix" }
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
        '<a href="index.html" class="brand"><span class="flame" aria-hidden="true">🌶️</span> Arden Foods Co.</a>' +
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
            '<div class="brand" style="color:var(--cream)"><span aria-hidden="true">🌶️</span> Arden Foods Co.</div>' +
            '<p style="max-width:38ch;margin:.6rem 0 0;color:#a8957f">Premium homemade food — hot sauce, focaccia, cookies, salsa &amp; margarita mixes — made by your neighbors in the Arden agrihood, Loxahatchee, FL.</p>' +
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
          '<span>© ' + year + ' Arden Foods Co.</span>' +
          '<span>Loxahatchee, FL</span>' +
          '<span>Heat level: someone parked at the mailbox.</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(footer);
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
    buildFooter();
    initReveal();
    initAddToCart();
    if (window.Arden) window.Arden.updateBadge();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
