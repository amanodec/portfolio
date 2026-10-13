# Phase 11 launch-candidate report

Date: 2026-08-03  
Status: technical audit complete; pending Aman’s final visual review and
launch decision.

## Candidate changes

- Removed the legacy proof ledger from `index.html` because its public metrics
  were unverified in the approved claim register.
- Reworded Rain Platforms performance evidence in
  `src/content/capabilities.ts` and its semantic markup to use conservative,
  non-numeric wording.
- Removed the now-unused counter animation path from `script.js`.
- Removed the ledger-only CSS from `style.css`.
- Added Phase 11 QA assertions so the removed public metrics and stale counter
  contract cannot return silently.

No new scene, project world, library, claim, media asset, replacement effect,
or ambitious visual system was added.

## Technical evidence

The candidate must be re-run from a clean install with:

```sh
npm ci --ignore-scripts
npm run typecheck
npm run lint
npm test
npm run qa
npm run build
npm run test:smoke -- --workers=1
```

Final candidate checks: `npm ci --ignore-scripts` PASS; typecheck PASS; lint
PASS; unit tests PASS (29/29); QA PASS; JavaScript syntax PASS; production
build PASS; and the complete Playwright suite PASS (127 passed, 5 intentional
skips; 132 total).

Final production bundle inventory: `dist/index.html` 74.06 KB / 16.26 KB
gzip, CSS 120.37 KB / 22.73 KB gzip, JS 94.12 KB / 24.72 KB gzip. CSS + JS
total 47.45 KB gzip, down from the Phase 10 candidate’s 47.86 KB gzip after
the ledger/counter removal.

## Remaining launch-review limits

- The in-app browser connector was unavailable in this agent environment, so
  the agent did not make a visual quality judgment or capture new review
  screenshots.
- No fresh-viewer sessions were run; the feedback record is intentionally
  empty rather than fabricated.
- Exact rendered scroll length and live Zestt percentage still need a browser
  capture across the approved desktop, tablet, mobile, and reduced-motion
  cuts.
- The Phase 0 link check still records `https://amansharma.dev/og-image.jpg`
  as 404 and the supplied 18.77 MB Zestt MOV remains metadata-only optional
  media. These are visible launch risks, not silently changed.
- Field Core Web Vitals, real-device thermal behavior, Safari/WebKit parity,
  external mail-client behavior, and GPU/heap deltas remain outside this lab.

## Final owner gate

The remaining decisions are subjective or require owner/fresh-viewer input:
effect keep/alter/remove choices, live narrative allocation, fresh-viewer
observations, and final launch approval. The candidate is not visually
approved or deployed.
