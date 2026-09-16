# Yulia Pak — Portfolio

A copy of the Adobe Portfolio site at yuliajuliapak.myportfolio.com, rebuilt as a
plain static site for GitHub Pages. The layout, the left menu, the spacing, the
grayscale-to-color hover on the home tiles, the image grids and all texts come
from the original pages.

## Updating the site on GitHub

1. Open the repository in the web editor: go to
   github.com/yuliajuliapak/yuliajuliapak.github.io and press the `.` key.
2. Delete the old `assets` folder (right-click → Delete). This removes files
   from the previous version that are no longer used.
3. Drag everything from inside this folder into the file panel: all the
   `.html` files, `README.md` and the new `assets` folder. Replace files if asked.
4. Source Control icon → type a message → Commit & Push.

## Pages

| File | Original page |
|---|---|
| index.html | /work |
| showreel.html | /showreel |
| motion-design.html | /motion-design |
| ai.html | /ai |
| storyboards.html | /school-of-motion |
| digital-compositing.html | /digital-compositing |
| full-pipeline.html | /archive-1 |
| about.html | /about |
| contact.html | /contact |

## Videos

The videos are still the same Adobe video player embeds used on the
Adobe Portfolio pages. They depend on Adobe, so if the Adobe Portfolio or
Creative Cloud account is closed they may stop playing.

To swap one for YouTube, open the page file, find the `<iframe ... src="https://www-ccv.adobe.io/...">`
for that video and replace only the `src` value with
`https://www.youtube.com/embed/VIDEO_ID` (VIDEO_ID is the part after `youtu.be/`
or after `watch?v=`). Everything else around it can stay as it is.

## Fonts

The original uses Adelle and Proxima Nova, which are licensed through Adobe
Fonts. This version ships with the closest free look-alikes, Bitter and
Figtree, stored in `assets/fonts`, so it needs no account.

If you keep a Creative Cloud plan, you can use the exact fonts: on
fonts.adobe.com create a Web Project with Adelle (Regular) and Proxima Nova
(Bold), copy its `<link rel="stylesheet" href="https://use.typekit.net/xxxxxxx.css">`
line and paste it into the `<head>` of every page. The CSS already asks for
`adelle` and `proxima-nova` first, so they will take over automatically.

## Contact form

GitHub Pages can't send form emails by itself, so the Submit button opens the
visitor's email app with the name, email and message already filled in,
addressed to yulialia.pak@gmail.com (set in `contact.html`, attribute
`data-mailto`).

## Structure

```
*.html                 pages
assets/css/main.css    shared theme styles
assets/css/<page>.css  per-page styles (from the original site)
assets/css/fonts.css   font definitions
assets/js/site.js      mobile menu, image grid sizing, lightbox, contact form
assets/images/         all images (hero, home tiles, AI, storyboards, about)
assets/fonts/          Bitter + Figtree
```
