# External link checks

Checked 2026-08-02 with `curl -L`, preserving the URLs currently referenced by `index.html`. A 200 response confirms reachability at check time; it does not confirm ownership, claim accuracy, or permission to reuse media.

| URL | Result | Effective URL | Use in current site | Action |
|---|---:|---|---|---|
| `https://amansharma.dev` | 200 | `https://amansharma.dev/` | Canonical site / JSON-LD | Keep; owner confirms canonical source |
| `https://amansharma.dev/og-image.jpg` | 404 | unchanged | Open Graph image | Fix or replace before launch |
| `https://decisionarc.in` | 200 | `https://decisionarc.in/` | Project link | Owner confirms current project URL |
| `https://fonts.googleapis.com` | 404 | unchanged | Preconnect only | Harmless root response; stylesheet endpoint below is the meaningful check |
| Current Google Fonts stylesheet | 200 | unchanged | Remote font loading | Replace with approved self-hosted/licensed font plan later |
| Current Unsplash food image | 200 | unchanged | Decorative Zestt food image | Confirm rights/attribution or replace with approved local media |
| `https://tradingleagues.app` | 200 | `https://www.tradingleagues.app/` | Project link | Keep redirect recorded |
| `https://www.vinayakbikers.com` | 200 | unchanged | Project link | Owner confirms current project URL |
| `https://www.zestt.in` | 200 | `https://www.zestt.in/` | Product cover / preconnect | Keep as public product source; confirm media rights |
| Current Zestt Open Graph image | 200 | unchanged | Hero and case-study image | Replace with approved local capture for final build |
| Current Zestt sample menu | 200 | unchanged | Real product link | Keep as external product link; do not embed |
| `https://zestt.in` | 200 | `https://www.zestt.in/` | Product CTA | Keep redirect recorded |

The current page also references `schema.org` and an inline SVG data URL; these are metadata/markup references, not user-facing external destinations.
