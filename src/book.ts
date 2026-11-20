import {
  backMatter,
  bookTitle,
  chapters,
  frontMatter,
  type Block,
  type RawPage,
  type Theme,
} from './content.js';

/* ---------------------------------------------------------------- model -- */

interface Page {
  blocks: Block[];
  /** Running header, empty on cover / blank / front matter. */
  header: string;
  /** Printed page number, 0 = not printed. */
  folio: number;
  kind: 'cover' | 'front' | 'story' | 'blank' | 'end';
  theme: Theme | 'book';
  /** First page of a chapter — gets the big opener treatment. */
  opener: boolean;
}

interface ChapterStart {
  title: string;
  page: number;
}

const chapterStarts: ChapterStart[] = [{ title: 'Naslovnica', page: 0 }];

function buildPages(): Page[] {
  const pages: Page[] = [];
  const push = (
    raw: RawPage,
    kind: Page['kind'],
    header = '',
    theme: Page['theme'] = 'book',
    opener = false,
  ) => pages.push({ blocks: raw.blocks, header, folio: 0, kind, theme, opener });

  frontMatter.forEach((raw, i) => push(raw, i === 0 ? 'cover' : 'front'));

  for (const chapter of chapters) {
    // Every chapter opens on a left-hand (odd) page so it gets a full spread.
    if (pages.length % 2 === 0) push({ blocks: [] }, 'blank');
    chapterStarts.push({ title: chapter.title, page: pages.length });
    chapter.pages.forEach((raw, i) =>
      push(raw, 'story', i === 0 ? '' : chapter.label, chapter.theme, i === 0),
    );
  }

  backMatter.forEach((raw) => push(raw, 'end'));
  // The last leaf needs a back face, so keep the page count even.
  if (pages.length % 2 === 1) push({ blocks: [] }, 'blank');

  let folio = 0;
  for (const page of pages) {
    if (page.kind === 'story') page.folio = ++folio;
  }
  return pages;
}

const pages = buildPages();

/* -------------------------------------------------------------- rendering -- */

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderIllo(block: Extract<Block, { type: 'illo' }>): HTMLElement {
  const figure = el('figure', 'illo');
  figure.style.setProperty('--ratio', String(block.ratio ?? 1.4));
  figure.dataset.illo = block.id;
  if (block.src) {
    const img = el('img');
    img.src = block.src;
    img.alt = block.alt;
    img.loading = 'lazy';
    figure.append(img);
  } else {
    const slot = el('div', 'illo-slot');
    slot.append(el('span', 'illo-id', block.id), el('span', 'illo-alt', block.alt));
    figure.append(slot);
  }
  return figure;
}

function renderToc(): HTMLElement {
  const list = el('ol', 'toc');
  for (const entry of chapterStarts) {
    const item = el('li', 'toc-item');
    const button = el('button', 'toc-link');
    button.type = 'button';
    button.dataset.page = String(entry.page);
    button.append(
      el('span', 'toc-title', entry.title),
      el('span', 'toc-dots'),
      el('span', 'toc-page', pages[entry.page]!.folio ? String(pages[entry.page]!.folio) : ''),
    );
    item.append(button);
    list.append(item);
  }
  return list;
}

function renderBlock(block: Block): HTMLElement {
  switch (block.type) {
    case 'h1':
      return el('h1', 'page-title', block.text);
    case 'h2':
      return el('h2', 'page-subtitle', block.text);
    case 'p':
      return el('p', 'para', block.text);
    case 'list': {
      const list = el('ol', 'numbered');
      for (const item of block.items) list.append(el('li', undefined, item));
      return list;
    }
    case 'illo':
      return renderIllo(block);
    case 'toc':
      return renderToc();
  }
}

function renderPage(index: number): HTMLElement {
  const page = pages[index];
  const face = el('div', `page page-${page?.kind ?? 'blank'}`);
  if (!page) return face;

  face.classList.add(`theme-${page.theme}`);
  if (page.opener) face.classList.add('page-opener');
  face.dataset.index = String(index);
  if (page.header) face.append(el('div', 'running-head', page.header));

  const body = el('div', 'page-body');
  page.blocks.forEach((block, i) => {
    const node = renderBlock(block);
    node.style.setProperty('--i', String(i));
    // The first words of a chapter get a storybook initial.
    if (page.opener && block.type === 'p' && !body.querySelector('.lead')) {
      node.classList.add('lead');
    }
    body.append(node);
  });
  face.append(body);

  if (page.kind === 'cover') face.append(el('div', 'cover-rule', 'Slikanica'));
  if (page.folio) face.append(el('div', 'folio', String(page.folio)));
  return face;
}

/* ------------------------------------------------------------------ book -- */

type Mode = 'spread' | 'single';

const bookEl = document.querySelector<HTMLElement>('#book')!;
const leavesEl = document.querySelector<HTMLElement>('#leaves')!;
const progressEl = document.querySelector<HTMLElement>('#progress-bar')!;
const positionEl = document.querySelector<HTMLElement>('#position')!;
const prevBtn = document.querySelector<HTMLButtonElement>('#prev')!;
const nextBtn = document.querySelector<HTMLButtonElement>('#next')!;
const tocPanel = document.querySelector<HTMLElement>('#toc-panel')!;
const tocList = document.querySelector<HTMLElement>('#toc-list')!;
const tocToggle = document.querySelector<HTMLButtonElement>('#toc-toggle')!;
const foldLayer = document.querySelector<HTMLElement>('#fold-layer')!;
const skinSelect = document.querySelector<HTMLSelectElement>('#skin')!;

/** Must match --flip in book.css. */
const FLIP_MS = 620;

const stillness = window.matchMedia('(prefers-reduced-motion: reduce)');
/** A handset cannot afford the fold: it turns pages outright. */
const handset = window.matchMedia('(max-width: 899px)');

let mode: Mode = modeForWidth();
/** Number of leaves already turned. */
let flipped = 0;
let leaves: HTMLElement[] = [];
let busy = false;
/** The leaf in flight; it stays on top so a turning page is never buried. */
let lifting: HTMLElement | null = null;
/** Which face each folding leaf lent to the fold layer, so it goes home. */
const flaps = new WeakMap<HTMLElement, HTMLElement>();

function modeForWidth(): Mode {
  return window.matchMedia('(min-width: 900px)').matches ? 'spread' : 'single';
}

function leafCount(): number {
  return mode === 'spread' ? Math.ceil(pages.length / 2) : pages.length;
}

function buildLeaves(): void {
  // A fold in flight has nowhere to go home to once the leaves are rebuilt.
  foldLayer.textContent = '';
  foldLayer.classList.remove('folding');
  foldLayer.style.removeProperty('--fold');
  leavesEl.textContent = '';
  leaves = [];
  lifting = null;
  const total = leafCount();
  for (let i = 0; i < total; i++) {
    const leaf = el('div', 'leaf');
    const front = el('div', 'face face-front');
    const back = el('div', 'face face-back');
    if (mode === 'spread') {
      front.append(renderPage(i * 2));
      back.append(renderPage(i * 2 + 1));
    } else {
      front.append(renderPage(i));
      back.append(el('div', 'page page-blank'));
    }
    front.append(el('div', 'face-shade'));
    back.append(el('div', 'face-shade'));
    leaf.append(front, back);
    leaves.push(leaf);
    leavesEl.append(leaf);
  }
  update(false);
  requestAnimationFrame(fitPages);
}

/**
 * Nothing on a page is allowed to overflow: the body never scrolls, so if the
 * blocks don't fit, the page's type (and with it the art) is shrunk until they
 * do. A page that can't fit even at the floor is reported, so it can be split
 * in content.ts rather than silently overlapping.
 *
 * Two things keep this off the critical path. Reads and writes are batched, so
 * a pass costs a handful of layouts instead of one per page; and only the
 * spread on screen is fitted right away — the rest of the book follows in idle
 * time, because re-fitting 68 pages at once drops a frame on a skin change.
 */
const FIT_FLOOR = 0.58;

interface Fitting {
  face: HTMLElement;
  body: HTMLElement;
  fit: number;
}

function fitFaces(faces: Iterable<HTMLElement>, rounds = 7): HTMLElement[] {
  const all: Fitting[] = [];
  for (const face of faces) {
    const body = face.querySelector<HTMLElement>('.page-body');
    if (!body) continue;
    face.style.removeProperty('--fit');
    all.push({ face, body, fit: 1 });
  }
  if (!all.length) return [];

  // One read pass: who overflows at full size, and by how much.
  let pending = all.filter((f) => f.body.scrollHeight > f.body.clientHeight + 1);
  if (!pending.length) return [];

  // Type height scales with the factor, so the overflow ratio is a close first
  // guess; wrapping makes it approximate, so a few small steps follow.
  for (const f of pending) {
    f.fit = Math.min(1, Math.max(FIT_FLOOR, f.body.clientHeight / f.body.scrollHeight));
    f.face.style.setProperty('--fit', f.fit.toFixed(3));
  }

  for (let round = 0; round < rounds && pending.length; round++) {
    pending = pending.filter((f) => f.body.scrollHeight > f.body.clientHeight + 1);
    const movable = pending.filter((f) => f.fit > FIT_FLOOR);
    if (!movable.length) break;
    for (const f of movable) {
      f.fit = Math.max(f.fit - 0.03, FIT_FLOOR);
      f.face.style.setProperty('--fit', f.fit.toFixed(3));
    }
  }
  return pending.map((f) => f.face);
}

/** A leaf's page, found even while that face is lent to the fold layer. */
function pageOf(leaf: HTMLElement | undefined, side: 'front' | 'back'): HTMLElement | null {
  if (!leaf) return null;
  const lent = side === 'back' ? flaps.get(leaf) : null;
  return (lent ?? leaf).querySelector<HTMLElement>(lent ? '.page' : `.face-${side} .page`);
}

/** The one or two pages the reader can actually see. */
function visibleFaces(): HTMLElement[] {
  return [pageOf(leaves[flipped - 1], 'back'), pageOf(leaves[flipped], 'front')].filter(
    (f): f is HTMLElement => !!f,
  );
}

/**
 * Clears every page's fit and re-fits only what is on screen. Laying out all
 * 68 pages costs well over a frame, and a page that is still face down can
 * wait: `update()` fits the incoming spread at the start of every turn, while
 * both of its faces are still hidden.
 */
function fitPages(): void {
  for (const face of leavesEl.querySelectorAll<HTMLElement>('.page')) {
    face.style.removeProperty('--fit');
  }
  const stubborn = fitFaces(visibleFaces());
  if (stubborn.length) {
    const where = stubborn.map((f) => f.dataset.index ?? '?').join(', ');
    console.warn(`Stran ne gre na format tudi pri najmanjši pisavi: ${where}`);
  }
}

/**
 * Re-runs the staggered entrance of whatever is now face up.
 *
 * Only for changes that swap the whole spread at once, such as a jump from the
 * contents. A turn does its own revealing: the folded half carries the new
 * left page in plain sight from the first frame, so blanking it and rising it
 * back in reads as the page flickering.
 */
function reveal(delayMs: number): void {
  for (const face of visibleFaces()) {
    face.classList.remove('reveal');
    void face.offsetWidth;
    face.style.setProperty('--reveal-delay', `${delayMs}ms`);
    face.classList.add('reveal');
  }
}

/**
 * Keeps all but a handful of leaves out of the render tree. Every page is in
 * the DOM — 68 of them, each a full page of gradients and type — and a phone
 * pays for that on every frame it paints. Only the spread in view and its
 * immediate neighbours can ever be seen.
 */
const NEAR = 2;

function windowLeaves(): void {
  leaves.forEach((leaf, i) => leaf.classList.toggle('near', Math.abs(i - flipped) <= NEAR));
}

function applyZ(): void {
  const total = leaves.length;
  leaves.forEach((leaf, i) => {
    leaf.style.zIndex = String(leaf === lifting ? total + 2 : i < flipped ? i + 1 : total - i);
  });
}

function update(animate = true): void {
  leaves.forEach((leaf, i) => {
    leaf.classList.toggle('no-anim', !animate);
    leaf.classList.toggle('flipped', i < flipped);
  });
  windowLeaves();
  applyZ();
  const total = leaves.length;
  if (!animate) {
    // Force a reflow so re-enabling transitions doesn't animate this change.
    void leavesEl.offsetWidth;
    leaves.forEach((leaf) => leaf.classList.remove('no-anim'));
  }

  bookEl.classList.toggle('at-start', flipped === 0);
  bookEl.classList.toggle('at-end', flipped === total);
  prevBtn.disabled = flipped === 0;
  nextBtn.disabled = flipped === total;
  progressEl.style.width = `${(flipped / total) * 100}%`;

  fitFaces(visibleFaces());
  if (!foldLayer.classList.contains('folding')) reveal(0);


  const left = mode === 'spread' ? pages[flipped * 2 - 1] : undefined;
  const right = mode === 'spread' ? pages[flipped * 2] : pages[flipped];
  const shown = [left?.folio, right?.folio].filter((n): n is number => !!n);
  positionEl.textContent = shown.length ? `Stran ${shown.join('–')}` : '';
}

/**
 * Runs the crease across a leaf: the folded half moves into the fold layer for
 * the duration, the flat half stays put and is clipped. The resting state
 * (`.flipped`) is already set by `update()`, so when the fold ends the halves
 * go back against a matching picture — with transitions off for a frame, so
 * nothing animates back.
 */
function fold(leaf: HTMLElement | null, direction: 'forward' | 'back'): void {
  if (!leaf || stillness.matches || handset.matches) return;
  // Either way it is the back of the sheet that lies folded over; only the
  // direction the crease travels changes.
  const flap = leaf.querySelector<HTMLElement>('.face-back');
  if (!flap) return;

  const from = direction === 'forward' ? 1 : 0;
  flaps.set(leaf, flap);
  foldLayer.append(flap, el('div', 'fold-edge'), el('div', 'fold-crease'));

  // `--fold` goes on these two and not on the book: it inherits, and a value
  // changing on #book restyles all 68 pages on every frame of the turn.
  for (const host of [leaf, foldLayer]) {
    host.classList.add('folding');
    host.style.setProperty('--fold', String(from));
  }
  void leaf.offsetWidth;
  for (const host of [leaf, foldLayer]) {
    host.style.setProperty('--fold', String(1 - from));
  }
}

function unfold(leaf: HTMLElement): void {
  if (!leaf.classList.contains('folding')) return;
  const flap = flaps.get(leaf);
  leaf.classList.add('no-anim');
  for (const host of [leaf, foldLayer]) {
    host.classList.remove('folding');
    host.style.removeProperty('--fold');
  }
  // Back in place, and in its original order: front, then back.
  if (flap) leaf.append(flap);
  flaps.delete(leaf);
  foldLayer.textContent = '';
  void leaf.offsetWidth;
  leaf.classList.remove('no-anim');
}

function turn(delta: number): void {
  if (busy) return;
  const next = Math.min(Math.max(flipped + delta, 0), leaves.length);
  if (next === flipped) return;
  const leaf = leaves[delta > 0 ? flipped : next] ?? null;
  flipped = next;

  if (stillness.matches || handset.matches) {
    // Nothing is in flight, so there is nothing to wait for or lift — and the
    // tap should land at once rather than behind a hold.
    lifting = null;
    update(false);
    return;
  }

  // A fold still in flight goes home first. Its transition ends a frame or two
  // after the hold is released, and without this its flap would be cleared out
  // from under the new one — losing that leaf's back page for good.
  if (lifting) unfold(lifting);
  lifting = leaf;
  fold(leaf, delta > 0 ? 'forward' : 'back');
  // Hold until the page has landed, so only one leaf is ever in the air and
  // its z-index can't be handed to the next one mid-flight.
  busy = true;
  window.setTimeout(() => (busy = false), FLIP_MS);
  update();
}

function goToPage(pageIndex: number): void {
  for (const leaf of leaves) unfold(leaf);
  // The cancelled fold fires no transitionend, so release the lift here.
  lifting = null;
  // A jump supersedes the hold from a turn, but not the page still in the air:
  // that one keeps the top z-index until its own transition ends.
  busy = false;
  flipped = mode === 'spread' ? Math.ceil(pageIndex / 2) : pageIndex;
  update();
}

/* --------------------------------------------------------------- controls -- */

// Once a page has landed it belongs to its stack again.
foldLayer.addEventListener('transitionend', (event) => {
  if (event.propertyName !== '--fold' || event.target !== foldLayer) return;
  if (!foldLayer.classList.contains('folding')) return;
  if (lifting) unfold(lifting);
  lifting = null;
  applyZ();
});

prevBtn.addEventListener('click', () => turn(-1));
nextBtn.addEventListener('click', () => turn(1));

bookEl.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const tocLink = target.closest<HTMLElement>('.toc-link');
  if (tocLink) {
    goToPage(Number(tocLink.dataset.page));
    return;
  }
  if (target.closest('.illo')) return;
  const rect = bookEl.getBoundingClientRect();
  turn(event.clientX - rect.left > rect.width / 2 ? 1 : -1);
});

function tocOpen(): boolean {
  return tocPanel.classList.contains('open');
}

function setToc(open: boolean): void {
  tocPanel.classList.toggle('open', open);
  tocPanel.inert = !open;
  tocToggle.setAttribute('aria-expanded', String(open));
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setToc(false);
    return;
  }
  if (tocOpen()) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    turn(1);
  } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    turn(-1);
  } else if (event.key === 'Home') {
    goToPage(0);
  }
});

let touchX: number | null = null;
bookEl.addEventListener('touchstart', (event) => {
  touchX = event.changedTouches[0]!.clientX;
}, { passive: true });
bookEl.addEventListener('touchend', (event) => {
  if (touchX === null) return;
  const dx = event.changedTouches[0]!.clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 50) turn(dx < 0 ? 1 : -1);
});

tocToggle.addEventListener('click', () => setToc(!tocOpen()));
document.querySelector<HTMLButtonElement>('#toc-close')!.addEventListener('click', () => setToc(false));
tocPanel.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest<HTMLElement>('.toc-link');
  if (!link) return;
  goToPage(Number(link.dataset.page));
  setToc(false);
});

let resizeTimer = 0;
window.addEventListener('resize', () => {
  const next = modeForWidth();
  if (next === mode) {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(fitPages, 150);
    return;
  }
  const page = mode === 'spread' ? flipped * 2 : flipped;
  mode = next;
  flipped = mode === 'spread' ? Math.ceil(page / 2) : page;
  buildLeaves();
});

/* ------------------------------------------------------------------ start -- */

/* ------------------------------------------------------------------ skin -- */

const SKIN_KEY = 'tths-skin';

function setSkin(skin: string): void {
  document.documentElement.dataset.skin = skin;
  skinSelect.value = skin;
  try {
    localStorage.setItem(SKIN_KEY, skin);
  } catch {
    // Private mode: the look just won't be remembered.
  }
  // A skin can change the type, so what fits changes with it.
  requestAnimationFrame(fitPages);
}

skinSelect.addEventListener('change', () => setSkin(skinSelect.value));

let savedSkin = 'topla';
try {
  savedSkin = localStorage.getItem(SKIN_KEY) ?? 'topla';
} catch {
  // Ignore — fall back to the default look.
}
setSkin([...skinSelect.options].some((o) => o.value === savedSkin) ? savedSkin : 'topla');

document.fonts?.ready.then(fitPages);

document.title = bookTitle;
setToc(false);
tocList.append(renderToc());
buildLeaves();
