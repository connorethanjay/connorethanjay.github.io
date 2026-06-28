/* =========================================================
   Blue View — homepage: render the "Recent posts" list
   from POSTS (assets/js/posts.js).
   ========================================================= */

(function () {
  "use strict";

  const list = document.getElementById("recent-posts-list");
  if (!list || !Array.isArray(window.POSTS)) return;

  const html = window.POSTS.map(function (post, idx) {
    const tags = (post.tags || [])
      .map((t) => `<span class="tag" style="font-size:11px;">${t}</span>`)
      .join("");
    return `
      <a class="post-item reveal" data-delay="${idx * 90}" href="post.html?slug=${encodeURIComponent(post.slug)}">
        <div class="post-item-left">
          <div class="post-title">${post.title}</div>
          <div class="post-meta">${tags}</div>
        </div>
        <div class="post-date">${post.date}</div>
      </a>`;
  }).join("");

  list.innerHTML = html;

  // re-run reveal observer for the freshly injected items
  if (typeof window.__bvInitReveal === "function") window.__bvInitReveal();
})();
