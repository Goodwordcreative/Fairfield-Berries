# Fairfield Berries

The website for Fairfield Berries, a pick your own berry farm and farm shop at 292 Wakefield Kohatu Highway, just south of Wakefield in Tasman. It's plain HTML, CSS and a little JavaScript, with no build step. Open any `.html` file in a browser and it works.

Preview: https://goodwordcreative.github.io/Fairfield-Berries/

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `pick-your-own.html` | Pick Your Own |
| `our-story.html` | Our Story |
| `prices.html` | Prices |
| `farm-shop.html` | Farm Shop |
| `gallery.html` | Gallery (tap a photo to open it bigger) |
| `blog.html` | Blog (with the live Facebook feed beside it) |
| `find-us.html` | Find Us (map, contact form) |
| `faq.html` | FAQ |
| `404.html` | Shown when someone visits a page that doesn't exist |
| `blog-post-template.html` | Starting point for a new blog post. Not linked anywhere. |

The menu is copied into every page, so **if you change the menu, change it on every page**. The same goes for the footer.

## Styles and scripts

- `styles.css`: the original base styles.
- `site.css`: the Option A look. New sections added in November 2026 (Home button, homepage map, Facebook feed, gallery, blog) are in a labelled block at the bottom.
- `site.js`: the mobile menu, photo carousels, contact form, Facebook feed sizing and the gallery viewer. Each part has a comment above it.
- When you change `site.css`, raise the number in `site.css?v=5` on every page (to `v=6` and so on). Browsers keep old copies of CSS files, and the number makes them fetch the new one.

## SEO: what's in place and why

Every page has:
- **A unique `<title>` and `<meta name="description">`.** These are what Google shows in search results. Keep titles under about 60 characters and descriptions under about 155.
- **A canonical link** (`<link rel="canonical">`), which tells Google the one true address of the page.
- **Open Graph tags** (`og:title`, `og:image` and so on), which control the preview card when someone shares the link on Facebook or in Messenger. The share photo is `public/images/og-fairfield-berries.jpg` (1200 × 630).
- **One `<h1>`**, then `<h2>`s for sections and `<h3>`s inside those. Don't skip levels.
- **Alt text on every photo**, describing what's in it. Decorative artwork has `alt=""`.
- **Structured data** (the `application/ld+json` blocks). The home page and Find Us describe the business (name, address, phone, socials) in a format Google reads directly. Inner pages carry a breadcrumb. When Elise confirms the opening hours, add them here too (ask Josh).
- **A skip link** ("Skip to content") for keyboard users. Press Tab on any page to see it.

The site also has `sitemap.xml` (a list of every page for Google) and `robots.txt`.

Photos were resized from phone originals (up to 9 MB each) to at most 2000 px, about 0.3 to 0.9 MB. Fast pages rank better and load better on farm-road mobile signal. Please resize new photos before adding them: 2000 px on the long edge is plenty. The gallery uses smaller copies from `public/images/thumbs/`.

## Still to come from Elise

Search the pages for **"to be confirmed"** to find every gap:
- Opening hours and what's being picked this season (home page "Find Fairfield Berries", FAQ)
- Prices for pick your own, berries and ice cream (Prices page)
- More of the Our Story text, and a photo
- The farm shop product list
- Whether Specials should be its own page or posts on the Blog

## Adding a blog post

1. Copy `blog-post-template.html` and name the copy `blog-<short-name>.html`, for example `blog-strawberries-are-ready.html`.
2. In the copy, change the `<title>`, the description, the canonical link, the date, the heading and the words. Then delete the line marked `TEMPLATE ONLY`.
3. On `blog.html`, copy the commented-out `<article class="post-card">` example. Fill it in, put it under "Latest posts", and remove the "No posts yet" paragraph.
4. Add a `<url>` line for the post in `sitemap.xml`.

## The Facebook feed

The home page and blog show the live Facebook Page (`facebook.com/fairfieldberries`) using Facebook's Page Plugin, an `<iframe>`. It updates itself whenever the farm posts on Facebook. Some browsers and ad blockers hide it, so a link to the Facebook page always shows underneath.

## Launch checklist (when the site moves to its real domain)

1. On every page, delete the `<meta name="robots" content="noindex, nofollow">` line and the comment above it. Keep the `noindex` on `404.html` and `blog-post-template.html`.
2. Find and replace `https://goodwordcreative.github.io/Fairfield-Berries/` with the real address (for example `https://fairfieldberries.co.nz/`) in every `.html` file, `sitemap.xml` and `robots.txt`.
3. Submit the sitemap in Google Search Console, and update the website link on the Google Business Profile and Facebook page.

## Working together

Make changes on a branch, push it, and open a pull request. Josh reviews and merges it. Pull `main` before starting each session so you're building on the latest version.
