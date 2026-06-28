/* =========================================================
   Blue View — post page renderer
   Reads ?slug= from the URL, finds the post in POSTS,
   renders its Markdown body, and wires prev/next navigation.
   ========================================================= */

(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const posts = window.POSTS || [];
  const idx = posts.findIndex((p) => p.slug === slug);
  const post = posts[idx];

  const titleEl = document.getElementById("post-title");
  const eyebrowEl = document.getElementById("post-eyebrow-date");
  const summaryEl = document.getElementById("post-summary");
  const tagsEl = document.getElementById("post-tags");
  const bodyEl = document.getElementById("post-body");
  const prevEl = document.getElementById("post-prev");
  const nextEl = document.getElementById("post-next");

  if (!post) {
    document.title = "Post not found — Blue View";
    if (titleEl) titleEl.textContent = "404 — post not found";
    if (summaryEl) summaryEl.textContent = "That post doesn't exist (or the link is wrong). Head back to the homepage.";
    if (bodyEl) bodyEl.innerHTML = '<p><a class="back-link" href="index.html">← Back to all writing</a></p>';
    return;
  }

  document.title = post.title + " — Blue View";

  if (titleEl) titleEl.textContent = post.title;
  if (eyebrowEl) eyebrowEl.textContent = post.date;
  if (summaryEl) summaryEl.textContent = post.summary || "";
  if (tagsEl) {
    tagsEl.innerHTML = (post.tags || [])
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
  }

  if (bodyEl && window.marked) {
    window.marked.setOptions({ breaks: false, gfm: true });
    bodyEl.innerHTML = window.marked.parse(post.body || "");
  }

  // prev / next (newer posts are first in the array)
  const newer = posts[idx - 1];
  const older = posts[idx + 1];
  if (prevEl) {
    if (newer) {
      prevEl.href = "post.html?slug=" + encodeURIComponent(newer.slug);
      prevEl.innerHTML = "← " + newer.title;
    } else {
      prevEl.className = "disabled";
      prevEl.textContent = "← Newer";
    }
  }
  if (nextEl) {
    if (older) {
      nextEl.href = "post.html?slug=" + encodeURIComponent(older.slug);
      nextEl.innerHTML = older.title + " →";
    } else {
      nextEl.className = "disabled";
      nextEl.textContent = "Older →";
    }
  }

  // reveal animation for the body now that it exists
  if (bodyEl) bodyEl.classList.add("reveal");
  if (typeof window.__bvInitReveal === "function") window.__bvInitReveal();
})();
