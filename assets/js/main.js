/* =========================================================
   Blue View — shared site behaviour
   - scroll progress bar
   - nav shrink on scroll
   - IntersectionObserver scroll reveals
   - hero terminal typing effect
   ========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll progress + nav shrink ---------- */
  function initScrollUI() {
    const bar = document.querySelector(".scroll-progress");
    const nav = document.querySelector("nav");
    let ticking = false;

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      if (bar) bar.style.width = pct + "%";
      if (nav) nav.classList.toggle("shrink", scrollTop > 20);
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          entry.target.style.transitionDelay = delay + "ms";
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Hero terminal typing ---------- */
  function initTyping() {
    const el = document.querySelector("[data-typing]");
    if (!el) return;
    const lines = JSON.parse(el.dataset.typing);
    const cursor = document.createElement("span");
    cursor.className = "type-cursor";
    cursor.textContent = "▋";

    if (prefersReduced) {
      el.innerHTML = '<span class="prompt-prefix">$ </span>' + lines.join("<br>");
      el.appendChild(cursor);
      return;
    }

    el.innerHTML = '<span class="prompt-prefix">$ </span>';
    el.appendChild(cursor);
    const promptSpan = el.querySelector(".prompt-prefix");

    const full = lines.join("\n");
    let i = 0;
    function tick() {
      if (i >= full.length) return;
      const ch = full[i];
      if (ch === "\n") {
        promptSpan.insertAdjacentHTML("afterend", "<br>");
      } else {
        const t = document.createTextNode(ch);
        el.insertBefore(t, cursor);
      }
      i++;
      const speed = 26 + Math.random() * 34;
      setTimeout(tick, speed);
    }
    setTimeout(tick, 350);
  }

  /* ---------- Dark mode toggle (persists across pages) ---------- */
  function initTheme() {
    const root = document.documentElement;
    const btn = document.getElementById("theme-toggle");

    function apply(theme) {
      if (theme === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
    }

    let saved = null;
    try { saved = localStorage.getItem("bv-theme"); } catch (e) {}
    apply(saved || "light");

    if (btn) {
      btn.addEventListener("click", function () {
        const isDark = root.getAttribute("data-theme") === "dark";
        const next = isDark ? "light" : "dark";
        apply(next);
        try { localStorage.setItem("bv-theme", next); } catch (e) {}
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initScrollUI();
    initReveal();
    initTyping();
  });

  // expose reveal init for dynamically injected content
  window.__bvInitReveal = initReveal;
})();
