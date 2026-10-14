# Aman Sharma — cinematic gallery portfolio

A light portfolio built around expressive typography, tactile artwork, real product footage, and a scroll-driven composition: “between logic and feeling.” The current direction is porcelain white, warm charcoal, and vermilion.

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

`npm test` checks TypeScript, runs the motion unit tests, and runs the current gallery's desktop and mobile browser tests. `npm run test:motion` runs code-only physics, choreography, and SVG export checks (Node 22.18+). The browser suite starts its own preview on port 4180. `npm run qa` also includes the production build.

The production output is `dist/`, ready for the existing Netlify workflow. There is no runtime dependency on third-party fonts, animation libraries, or remote image services.

## Active source

- `index.html`: accessible page content, project links, and dialogs.
- `src/styles/gallery.css`: the responsive layout, artwork, transitions, and reduced-motion rules.
- `src/gallery.ts`: pointer depth, sculpture rotation, modal and menu behavior, motion lab, clipboard action, and time display.
- `src/motion/CompositionMotion.ts`: signature scroll sequence, letter composition, contextual cursor, and project depth, sharing the gallery’s on-demand frame loop.
- `src/motion/score.ts`: reversible, deterministic choreography with code-only tests in `tests/composition.test.mjs`.
- `src/styles/composition.css`: sculpture unfolding, kinetic typography, the pinned composition, and static motion fallbacks.
- `src/motion/CompositionLab.ts`: pointer and keyboard manipulation, coupled layout response, layer separation, gesture-aware reconstruction, and local SVG downloads.
- `src/motion/labPhysics.ts`, `src/motion/labPrint.ts`, and `src/styles/atelier.css`: the lab’s spring dynamics, print export, and responsive studio layout.
- `src/motion/DeveloperStory.ts`, `src/motion/developerScore.ts`, and `src/styles/developer.css`: the developer’s three-scene portrait, reversible choreography, detail comparison, and native experience index.
- `src/content/projects.ts`: retained factual project registry used by the project dialogs.
- `src/content/profile.ts`: skills, education, achievements, contact details, and profile links supplied in Aman’s résumé.
- `src/content/experience.ts`: résumé-based roles, dates, responsibilities, and outcomes.
- `tests/gallery.smoke.spec.mjs`: current browser checks.

The earlier scene runtime, phase documents, and phase tests are retained as historical source. They are not loaded by the current page. The previous source-level test command is available as `npm run test:legacy`; its historical HTML contracts target the earlier design.

## Motion and accessibility

The page uses native scrolling. Decorative motion follows the system's reduced-motion setting and can also be paused from the header. Pointer depth is limited to devices with a fine pointer. Animation frames stop when there is nothing to update, and background sculpture animation pauses outside the viewport.

The menu traps focus and makes the page behind it inert. Native dialogs support Escape, backdrop dismissal, and focus return. In the composition lab, drag or tap the headline and artwork; arrow keys move either object, Shift increases the step, Enter activates the control, and Escape undoes an active drag. The artwork separates into surface, image, and typography layers. Rebuilding remembers gesture direction and energy; mobile keeps a vertical arrangement. Reduced motion keeps direct manipulation and immediate reconstruction while removing inertia. A composition can be downloaded as a local, self-contained SVG. Email and project links work without JavaScript.

## Product assets

The developer section follows one illustrative interface through refinement, a product flow, and the Tylt ownership story. Its chapter links use native anchors; reduced motion switches between complete scene snapshots. Full experience, skills, education, and achievements are preserved in native `details` elements that work without JavaScript. The personal closing uses a typographic signature; no portrait photograph was available in the project.

The Zestt project uses the optimized `assets/zestt/guest-walkthrough.mp4` and a locally generated JPEG poster. The poster is deferred until the project approaches the viewport; the video is requested only after an explicit play action.

The other project's graphic covers are labeled visual studies. They are not presented as product screenshots. Project descriptions avoid unsupported performance claims.

The résumé supplied on 14 October 2026 updates the current employer to TLX Labs, adds Tylt leadership and merchant integration work, and updates Zestt to React, Next.js, TypeScript, Tailwind CSS, and Supabase. The page also includes the supplied education, achievements, and professional and competitive programming links. The source PDF is not served by the website.

## Recovery copy

A snapshot of the source before this gallery makeover is saved at:

`backups/2026-10-13-before-gallery.tar.gz`

It excludes dependencies, build output, and Git metadata. Extract it into a separate empty folder to inspect or recover the prior version. The backup folder is ignored by Git.

## Validation

The latest developer-section update was checked through TypeScript, a production build, and 22 code-only motion tests (`npm run test:motion`). The gallery browser tests were updated for the new developer story and lab but were not run. No browser or visual checks were run for this update, as requested. The browser validation below describes the earlier gallery baseline.

The gallery was reviewed visually in Chromium at desktop and phone sizes. The automated suite covers layout widths from 320 to 1920 pixels, dialog and menu keyboard behavior, motion preferences, the interactive lab, delayed video loading and playback, no-JavaScript reading, and WCAG A/AA checks through axe.

Browser checks passed: 17. One desktop-only run skips the menu test because that control is specific to compact screens. Automated checks supplement visual review; they do not certify accessibility across every assistive technology or browser.
