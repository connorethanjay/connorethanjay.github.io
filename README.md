# Blue View — personal technical blog

A fast, fully static blog with smooth scroll animations, built to be hosted **for free on GitHub Pages**. No build step, no framework, no backend — just HTML, CSS and a little vanilla JavaScript.

---

## ✍️ How to add a new blog post (the only file you need to touch)

All posts live in **`assets/js/posts.js`**. To publish a new post:

1. Open `assets/js/posts.js`.
2. Copy an existing post object and paste it at the **top** of the `POSTS` array (newest first).
3. Edit the fields:

```js
{
  slug: "my-new-post",                 // unique id used in the URL
  title: "My new post title",
  date: "Jul 2026",
  tags: ["Networking", "Notes"],
  summary: "One or two sentences shown under the title.",
  body: `
Write the article here in **Markdown**.

## A section heading

- a bullet
- another bullet

> This becomes a highlighted callout box.

\`\`\`bash
echo "code blocks are supported too"
\`\`\`
`
}
```

4. Save. That's it — the homepage list **and** a dedicated page at
   `post.html?slug=my-new-post` are generated automatically.

> Markdown supported: headings (`##`), **bold**, `inline code`, fenced code blocks,
> blockquotes (callouts), links and lists.

---

## 🖼️ Replacing the placeholder assets

- **Profile photo** — replace `Profile.png` with your own square image (keep the same name).
- **Résumé** — drop your `resume.pdf` into the project root. The "resume ↗" nav button already links to it.

---

## 🚀 Deploying to GitHub Pages

1. Create a repo (e.g. `blue-view`) and push these files to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Set **Source** = *Deploy from a branch*, **Branch** = `main`, folder = `/ (root)`.
4. Save. Your site goes live at `https://<username>.github.io/<repo>/` in a minute or two.

A custom domain (e.g. `blue-view.org`) can be set under **Settings → Pages → Custom domain**.

> The included empty `.nojekyll` file tells GitHub Pages to serve the `assets/`
> folder as-is without Jekyll processing. Leave it in place.

---

## 👀 Previewing locally

The site works by simply opening `index.html` in a browser. For the most
production-accurate preview (and to avoid any browser file-path quirks), serve it:

```bash
cd blue-view
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 📁 Project structure

```
blue-view/
├── index.html              # Homepage (hero, projects, posts, about)
├── post.html               # Renders any single post by ?slug=
├── Profile.png             # Avatar (replace with your own)
├── resume.pdf              # (add your own)
├── .nojekyll               # GitHub Pages: serve assets as-is
└── assets/
    ├── css/style.css       # All styling + animations
    ├── js/
    │   ├── posts.js        # ← YOUR POSTS LIVE HERE
    │   ├── main.js         # scroll progress, reveals, nav, typing
    │   ├── home.js         # builds the homepage post list
    │   └── post.js         # renders a single post
    └── vendor/marked.min.js# Markdown renderer
```

---

## ✨ Animations included

- Scroll progress bar across the top of the page
- Terminal-style typing effect on the hero headline
- Scroll-triggered reveals with staggered timing (fade-up, slide-in, scale)
- Sticky nav that shrinks + gains a shadow on scroll, with animated link underlines
- Project card hover lift, live "Active" status pulse, and post-row hover effects
- Smooth anchor scrolling
- Full `prefers-reduced-motion` support for accessibility
