# ToploTeta in HladnoStric — knjiga

Live: https://marjanb.github.io/tths-book/

Published from this repo by `.github/workflows/pages.yml`, which compiles
`src/` with `tsc` and deploys the folder to GitHub Pages on every push to
`main`.

A standalone flip-book: plain HTML, CSS and TypeScript. No Nuxt, no framework,
no runtime dependencies. The two web fonts (Fraunces, Nunito) come from Google
Fonts; without a network the stack falls back to Georgia and a system sans.

## Motion

All of it is CSS; no animation library is pulled in.

- **The page turn** is a `transform` transition on `.leaf` — `rotateY(-180deg)`
  over `--flip` on an ease-in-out curve. Transitions, not keyframes, so an
  interrupted or reversed turn picks up from where the page actually is.
- **The fold** is the page turn itself. A turning page is not a flat plate
  pivoting on the spine: it is a sheet folding over a crease that travels from
  the outer edge to the spine. `--fold` is that crease (1 = outer edge, 0 =
  spine) and the two halves do the work in plain 2D — the front is clipped to
  the part still lying flat, the back is translated by `2 * fold - 1` and
  clipped to the rest, which lands it reflected about the crease. At `fold = 0`
  that is pixel-identical to the resting flipped state, so the hand-off is
  invisible. `--fold` is a registered `@property`, so a plain CSS transition
  animates it.
  The shading is driven by two numbers: `--fold-ink`, which eases to zero over
  the last quarter so the crease dissolves as the page settles, and
  `--fold-lift`, a parabola (`4 * fold * (1 - fold)`) standing for how far the
  paper is off the page. The lift widens the crease, deepens the shadow the
  standing sheet casts, brightens the lit edge of the bend and pushes the
  drop-shadow out — all strongest halfway through, when the sheet is upright.
  Three things are easy to get wrong here. The folded half has to be moved
  into `.fold-layer` for the duration, because z-index does not order coplanar
  siblings inside a `preserve-3d` stack — left in place, the flap paints
  *behind* the pages it sweeps over. The flap is tracked in a `WeakMap` keyed
  by leaf: a turn that starts before the previous fold's `transitionend`
  (the hold is released a frame or two earlier) must send the old flap home
  first, or clearing the layer takes that leaf's back page with it. And the
  shadow the lifted half casts cannot be a `filter` on the flap, because
  `clip-path` is applied after `filter` and would clip the shadow away with
  everything else outside the box — it is `.fold-edge`, its own element.
- **The staggered entrance** (`reveal()`, 75ms apart) is only for changes that
  swap the whole spread at once, such as a jump from the contents. A turn does
  its own revealing — the folded half carries the new left page in plain sight
  from the first frame — so blanking it and rising it back in reads as the
  page flickering.
- **The sky** drifts: blobs, a turning sun, a spinning flake, a bobbing flower,
  a sliding cloud and rising motes.
- `FLIP_MS` in `book.ts` must match `--flip` in `book.css`.
- Under `prefers-reduced-motion` every one of these is off, and turns apply
  instantly with no 820ms lock, so pages can be stepped through as fast as the
  key repeats.

## Run

```sh
npm install        # only TypeScript, only for building
npm run build      # src/*.ts -> dist/*.js
npm run serve      # http://localhost:4173
```

`npm run watch` recompiles on save. The page must be served over HTTP (ES
modules don't load from `file://`). `serve.py` sends `Cache-Control: no-store`,
so a rebuild always reaches the browser — a plain `python3 -m http.server`
will happily serve yesterday's `dist/book.js` back to you.

## Layout

```
index.html          markup shell (bar, book, controls, TOC drawer)
styles/book.css     everything visual, incl. the 3D page turn
src/content.ts      the story — pure data, the only file to edit for text
src/book.ts         pagination, rendering, flipping
illustrations/      artwork
dist/               compiled JS (generated)
```

## Adding illustrations

Every illustration is a slot in `src/content.ts`:

```ts
{ type: 'illo', id: 'lonec', alt: 'Mavrični lonec na vrtu', ratio: 1.2 }
```

Without `src` it renders as a dashed placeholder showing the id and the
description. Drop the artwork into `illustrations/` and add the path:

```ts
{ type: 'illo', id: 'lonec', alt: '…', src: 'illustrations/lonec.webp', ratio: 1.2 }
```

`ratio` is width ÷ height. Art is capped at 42% of the page height and cropped
(`object-fit: cover`) so it can never push the text off the page.

## Looks

The `Videz` dropdown in the bar switches the whole book between six skins:

| value | look |
| --- | --- |
| `topla` | Topla slikanica — the default: warm cream paper, round corners |
| `nocna` | Nočna pravljica — dark indigo paper, glowing accents |
| `papir` | Stari papir — sepia, serif, square corners, justified text |
| `risanka` | Risanka — flat cartoon colours, hard outlines and shadows |
| `zima` | Zimska — cool blues and white, snow falls instead of embers rising |
| `sladoled` | Sladoled — pastel candy palette, extra-soft shapes |
| `zvezek` | Šolski zvezek — ruled paper, red margin line, handwriting |
| `kolaz` | Izrezanka — every block a pasted scrap, crooked, art on washi tape |
| `strip` | Strip — halftone dots, inked panels, a title block with a hard shadow |
| `voscenke` | Voščenke — crayon colours, wobbly frames, paragraphs tilted a hair |
| `disko` | Disko — near-black paper, neon grid, a title that pulses |

The choice is remembered in `localStorage` (key `tths-skin`). Each skin lives in
`styles/skins.css` and re-sets tokens (`--paper`, `--ink`, `--body-bg`,
`--chip-bg`, `--font-display`, …) plus the nine chapter accent pairs, so a new
skin is one `[data-skin='name']` block plus one `<option>` in `index.html`.
Switching a skin re-runs the page fit, because type can change with it.

Two rules when writing a wilder one:

- **Tilt with `rotate:`, never `transform:`.** The reveal animation and the
  illustration hover both own `transform`; the independent `rotate` property
  doesn't collide with either.
- **A background behind `.page-title` needs `background-clip: border-box` and
  an explicit `color` / `-webkit-text-fill-color`.** The base title clips its
  gradient to the glyphs, so a skin that paints a block behind it gets
  invisible text otherwise.

## Colour

Every chapter carries a `theme` (`sun`, `ice`, `dawn`, `honey`, `ember`,
`lilac`, `meadow`, `rainbow`, `twins`). The theme sets `--a1` / `--a2` on that
chapter's pages, which drive the title gradient, the wave under a chapter
opener, the drop cap, list bullets, page tint, illustration frame and folio —
so each story has its own mood without touching the markup. Add or change one
in the `.theme-*` block at the top of `styles/book.css`.

## Editing the text

`src/content.ts` holds `frontMatter`, `chapters` and `backMatter`. A chapter is
a list of pages, a page is a list of blocks (`h1`, `h2`, `p`, `list`, `illo`,
`toc`). Page breaks are explicit — one `RawPage` is one printed page — so you
control what lands on a spread. Page numbers, the contents page and the chapter
drawer are generated; chapters are automatically padded to open on a left-hand
page.

`.face` clips, so a page can't bleed past the paper, and `.stage` uses
`overflow: clip` — the folded half is shaped by `clip-path`, but its layout
box still swings a page-width past the book and counts as scrollable overflow,
which showed up as a scrollbar mid-turn on phones. `clip` trims it without
making a scroll container; no `overflow-clip-margin`, because that applies on
every side and any room left for the crease leaks sideways as overflow again.
Nothing in the book scrolls. That works because the fit is guaranteed: `fitFaces()` shrinks a too-full page's type, and with it its art
(capped at `42% * --fit` of the page height), until the blocks fit, down to a
floor of 58%. A page that still doesn't fit at the floor is named in a console
warning; split it in `content.ts` rather than letting it overlap. Across all
eleven skins and every window size tested, the worst case is 76%.

Only the spread on screen is fitted eagerly — `update()` fits the incoming
pages at the start of every turn, while both faces are still hidden. Fitting
all 68 pages at once (as a skin change used to) costs well over a frame and
visibly stutters the ambient animation.

Two consequences worth knowing:

- Art is shaped by `border-radius` on the image itself (`border-radius:
  inherit`), not by a clipping frame, and `.page` inherits its face's radius so
  the paper's own corners are round.
- `.page-title` carries `will-change: transform`. Without its own layer, Chrome
  drops the `background-clip: text` mask past the first line whenever a skin
  tilts the title inside the 3D page stack — the second line simply stops
  painting.

## Controls

Click left/right half, ‹ › buttons, arrow keys / space / PageUp / PageDown,
`Home` to go back to the cover, swipe on touch, `Kazalo` for the chapter
drawer (× or `Esc` to close). The contents open with `Naslovnica`, which goes
back to the cover; chapters follow with their page numbers. Below 900px the
book shows one page at a time.

The book is silent by design — no audio.
