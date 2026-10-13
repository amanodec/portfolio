# Phase 0 asset matrix

Status: approved Phase 0 source and fallback contract for the Zestt-first direction. Production publication still requires the owning phase’s optimization and rights checks.

## Existing and current-runtime media

| Asset / source | Type | Availability | Authenticity / rights | Current use | Proposed fallback | Blocks |
|---|---|---|---|---|---|---|
| `assets/zestt/guest-walkthrough.mp4` | Local optimized MP4, 909,184 bytes | Available | Derived from supplied recording | Optional guest-experience video | Poster or CSS still; never block navigation on video | Video is requested only after explicit play action |
| `https://www.zestt.in/opengraph-image?...` | Remote product cover | Reachable, HTTP 200 on 2026-08-02 | Public product media; reuse rights/brand approval still required | Historical desktop hero and Zestt cover | Local approved Zestt still or procedural product treatment | Do not ship remotely; rights/localization check remains in Phase 1 |
| Current Unsplash food image | Remote stock photo | Reachable, HTTP 200 on 2026-08-02 | Third-party stock; current license/attribution not recorded | Current mobile hero and Zestt intro | Local texture/approved restaurant image | Must be rights-cleared or replaced |
| Google Fonts stylesheet | Remote CSS | Reachable, HTTP 200 on 2026-08-02 | Licensing/self-host permission not recorded | Outfit, Manrope, DM Mono, Instrument Serif | System fallbacks and approved self-hosted font files | Font choice and license decision |
| `assets/zestt/01-guest-menu.webp` through `09-walkthrough.*` | 22 historical capture slots | Missing | No authentic captures in repository | Current page renders honest fallbacks | Explicit labeled abstract plate or no media | Authentic capture set is deferred by owner approval |

## Approved main-page asset contract

### Zestt — maximum three assets, primary story

1. One approved guest-menu or item-detail frame from the supplied product.
2. One approved restaurant/service-board frame, only if authentic media is supplied.
3. One approved detail frame or system diagram; a diagram must be labeled as explanatory, not a product capture.

The supplied recording currently verifies only menu landing, item detail, and cart review. It does not verify restaurant service, admin, order success, or a shared order identifier. The main page must use the verified guest states as the product proof and treat the operations side as a clearly labeled explanatory abstraction; it must not imply unsupported states.

### Phase 0 asset defaults

- Keep the optimized `assets/zestt/guest-walkthrough.mp4` as the project's optional video asset.
- Do not preload video in the hero; request it only after explicit play action.
- Use a typography/procedural fallback if an approved still or excerpt is not ready.
- Do not use the historical 22-slot capture contract, payment visuals, or unverified restaurant/admin screenshots.

### Trading Leagues — minimum authentic contract

- One approved project or product frame showing the real visual language.
- One detail frame, recording, or owner-approved abstract score composition.
- If no authentic media is available, use the scoreboard world as a labeled decorative visualization and keep all product proof in DOM copy.

### DecisionArc — minimum authentic contract

- One approved responsive hero frame.
- One mobile/detail frame or owner-approved performance evidence artifact.
- Abstract path visualization is allowed only when labeled as an interpretation.

### Vinayak Bikers — minimum authentic contract

- One approved discovery/mobile frame.
- One search/result or structured-content evidence frame if privacy and claim source are clear.
- A road-ribbon visualization may be decorative, not proof of a ranking result.

### Rain Platforms, Superchat, and Fleapo

These belong to the experience scene, not the main project-world media contract. Minimum evidence is one owner-approved role/result artifact per employer or a clean typography-led timeline entry with no invented UI.

## Identity and typography decisions

| Decision | Current state | Recommendation | Owner input |
|---|---|---|---|
| Portrait-led vs typographic | No portrait asset in repository | Start typographic unless Aman supplies an approved portrait | Required |
| Expressive display face | Current site loads Outfit remotely; plan calls for a variable grotesk/condensed face | Select only after license and self-host permission are confirmed | Required |
| Body/UI face | Manrope is current remote face | Retain as candidate with local fallback | Confirm license/hosting |
| Technical metadata face | DM Mono is current remote face | Retain as candidate with local fallback | Confirm license/hosting |
| Reflective serif | Instrument Serif is restricted to editorial/Zestt use | Keep rare, never as global identity | Confirm license/hosting |

## Performance and loading contract

- Eager-load only the hero-critical local asset once approved.
- Defer every project asset until its scene is near the viewport.
- Do not autoplay more than one video; the supplied recording is optional and must have poster/caption fallback.
- Target the Phase 0 plan budget of approximately 1.5 MB for initial critical visual payload; the supplied 18.8 MB MOV is not a hero-critical download.
- Use one shared Signal/WebGL context later; no asset may require a second renderer.
- Record dimensions, rights, privacy, compression target, and fallback before a file enters `public/assets/`.
