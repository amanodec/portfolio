# Phase 0 baseline evidence

Captured 2026-08-02 from the unchanged static site through a local HTTP server at `http://127.0.0.1:4173/`.

## Viewport captures

| Viewport | Capture | Rendered viewport | Scroll height | Horizontal overflow |
|---|---|---:|---:|---:|
| Desktop | [1440 × 900](desktop-1440x900.png) | 1440 × 900 | 21,615 px | No |
| Desktop | [1280 × 800](desktop-1280x800.png) | 1280 × 800 | 20,442 px | No |
| Tablet | [1024 × 768](tablet-1024x768.png) | 1024 × 768 | 18,656 px | No |
| Tablet portrait | [834 × 1194](tablet-834x1194.png) | 834 × 1194 | 20,332 px | No |
| Tablet portrait | [768 × 1024](tablet-768x1024.png) | 768 × 1024 | 19,895 px | No |
| Mobile | [430 × 932](mobile-430x932.png) | 430 × 932 | 25,039 px | No |
| Mobile | [390 × 844](mobile-390x844.png) | 390 × 844 | 25,218 px | No |
| Mobile | [320 × 568](mobile-320x568.png) | 320 × 568 | 24,799 px | No |

Additional fallback captures:

- [Reduced motion, 1440 × 900](reduced-motion-1440x900.png)
- [JavaScript disabled, 1440 × 900](no-javascript-1440x900.png)

## Runtime notes

The machine-readable evidence is in [runtime.json](runtime.json). Every benchmark viewport returned HTTP 200 and produced zero uncaught page errors. The document width matched the viewport at every size.

The browser emitted expected console noise for the 22 missing Zestt media references, and the missing walkthrough video request was reported as an aborted request after its 404 fallback. These are asset gaps, not JavaScript exceptions. See [asset-matrix.md](../asset-matrix.md) and [link-checks.md](link-checks.md).

The 390 px capture exposes a current responsive risk: the large hero wordmark and summary are clipped at the right edge even though the body reports no horizontal overflow. This is baseline evidence for the redesign, not a Phase 0 implementation change.

## Manual interaction checks

Run through a CDP-connected headless Chrome session against the unchanged site:

- Mobile navigation opens, moves focus to the first menu link, and closes with Escape.
- Service tabs respond to ArrowRight and move focus to the selected tab.
- Empty contact submission focuses the first invalid field and announces the validation message.
- Reduced-motion media emulation matches `prefers-reduced-motion: reduce`.
- Supplied source recording metadata loaded as 15.55 seconds at 1090 × 1890.

## Reproduction

```bash
python3 -m http.server 4173
node qa.mjs
```

The screenshot pass used the locally installed Google Chrome headless binary. The in-app browser connector was unavailable in this environment, so the fallback was recorded here rather than treated as a visual approval.
