# Yulia Pak — Portfolio

A plain HTML/CSS/JS site, no build step — built to match the layout of your
Adobe Portfolio site, ready to host for free on GitHub Pages.

## Putting it online (GitHub Pages)

1. Create a free account at github.com, if you don't have one yet.
2. Create a new repository named **exactly** `yourusername.github.io`
   (replace `yourusername` with your actual GitHub username — this exact
   name is what makes GitHub turn it into a live website automatically).
3. On the repository page, click "Add file" → "Upload files", then drag
   in everything from this folder (keep the `assets` folder structure
   intact) and commit.
4. Within a minute or two your site is live at `https://yourusername.github.io`.
5. Any time you want to update it, upload the changed file(s) again the
   same way — GitHub Pages rebuilds automatically.

## Adding your videos

Open `assets/data/videos.js`. For each project, paste your YouTube video
ID into `youtubeId`. You get the ID from the share link:

- `https://youtu.be/dQw4w9WgXcQ` → the ID is `dQw4w9WgXcQ`
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → same ID, after `v=`

Leave `youtubeId: ""` empty and that project shows a placeholder card
instead, so you can keep building the page before every video is ready.
Add as many entries to each list as you like — the grid grows on its own.

## Contact page

`contact.html` currently shows the email on your Claude account
(`yulialia.pak@gmail.com`) and your LinkedIn. If you'd rather show a
different email, open `contact.html` and replace both places it appears
(the visible text and the `mailto:` link).

## Design notes

- Fonts: Cormorant Garamond (headings/logo) + Inter (body), loaded free
  from Google Fonts — no license needed.
- Colors and layout are a close match to your current Adobe Portfolio
  site: same hero photo treatment, same 2-column work grid, same
  full-screen hamburger nav.
- All six category images (Showreel, Motion Design, AI, Storyboards,
  Digital Compositing, Full Pipeline Projects) and the homepage hero photo
  were pulled directly from your live Adobe Portfolio site, so nothing
  needs to be re-uploaded.
- The site has no contact form (GitHub Pages can't run one without a
  third-party service) — contact is a direct email link and LinkedIn,
  per your call.

## File structure

```
index.html                  Home (hero + work grid)
showreel.html                }
motion-design.html           }
ai.html                      }  category pages — each pulls its
storyboards.html             }  videos from assets/data/videos.js
digital-compositing.html     }
full-pipeline.html          }
about.html                   About page
contact.html                 Contact page
assets/css/styles.css        All styling
assets/js/main.js            Nav menu + video grid rendering
assets/data/videos.js        Your video list — edit this to add videos
assets/images/               Hero photo + category tile images
```
