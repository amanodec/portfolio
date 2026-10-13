# Aman Sharma — cinematic gallery portfolio

A light portfolio built around expressive typography, tactile artwork, real product footage, and restrained motion. The current direction is porcelain white, warm charcoal, and vermilion.

## Run locally

```sh
npm install
npm run dev
```

The default preview is http://127.0.0.1:4173. If another server is using that port, use `npm run dev -- --port 4174`.

## Build and check

```sh
npm run build
npm test
```

`npm test` checks TypeScript and runs the current gallery's desktop and mobile browser tests. The browser suite starts its own preview on port 4180. `npm run qa` also includes the production build.

The production output is `dist/`, ready for the existing Netlify workflow. There is no runtime dependency on third-party fonts, animation libraries, or remote image services.

## Active source

- `index.html`: accessible page content, project links, and dialogs.
- `src/styles/gallery.css`: the responsive layout, artwork, transitions, and reduced-motion rules.
- `src/gallery.ts`: pointer depth, sculpture rotation, modal and menu behavior, motion lab, clipboard action, and time display.
- `src/content/projects.ts`: retained factual project registry used by the project dialogs.
- `tests/gallery.smoke.spec.mjs`: current browser checks.

The earlier scene runtime, phase documents, and phase tests are retained as historical source. They are not loaded by the current page. The previous source-level test command is available as `npm run test:legacy`; its historical HTML contracts target the earlier design.

## Motion and accessibility

The page uses native scrolling. Decorative motion follows the system's reduced-motion setting and can also be paused from the header. Pointer depth is limited to devices with a fine pointer. Animation frames stop when there is nothing to update, and background sculpture animation pauses outside the viewport.

The menu traps focus and makes the page behind it inert. Native dialogs support Escape, backdrop dismissal, and focus return. The motion lab has normal keyboard-operable buttons. Email and project links work without JavaScript.

## Product assets

The Zestt project uses the optimized `assets/zestt/guest-walkthrough.mp4` and a locally generated JPEG poster. The poster is deferred until the project approaches the viewport; the video is requested only after an explicit play action.

The other project's graphic covers are labeled visual studies. They are not presented as product screenshots. Project descriptions avoid unsupported performance claims.

## Recovery copy

A snapshot of the source before this gallery makeover is saved at:

`backups/2026-10-13-before-gallery.tar.gz`

It excludes dependencies, build output, and Git metadata. Extract it into a separate empty folder to inspect or recover the prior version. The backup folder is ignored by Git.

## Validation

The gallery was reviewed visually in Chromium at desktop and phone sizes. The automated suite covers layout widths from 320 to 1920 pixels, dialog and menu keyboard behavior, motion preferences, the interactive lab, delayed video loading and playback, no-JavaScript reading, and WCAG A/AA checks through axe.

Browser checks passed: 17. One desktop-only run skips the menu test because that control is specific to compact screens. Automated checks supplement visual review; they do not certify accessibility across every assistive technology or browser.
