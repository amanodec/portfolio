# Phase 10 technical evidence

Phase 10 hardens the approved Phase 9 runtime without introducing scenes,
content, signature effects or subjective visual changes.

## Review package

- [Technical report](./technical-report.md)
- [Runtime metrics](./runtime-metrics.json)
- [Asset inventory](./asset-inventory.json)
- [Representative captures](./captures/)
- [Frozen Phase 9 baseline](../phase-9/README.md)

The eight captures cover hero/contact at 1440×900, 1024×768, 390×844 and
320×568. They are objective change-detection evidence, not visual approval.

## Reproduce

```sh
npm ci --ignore-scripts
npm run typecheck
npm run lint
npm test
npm run qa
npm run build
npm run preview
```

Then inspect `#hero`, `#identity`, `#zestt`, `#skills`, `#experience`,
`#playground`, `#philosophy` and `#contact` in full/reduced effects and at the
representative viewport sizes above.

## Scope boundary

The browser evidence is Chrome lab evidence. It does not claim deployed field
Core Web Vitals, real-device thermal behavior, OS-level keyboard behavior,
Safari/WebKit parity or GPU/heap profiling beyond the available browser
telemetry. Phase 11 remains blocked until Aman approves Phase 10.
