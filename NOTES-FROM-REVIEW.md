# Notes from our review of the site

Hi Bridget. Josh and the Blank Software team went through the site before adding the menu changes, gallery, blog, Facebook feed, map and SEO. This file collects what we noticed along the way: small things, each with why it matters. None of it is a telling-off. You built this from nothing in a week, and it's a real site.

Every change we made is its own commit on the branch `josh/seo-nav-features`, with a message saying what it does and why. Read them in order on GitHub (Commits tab) and you'll see the site change one step at a time.

## What's already good

- **Real photos of the real farm.** This matters more than any design choice. Nothing beats the family's own photos.
- **Alt text on every photo**, written to describe what's in the frame. A lot of sites skip this.
- **`lang="en-NZ"`, exactly one `<h1>` per page, and a meta description on every page.** These are the basics that most hand-built sites miss.
- **`aria-current="page"` on the menu**, so screen readers announce which page you're on.
- **The FAQ uses `<details>` and `<summary>`.** That gives an open-and-close list with no JavaScript, and it works with a keyboard out of the box.
- **Phone and email are real links** (`tel:` and `mailto:`), so one tap calls or emails from a phone.
- **"To be confirmed" instead of made-up prices or hours.** Keep doing this. Inventing details the client hasn't given is how sites end up wrong.

## Small things we found

**1. Every page was one long line.**
Each HTML file was a single line of about 10,000 characters. That's hard to read, and on GitHub any edit shows as the whole file changing. The first commit just reformats everything to one tag per line, with no content changes; we checked that every page renders identically. If you use VS Code, the Prettier extension does this on save.

**2. The photos were straight off phones.**
They were up to 9MB each, 95MB across the site. Someone on mobile signal on the road out of Wakefield would wait a long time, and Google ranks slow pages lower. We resized every photo to at most 2000px on its long edge (28MB in total). Rule of thumb: nothing on a website needs to be wider than about 2000px.

**3. Some photos were secretly sideways.**
Phones save a photo sideways and add a note saying "rotate me". Most browsers obey the note, but some tools ignore it. We rotated the pixels themselves, so every photo is upright everywhere.

**4. The logo was the print file.**
The header and footer loaded a 719KB logo on every page. The web copy is 18KB and looks the same.

**5. The menu and footer are copied into every page, and the copies had drifted apart.**
The logo link was labelled "Fairfield Berries" on the home page, "Fairfield Berries home" on some pages and "Fairfield Berries homepage" on others. That's the risk of copy and paste: fix one page and the others don't get the fix. With plain HTML, the answer is to change the menu everywhere at once, every time. (See the Astro section below for how a framework avoids this.)

**6. The home page had its own, older copy of the menu script.**
Every other page loaded `site.js`, but `index.html` had an inline copy of an earlier version. A fix to `site.js` never reached the home page. Now all pages share `site.js`.

**7. One section sat outside `<main>`.**
"Questions before you visit?" came after `</main>` on the home page. Screen readers use `<main>` to jump to the content, so anything outside it gets skipped. We moved it inside.

**8. Two small grey texts were too faint.**
`.story-note` and the "Swipe to see more" hint used `#777` on white, a contrast ratio of 4.48:1. The accessibility standard (WCAG) asks for at least 4.5:1, so they just missed. `#56606a` is 6.3:1 and still reads as a soft grey. WebAIM's free contrast checker is handy for this.

**9. Leftover CSS from Options B and C.**
The option pages were deleted, but their styles weren't. `styles.css` and `site.css` still have rules for `.hero-b`, `.option-b` (27 rules), `.review-card`, `.gallery-scroller`, `.tile-card`, `.blue-band`, `.preview-bar` and more, none used on any page. They don't break anything, but they make the CSS harder to work in. A good tidy-up job for you: search the HTML for each class, and delete the CSS if it's not there.

**10. The same rule is set several times.**
`.option-a .visit-simple` has its padding set in three places, and `.focus-shop .focus-track figure:first-child img` appears twice. There are also 45 `!important`s. Each one usually means two rules were fighting and the newest one was forced to win. When something won't change, find the rule that's winning (right-click the element, then Inspect) instead of adding another `!important`.

**11. The fonts load late.**
`styles.css` pulls in Google Fonts with `@import`, so the browser only finds the fonts after it has downloaded the CSS. We added `preconnect` links so the connection starts straight away. Even better, move the font into a `<link>` in each page's `<head>`.

**12. One photo was in the folder twice.**
`kids-in-row.jpg` and `bb7706f5b105250db5c5dbf6660e31ac.jpeg` are the same file. Naming photos for what's in them (`two-girls-in-berry-rows.jpg` rather than `IMG_5190.jpeg`) makes this easy to spot, and helps Google Images a little too.

**13. Smooth scrolling for everyone.**
`html { scroll-behavior: smooth }` animates every jump. Some people get motion sickness from that and turn on "reduce motion" on their device. Wrapping the rule in `@media (prefers-reduced-motion: no-preference) { ... }` respects their setting.

**14. Em dashes.**
A house style point rather than a mistake: we keep long dashes (—) out of client sites because they've become a sign of AI-written text. We swapped them for commas and colons.

**15. The SEO basics that were missing.** (Now added. The README explains each one.)
- a canonical link on each page
- share previews for Facebook and Messenger (Open Graph tags and a share photo)
- structured data describing the business for Google
- `sitemap.xml` and `robots.txt`
- a 404 page

We also gave each page a title that leads with what people actually search for, like "Pick Your Own Berries near Wakefield".

## A few design notes to think about

These are choices, not bugs, and the design is yours. They're patterns that make a site look like a template, so they're worth knowing about.

- **Small all-caps labels over every section** ("OUT IN THE BERRY ROWS", "AT FAIRFIELD"). One, used where it adds information, works. On every section they become wallpaper, and they're one of the most common template tells right now.
- **An arrow (→) on every link and button.** Same idea: when everything has one, it stops meaning "go".
- **Every card has the same rounded corners and soft shadow.** Some variety in shape and weight helps the important things stand out.
- **The page stops at 1160px wide.** On a big monitor the site is a column with empty space either side. Try `.wrap { width: min(1400px, calc(100% - 44px)) }`, and keep long paragraphs readable with `max-width: 65ch` on the text itself.

## Why we'd normally use a framework like Astro, and why we haven't here

For most client sites, Blank Software uses Astro. Astro is a tool that takes building blocks you write and produces plain HTML and CSS, the same kind of files you've written by hand. It helps with exactly the things that are fiddly in plain HTML:

- **Write the menu once.** The header and footer live in one file, and every page uses them. Points 5 and 6 above can't happen.
- **Photos get sized automatically.** Drop in the phone original, and Astro makes small, medium and large versions in modern formats, and serves each visitor the right one.
- **Blog posts are text files.** Each post is a simple file of words, and Astro builds the page, the blog list and the sitemap entry from it.
- **The client can edit it.** We can add a simple editor so Elise could update prices, hours and specials herself, without touching code.
- **Checks run before anything goes live.** For example, a broken link or a missing description stops the build.

The cost is a build step: Node.js, a terminal, and a few new ideas to learn before you can change anything.

**We're not switching this site, for three reasons.** You've put in a lot of real work (137 commits), and it shows. The site is small enough that plain HTML is perfectly manageable. And the fundamentals you're practising here, like semantic HTML, CSS, accessibility and what each SEO tag does, are exactly what Astro is built on. Everything above still applies inside a framework; it just takes away the copy and paste. If the blog gets busy, or Elise wants to update the site herself, that's when moving to Astro would be worth it, and your HTML and CSS would carry straight across.
