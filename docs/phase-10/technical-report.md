# Phase 10 technical report

Date: 2026-08-03  
Status: Technically complete; pending Aman’s visual review  
Environment: macOS, Google Chrome headless through Playwright, Vite production preview at `127.0.0.1:4174`, DPR 1

## Outcome

Phase 10 added objective lifecycle, performance and failure-path hardening while
preserving the Phase 9-approved compositions. No new scene, content claim,
signature effect or art-direction system was added.

## Implementation changes

- `FrameLoop` now resets elapsed time after hidden-tab pauses, cancels pending
  frames while hidden, exposes lab metrics and supports passive frame observers.
- `PerformanceGovernor` records sustained missed-frame intervals and applies one
  bounded reduced-DPR renderer downgrade instead of oscillating between tiers.
- `DeviceTier` now reads the supplied window’s memory, CPU, save-data and pointer
  hints rather than relying on global navigator state.
- `Renderer` caches shader locations, caps reduced quality, disposes resources,
  and attempts one bounded WebGL context restoration before retaining the honest
  fallback.
- `AssetLoader` now has a timeout, pending-count tracking and complete abort
  listener cleanup; optional media does not retry after a settled failure.
- Effects-control listeners/subscriptions, contact reset timers/copy helpers,
  and the contact clock now clean up correctly. The contact clock runs only
  while its scene is active and the document is visible.
- Removed the duplicate legacy section observer from `script.js`; the typed
  `Navigation` observer remains the single navigation-state owner.

## Automated validation

| Check | Result |
|---|---|
| `npm ci --ignore-scripts` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS — 29/29 |
| `npm run qa` | PASS |
| `npm run build` | PASS |
| Phase 10 Playwright smoke | PASS — 10/10 on desktop and 10/10 on mobile |
| Phase 9 + previous smoke suites | PASS — complete suite 127/127 executed, 5 intentional skips; 132 total |

Phase 10 browser coverage includes axe at eight representative settled scene
boundaries, keyboard reachability for all seven contact controls, repeated
direct navigation and visibility events, optional-media failure/no-retry,
WebGL loss/fallback/recovery when the browser supports it, and stable effects
mode switching.

## Production-preview lab measurements

The complete raw dataset is in [runtime-metrics.json](./runtime-metrics.json).

- Initial critical shell: HTML 16.51 KB gzip, CSS 22.94 KB gzip, JS 24.92 KB
  gzip; CSS+JS 47.86 KB gzip.
- First contentful paint: 268 ms in the captured Chrome preview runs.
- Long tasks: 0 in all eight captures.
- Layout shift: 0 in all eight captures.
- Frame intervals: approximately 16.7 ms average and 16.8–17.7 ms maximum;
  the performance governor stayed `stable` at every capture.
- Canvas DPR: 1 in the test environment; the renderer remains tier-capped.
- Optional MOV: 18,774,227 bytes, not part of the initial critical request set;
  it is metadata-loaded only when the Zestt world enters and settles into the
  existing honest failure state when delayed or aborted.

## Accessibility and reliability evidence

- axe has no unreviewed violations at the representative settled boundaries.
- Keyboard focus reaches all seven contact fields, the effects control and the
  submit control.
- No-WebGL, reduced-effects, reduced-motion and no-JavaScript contracts remain
  covered by the prior suites and Phase 10 journeys.
- Page-hidden timing no longer carries a stale elapsed delta into the first
  resumed frame.
- Context loss enters the semantic fallback; restoration rebuilds the tiny
  renderer resource set once without replaying the scene.
- No uncaught errors were observed in the Phase 10 browser suite.

## Deviations and remaining limitations

- The 18.77 MB optional MOV remains available as supplied source media because
  this workspace has no local transcoder and no approved alternate media output.
  It is excluded from the initial critical request set and has an explicit
  failure/abort contract; transcoding remains a visible optimization risk.
- Heap values are browser telemetry samples, not a field memory guarantee;
  GPU-resource deltas, thermal behavior, real-device keyboard behavior and
  Safari/WebKit profiling remain unverified.
- LCP/INP/CLS values here are lab proxies. Deployed field p75 requires real
  traffic and is not claimed.
- Phase 10 has technical acceptance only. Visual fidelity and the decision to
  enter final choreography remain Aman’s review.
