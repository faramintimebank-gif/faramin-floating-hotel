(() => {
  "use strict";
  const toggle = document.getElementById("langToggle");
  const savedLangKey = "faramin-language";
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const setLanguage = (lang) => {
    const english = lang === "en";
    document.documentElement.lang = english ? "en" : "fa";
    document.documentElement.dir = english ? "ltr" : "rtl";
    document.body.classList.toggle("en", english);
    document.querySelectorAll("[data-fa][data-en]").forEach((node) => {
      const value = node.dataset[english ? "en" : "fa"];
      if (value !== undefined) node.innerHTML = value;
    });
    document.title = english
      ? "Faramin Floating Hotel | Sustainable Tourism Concept"
      : "هتل شناور فرامین | چشم‌انداز گردشگری پایدار";
    toggle.textContent = english ? "FA" : "EN";
    toggle.setAttribute("aria-pressed", english ? "true" : "false");
    toggle.setAttribute("aria-label", english ? "تغییر زبان به فارسی" : "Switch language to English");
    try { localStorage.setItem(savedLangKey, lang); } catch (_) { /* storage may be disabled */ }
  };

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? (document.documentElement.lang === "en" ? "Close" : "بستن منو") : (document.documentElement.lang === "en" ? "Menu" : "منو");
    mainNav.classList.toggle("is-open", open);
  });

  toggle.addEventListener("click", () => {
    const next = document.documentElement.lang === "fa" ? "en" : "fa";
    setLanguage(next);
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());

  // Use the saved preference when available; default remains Persian/RTL.
  try {
    const saved = localStorage.getItem(savedLangKey);
    if (saved === "en") setLanguage("en");
  } catch (_) { /* no persistent storage required */ }

  // In-page navigation remains native anchors; no fake forms or backend claims.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) {
        event.preventDefault();
        console.warn("Missing in-page target:", id);
      } else {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = document.documentElement.lang === "en" ? "Menu" : "منو";
      }
    });
  });
})();
