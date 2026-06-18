# skillnawayath — Brand Assets

Vector brand assets reconstructed from the original After Effects logo animation.
All SVGs are clean, hand-built vector geometry (not auto-traced) and resolution-independent.

## Origin

- **Source:** `source/skillnawayath - Brand.aep` (Adobe After Effects project, RIFX binary).
- **Reference render:** `source/skillnawayath - Logo.mp4` (3840×2160, 75 frames, 2.5 s) — the final
  resolved frame was used as ground truth for color, geometry, and the wordmark.
- The `.aep` references external assets (`skillnawayath - Logo.png/.mp4`) and is built from
  vector shape layers (`Shape Layer - Maroon/Blue/Red Spiral`, etc.) plus a text layer.

## The logo

A rounded-rectangle mark split by a clean **45° diagonal** (slope ≈ 1.0):
- **Maroon** fills the top-right, **indigo** the bottom-left.
- A thin diagonal **gap** between them is a true transparent knockout (works on any background).
- Below the mark sits the lowercase wordmark **"skillnawayath"**.

### Brand colors

| Role | Hex |
|------|-----|
| Maroon | `#842430` |
| Indigo | `#3b367a` |

(Measured from the rendered logo. Note: these differ from the placeholder favicon previously in
`assets/images/favicon.svg`, which used `#0D1A3D` / `#8C1515` — see "Site integration" below.)

### Typography

- Wordmark font: **Century Gothic** (confirmed from the `.aep` font table; `CoolTypeFont` entry).
- In the SVGs the wordmark is **converted to vector outlines** (from the installed `GOTHIC.TTF`),
  so the files are font-independent and render identically everywhere.

### Geometry (logo coordinate space, from the 4K frame)

- Mark bounding box: x `1776–2057` (w 281), y `880–1279` (h 399).
- Per-corner radii: top-left & bottom-right ≈ **29**; top-right & bottom-left ≈ **57**.
- Diagonal gap edges (measured): maroon lower `y = 1.0116x − 885.75`; indigo upper `y = 1.0108x − 830.44`.
- Wordmark baseline/scale fit to text bbox x `1462–2377`, y `1382–1516`.

### Verification

Each SVG was rendered (headless Chromium) and pixel-diffed against the original frame:
mark IoU ≈ **0.977** (maroon) / **0.976** (indigo); wordmark is exact (real font outlines).

## File inventory

### `logo/` — full lockup (mark + wordmark) and mark-only
| File | Description |
|------|-------------|
| `skillnawayath-logo.svg` | Full-color lockup |
| `skillnawayath-logo-white.svg` | All-white lockup — dark backgrounds |
| `skillnawayath-logo-black.svg` | All-black lockup — light backgrounds |
| `skillnawayath-mark.svg` | Color icon only |
| `skillnawayath-mark-white.svg` | White icon — dark backgrounds |
| `skillnawayath-mark-black.svg` | Black icon — light backgrounds |

### `favicon/` — web icons
Transparent mark (adapts to tab background):
- `favicon.svg`, `favicon.ico` (16/32/48), `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` (180, white bg)

Solid white rounded tile (app-icon style, strong contrast on busy/dark tab bars):
- `favicon-tile.svg`, `favicon-tile.ico` (16/32/48), `favicon-tile-512.png`, `favicon-tile-32x32.png`, `favicon-tile-16x16.png`

### `source/`
- `skillnawayath - Brand.aep` — original AE project (provenance)
- `skillnawayath - Logo.mp4` — reference render

## Usage

```html
<!-- Transparent favicon set -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

Pick the **white** logo/mark variants on dark backgrounds, **black** on light, or full-color where
there's room. The favicon `-tile` set is the app-icon alternative.

## Site integration (not yet wired in)

The live site (`index.html`) currently points at `/assets/images/favicon.svg`, which is a **placeholder**
(navy square + serif "S", wrong colors). To adopt the real brand:
1. Replace `assets/images/favicon.svg` with `brand/favicon/favicon.svg` (or the tile version).
2. Add the `.ico` / PNG / apple-touch links above to each page `<head>`.
3. Consider regenerating `assets/images/wordmark.png` and `og-image.png` from these vectors using the
   correct brand colors (`#842430` / `#3b367a`).
