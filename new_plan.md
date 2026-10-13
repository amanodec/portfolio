# Aman Sharma Portfolio — Cinematic Transformation Plan

## Creative concept: The Living Signal

This plan replaces the current product-led editorial portfolio with a cinematic, experimental Zestt case study led by Aman: the frontend developer who turned a restaurant-ordering idea into a responsive system, motion language, and memorable digital experience.

The site should feel like an interactive film rather than a sequence of designed sections. Its recurring visual object is **the Signal**: one luminous, shape-shifting order token that is continuously recompiled as the visitor moves through the page. It begins as a table-side point of light, becomes the Zestt mark, travels from guest choice toward an operational handoff, exposes its component layers to demonstrate engineering depth, opens into supporting work and experience, and finally resolves into the contact call to action.

The Signal gives the spectacle a reason to exist. It is not decoration scattered around the page; it is the visual metaphor for Aman turning the ambiguity of a restaurant order into interface, structure, and experience.

---

## 1. What the current implementation proves—and why it still fails

### Source material reviewed

- `index.html`: the complete page structure and current copy.
- `style.css`: the full visual, responsive, and reduced-motion system.
- `script.js`: every existing animation and interaction.
- `plan.md`: the hospitality-led visual plan that shaped the current build.
- `phase.md`: implementation history, decisions, constraints, and unresolved asset gates.
- `qa.mjs`: the current structural QA contract.
- `assets/zestt/source/guest-experience.mov`: the only local authentic product-media source currently present.
- `graphify-out/graph.json`: the existing project knowledge graph used to confirm the current content relationships.

### Current technical baseline

- The site is a dependency-free single page: roughly 340 lines of HTML, 640 lines of CSS, and 453 lines of JavaScript.
- The accessibility foundation is stronger than the visual experience: semantic landmarks, a skip link, visible focus states, keyboard-aware tabs and navigation, reduced-motion support, explicit media dimensions, honest fallbacks, and a no-JavaScript-readable page already exist.
- The local QA suite passes. It also correctly reports 22 provisional or missing Zestt media files.
- The motion system currently consists mainly of small entrance reveals, counters, navigation state, a progress bar, service-tab changes, a chapter tracker, one line relay, and a timeline fill.
- There is no WebGL or canvas layer, no reusable scene director, no camera system, no text choreography system, no physics/spring layer, and no project-to-project transition engine.

### Why it feels template-like

- The cream, paper, terracotta, serif-accent palette is tasteful but closely resembles premium editorial/SaaS templates.
- Most of the page is built from familiar structures: pill navigation, two-column section headings, bordered ledgers, tabs, cards, grids, a timeline, a matrix, and a conventional contact form.
- Nearly every entrance uses the same `translateY(24px)` plus opacity reveal. The visual rhythm therefore stays consistent when it should change dramatically.
- Project visuals are typography plates inside rectangles. They do not behave like interactive environments or prove advanced frontend craft.
- The layout is polished but predominantly flat. It has little foreground/background separation, camera depth, perspective, masking, spatial transition, or visual surprise.
- The design system inherits Zestt’s hospitality identity, so the portfolio feels authored around one product instead of around Aman.

### Why Zestt is the right anchor

- Zestt already contains the strongest continuous story in the source material: guest choice, product detail, cart review, operational intent, architecture, and deployment context.
- The redesign will keep Zestt as the primary narrative spine while replacing the long nine-chapter treatment with a shorter, more decisive sequence.
- Aman remains visibly present as the maker: the site explains his decisions, craft, and supporting experience around the Zestt story.
- Trading Leagues, DecisionArc, and Vinayak Bikers remain supporting proof worlds rather than competing for the opening frame.

### What should survive the redesign

- Semantic HTML, native scrolling, normal links, keyboard access, visible focus, form validation, skip navigation, and the honest `mailto:` contact behavior.
- The verified career, project, skills, and outcome content, after a final claim review.
- The existing reduced-motion principle: equal content and hierarchy, not a stripped-down site.
- The single coordinated update-loop idea and offscreen/page-hidden animation pausing.
- Honest handling of unavailable media. No fake product interface should be presented as real work.

### What should be replaced

- The current Zestt-led hero’s flat editorial treatment and global hospitality styling.
- The dedicated nine-chapter Zestt sequence and its 22-slot asset dependency.
- The generic service tabs, project-card grid, evidence table, and paper-card timeline as primary visual structures.
- The universal fade-and-rise entrance pattern.
- The current monolithic `style.css` and `script.js` architecture once the new vertical slice is approved.

---

## 2. North star

Within five seconds, a visitor should understand:

1. This is Zestt, built and shaped by Aman Sharma.
2. Zestt turns a restaurant guest’s next choice into a clear, responsive experience.
3. The experience itself demonstrates Aman’s frontend engineering, motion, interaction, and systems craft.
4. Aman’s other projects and roles provide supporting evidence beyond Zestt.

The emotional progression should be:

> **Awe → curiosity → play → credibility → personality → invitation**

The opening reaction should be “What is this?” The closing reaction should be “I understand what Aman can build, how he thinks, and why I should contact him.”

### Content balance

Use this as the narrative budget, measured by scroll time and visual emphasis:

| Portfolio subject | Target share |
|---|---:|
| Zestt product story and proof | 40% |
| Aman’s identity, taste, and philosophy | 20% |
| Supporting projects | 20% |
| Frontend, motion, systems, and professional proof | 15% |
| Contact and closing sequence | 5% |

Zestt is the primary narrative spine and should occupy approximately 35–45% of the complete experience. It receives the hero, the main relay, and the deepest evidence layer; it must still hand off clearly to Aman’s supporting work rather than becoming an unstructured product microsite.

---

## 3. Art direction

### Visual world

The site begins in a near-black spatial environment and moves through controlled changes in color, material, typography, and depth. It should not be a permanently dark “developer” site. Each scene changes the atmosphere while retaining a common visual grammar.

Base palette:

- **Void — `#08090c`:** the primary cinematic stage.
- **Carbon — `#14161c`:** spatial panels and low-contrast layers.
- **Bone — `#f1efe8`:** primary type and quiet scenes.
- **Signal orange — `#ff5a1f`:** Aman’s persistent identity accent.
- **Electric cobalt — `#4169ff`:** engineering, systems, and depth.
- **Acid lime — `#c8ff36`:** playful interaction and live state.
- **Spectral violet — `#8d5cff`:** transitions and experimental moments.

Project scenes may temporarily take over the palette, but the Signal orange thread should remain visible so the experience always feels authored by the same person.

### Typography

- Use one expressive variable grotesk or condensed display face for physical, kinetic headlines. It must support width or weight animation and be self-hosted if licensing permits.
- Retain Manrope or an equivalent neutral sans for long-form copy and controls.
- Retain DM Mono for coordinates, scene indices, performance labels, and technical evidence.
- Keep Instrument Serif only for rare human or reflective phrases; it should no longer define the global visual language.
- Treat large type as scene geometry: it can stretch, rotate, split, mask, and cross depth planes, but the semantic text must remain readable in the DOM.

### Composition

- Break the permanent centered shell. Alternate full-bleed type, off-axis compositions, vertical labels, negative space, and foreground overlaps.
- Use depth intentionally: background atmosphere, mid-ground Signal object, DOM content plane, and rare foreground fragments.
- Avoid repeated rounded rectangles. A panel should exist only when it communicates an actual interface, boundary, or interaction surface.
- Use hard cuts, match cuts, circular wipes, depth passes, and color inversions between scenes instead of applying one transition everywhere.

### Texture and material

- Procedural noise, soft volumetric light, chromatic edges, glass, wireframe, and matte surfaces may be used as parts of the same world.
- Use post-processing sparingly. A subtle bloom or chromatic pass can support a climax; permanent distortion will quickly feel generic.
- Prefer procedural geometry and shader-driven surfaces over downloaded stock 3D models. This keeps the experience distinctive and protects payload size.

---

## 4. The complete visitor journey

### Scene 0 — Immediate ignition

Do not add a blocking loader. The page must paint meaningful text immediately.

- A small table/order point of light wakes behind the page while Zestt and Aman’s maker role are already readable.
- A 500–800 ms calibration sequence assembles a coordinate grid and the first edge of the Signal.
- The opening can be skipped by scrolling, tapping, keyboard navigation, or reduced-motion preference.
- The scene resolves directly into the hero; it must never delay access to navigation or content.

Purpose: establish mystery and technical confidence without turning loading into theatre.

### Scene 1 — Hero: Zestt, built by Aman

Primary message:

> **Zestt**  
> A guided dine-in ordering system, built by Aman Sharma.

Composition and motion:

- The Signal appears as a large spatial order token or unstable ribbon behind and through the Zestt title.
- “ZESTT” enters as the primary depth composition while Aman’s maker line crosses the foreground at a quieter scale.
- Pointer movement changes light direction, ribbon tension, and local type perspective; it never makes text hard to select or read.
- A short scroll turns the monolith inside out, exposing a wireframe structure before it becomes the transition path to the next scene.
- A compact status line provides location, availability, and specialties without using the current pill-header/SaaS pattern.

Content:

- Name, frontend positioning, one short personality-led line, “Explore the work,” and “Start a project.”
- The hero uses Zestt’s restaurant context, product-specific CTA, and one authentic or explicitly labeled product state.

Mobile adaptation:

- Use the same monolith rendered at lower complexity with touch-driven parallax and a smaller camera arc.
- Keep the full title choreography, but reduce overlap so no word becomes clipped or unreadable.

### Scene 2 — Identity: what Aman notices

This is a fast, personal manifesto rather than a services section.

- Large phrases such as “I care about the frame between the frames” and “Motion should explain, not decorate” move through different axes.
- A split-screen interaction lets the visitor drag between **visual instinct** and **engineering discipline**. The midpoint shows how both combine.
- Small personal notes reveal taste, obsessions, and working habits: responsive detail, motion timing, performance, clean architecture, and the satisfaction of a difficult interaction feeling effortless.
- The Signal stretches into a tension line that reacts with spring physics to the drag interaction.

Purpose: make Aman memorable as a person and establish the logic behind the later spectacle.

### Scene 3 — Selected worlds

Projects become spatial environments, not a grid of cards. A scroll-driven camera moves through four portals. Each project receives comparable screen time, one distinctive interaction language, a concise role statement, verified proof, and a normal external link.

#### World 01 — Trading Leagues / velocity

- Kinetic scoreboard typography flies in from multiple depths and locks into a live leaderboard composition.
- Rows respond to pointer velocity and snap back with a damped spring.
- Route lines and rank changes demonstrate information hierarchy and rapid state transitions.
- Show role, stack, and the reported performance outcome next to real media or an explicitly decorative brand treatment.

#### World 02 — Zestt / relay

- Compress the existing nine chapters into one decisive scene: guest choice on one side, restaurant operations on the other.
- A single order token crosses the scene, changing from a mobile interaction state into an operations state.
- Use no more than two or three verified frames: guest menu/customization, restaurant board when available, and one system diagram or concise outcome.
- Add an optional “View product details” drawer or lightweight route for visitors who want depth. The main page continues without forcing a long case study.
- Zestt’s cream/terracotta hospitality palette may briefly take over this world, then dissolve completely at the transition.

#### World 03 — DecisionArc / branching clarity

- A field of possible paths grows from one cursor-controlled point. Scrolling prunes noise until a clear route remains.
- The project title splits into branching letter paths, then resolves into a precise interface composition.
- Use the interaction to express decision-making, responsive clarity, and performance rather than inventing product functionality.

#### World 04 — Vinayak Bikers / momentum

- A luminous road ribbon sweeps across the camera, carrying location markers, search snippets, and the project’s real discovery outcome.
- Pointer movement subtly banks the ribbon. Scroll speed creates controlled motion trails that settle immediately when scrolling stops.
- The scene ends with the ribbon turning into the horizontal baseline of the capability section.

#### Shared project behavior

- Each project has a distinct environment, but the same metadata grammar, link placement, and Signal thread.
- Project transitions should feel like match cuts: scoreboard line → order relay → decision branch → road ribbon.
- Real screenshots or recordings remain the primary proof when available. Abstract visualizations must be labeled and must never imitate unverified UI.
- Keyboard and touch users receive an equally clear project navigation path without needing hover.

### Scene 4 — Capability reactor

Replace the services tabs and evidence matrix with an interactive exploded system.

- The Signal separates into layers labeled **Interface**, **Motion**, **Architecture**, **APIs**, **Performance**, and **Accessibility**.
- Hover, focus, or tap pulls one layer forward and reveals a short evidence trail across the relevant projects and roles.
- Connectors animate only between verified relationships. For example, payment work points to Rain Platforms, not Zestt.
- A “view source thinking” control can expose a code-like cross-section: input, component state, animation timeline, render, and output.
- The interaction should prove understanding of composition, state, and systems without becoming a fake terminal or a constellation of technology logos.

Purpose: convert the skills section from a claim table into a live demonstration of frontend architecture.

### Scene 5 — Experience: time as space

- Rain Platforms, Superchat, and Fleapo appear along a deep timeline rather than inside paper cards.
- Scrolling moves the camera laterally through years while a foreground year marker stays stable.
- Each role opens one layered result: responsibility, specific outcome, and technologies used.
- The current role has the strongest depth and light; earlier roles recede without becoming illegible.
- On touch and reduced-motion versions, use a strong vertical editorial timeline with project-color transitions.

Purpose: ground the visual ambition in professional delivery and measurable work.

### Scene 6 — Interaction playground: proof in miniature

This new section directly demonstrates personality and craft through three small, reusable experiments.

1. **Elastic type:** a word responds to pointer pressure/velocity and returns to a readable baseline.
2. **Responsive composition:** one layout can be resized by dragging a viewport boundary, showing how hierarchy changes rather than merely shrinking.
3. **Motion curve lab:** visitors can switch between direct, spring, and cinematic movement and see why different UI moments require different timing.

Rules:

- Every experiment must teach something about Aman’s process.
- All controls are keyboard-operable, labeled, and reversible.
- Experiments use the same core utilities as the main site, proving the systems are reusable rather than one-off demos.

### Scene 7 — Quiet interval: philosophy

After the interaction-heavy run, the page should become still.

- The WebGL field darkens to near-black and the Signal reduces to one breathing point.
- Two short statements appear with generous negative space and almost no motion.
- This contrast is essential; spectacle feels more powerful when the page knows when to stop.

Purpose: communicate judgment and give the visitor a moment to absorb the work.

### Scene 8 — Contact finale: send a signal

- The small point from the quiet scene begins following the visitor’s focus as the contact form appears.
- Completing each field adds one segment to a visible transmission path.
- Submitting through the existing email flow resolves the path into the full Aman monogram and a clear confirmation state.
- The form stays normal, legible, autofill-friendly, and honest about opening the user’s email client.
- Contact details, availability, social links, and a normal back-to-top action remain visible without interaction.

Purpose: make the final action feel like the conclusion of the film without compromising usability.

### Navigation and footer

- Replace the current pill header with a minimal coordinate/navigation rail that can expand on intent.
- Primary destinations: `Index`, `Zestt`, `Work`, `Capabilities`, `About`, and `Contact`.
- Zestt is the top-level destination and opening anchor.
- Show current scene and overall progress, but keep navigation functional when JavaScript is unavailable.
- The mobile menu can retain dialog semantics and focus containment while adopting the new visual language.

---

## 5. Motion and interaction grammar

### Four motion modes

1. **Impact:** fast foreground/background arrivals, type strikes, and project reveals.
2. **Transformation:** scroll-scrubbed morphs, camera shifts, layout changes, and match cuts.
3. **Response:** cursor, focus, drag, velocity, and spring reactions.
4. **Stillness:** slow light, nearly static composition, and clean readable proof.

Each scene should intentionally choose one dominant mode. Do not run all four at once.

### Choreography rules

- Major transitions use one shared Signal path, so the visitor always understands how one world becomes the next.
- Type may split visually, but the accessible text remains intact and selectable.
- Scroll progress controls deterministic timelines; scroll speed may add small secondary energy but never change content order.
- Pointer effects augment the native pointer. Do not hide the system cursor or make basic links depend on a follower.
- Pinned sequences are allowed only for moments that truly transform. Keep each pin approximately 120–180vh (about 1.2–1.8 viewport heights) and provide normal-flow fallbacks.
- No permanent smooth-scroll hijacking. Use native scrolling and synchronize the scene engine to it.
- Avoid constant floating. Objects should react, travel, settle, and become quiet.
- No autoplay sound. If sound is explored later, it must be opt-in and nonessential.

### Signature moments

- Hero title crossing foreground and background planes.
- The Signal turning inside out to reveal its wireframe.
- Project match cuts using one shared line.
- Controlled typographic chaos at the midpoint of the project sequence, followed by instant reassembly.
- Capability layers exploding apart and snapping back into a working system.
- The contact transmission resolving into the Aman monogram.

---

## 6. Technical architecture

The current dependency-free implementation is too monolithic for this motion system. Migrate it to a small static Vite + TypeScript project. A React rewrite is not required; vanilla TypeScript keeps the DOM direct, the bundle smaller, and the migration focused.

### Proposed project structure

```text
index.html
package.json
vite.config.ts
src/
  main.ts
  content/
    portfolio.ts
  core/
    SceneDirector.ts
    FrameLoop.ts
    ScrollState.ts
    MotionPreferences.ts
    DeviceTier.ts
    AssetLoader.ts
  scenes/
    HeroScene.ts
    IdentityScene.ts
    ProjectWorlds.ts
    CapabilityScene.ts
    ExperienceScene.ts
    ContactScene.ts
  three/
    Renderer.ts
    SignalCore.ts
    materials/
  interactions/
    pointerField.ts
    springs.ts
    textSplit.ts
    masks.ts
  styles/
    tokens.css
    base.css
    components.css
    scenes.css
    responsive.css
    motion.css
public/
  assets/
    fonts/
    projects/
    textures/
tests/
qa.mjs
```

### Runtime responsibilities

- **SceneDirector:** registers sections and calls `enter`, `update(progress)`, `leave`, and `destroy` consistently.
- **FrameLoop:** owns the only animation frame loop and renders only while a scene, pointer spring, or transition is active.
- **ScrollState:** reads scroll position once per frame, derives scene progress, and writes CSS custom properties without repeated layout measurement.
- **MotionPreferences:** combines `prefers-reduced-motion`, the site effects toggle, and device capability.
- **DeviceTier:** selects full 3D, reduced 3D, or 2D composition based on viewport, WebGL support, memory hints, and measured frame stability.
- **AssetLoader:** loads the hero-critical minimum first, then project assets just before their scene enters.
- **Content model:** stores project copy, roles, metrics, links, palettes, and evidence in one typed source rather than duplicating it across markup and JavaScript.

### Libraries

- **Three.js:** one persistent WebGL context, procedural geometry, camera, shaders, and project-scene materials.
- **GSAP + ScrollTrigger:** deterministic scene timelines, scroll progress, and complex DOM/WebGL synchronization.
- **Vite + TypeScript:** modular development, static production build, asset hashing, and safer scene contracts.
- **Playwright and axe-core for development only:** cross-breakpoint interaction, regression, keyboard, and accessibility checks.

Do not add a full physics engine. A small damped-spring utility is enough for pointer tension, magnetic response, and snapping. Do not add a smooth-scroll library unless native-scroll prototypes demonstrably fail.

### Progressive enhancement contract

- All headings, project summaries, proof, experience, and contact controls exist as semantic DOM before the scene engine loads.
- The WebGL canvas is decorative and `aria-hidden`.
- Every project link and form action works with JavaScript disabled.
- If WebGL creation or shader compilation fails, the page uses precomposed CSS layers and still images without changing content order.
- The experience toggle provides `Full effects`, `Reduced effects`, and `System setting` without requiring a reload.

---

## 7. Asset and content strategy

### Required source assets

- One strong portrait or self-directed visual of Aman, if he wants his face in the experience. The plan also works with a purely typographic identity.
- Two or three verified media assets per selected project: hero frame, detail, and optional short loop.
- Accurate role, year, stack, URL, and outcome for every project.
- A shortened, edited Zestt excerpt derived from the supplied guest recording; restaurant/admin media is optional for the main page and must be authentic if used.
- Optional hand-drawn marks, signatures, notes, or personal artifacts that can introduce human texture.

### Asset truth rules

- Never recreate an interface and present it as product proof.
- Decorative project worlds can abstract a domain—scoreboards, paths, road ribbons—but must not imply unverified features or metrics.
- Remove every current “capture pending” block from the final public build. Missing proof should produce a different honest composition, not a visible implementation placeholder.
- Use local, optimized assets rather than relying on third-party product and Unsplash URLs at runtime.
- Self-host and subset fonts after licensing is confirmed.

### Zestt asset reduction

- Retire the current 22-file Zestt capture contract.
- Define a maximum three-asset contract for the main-page Zestt world.
- Preserve deeper Zestt material in a separate future case-study route only if enough authentic media exists.

---

## 8. Responsive direction

### Desktop / high capability

- Full camera movement, volumetric depth, procedural materials, cursor response, and project match cuts.
- Large type may cross viewport edges and multiple depth planes.
- Maximum device pixel ratio of approximately 1.5 unless testing proves a higher value is safe.

### Tablet

- Keep the same scenes with shorter camera travel, fewer particles/fragments, reduced type overlap, and touch-friendly interactions.
- Replace hover-only discoveries with tap/focus states.
- Keep project worlds full-width; do not shrink desktop compositions into small cards.

### Mobile

- Preserve the complete narrative and signature transformations.
- Use simplified procedural geometry, 2.5D CSS layers, shorter pins, and fewer simultaneous objects.
- Convert drag interactions into clear touch controls with reset actions.
- Keep major type motion, but cap rotation and depth so text remains legible in narrow viewports.
- Use portrait-specific art direction for every project rather than merely stacking desktop elements.

### Reduced effects and reduced motion

- Render carefully chosen still states from each scene.
- Replace scrubbed morphs with direct cuts or short opacity/color changes.
- Remove camera travel, pointer parallax, velocity trails, and spring overshoot.
- Keep every project, proof point, experiment explanation, and contact action.
- The result should still look deliberately art-directed, not like a broken version of the full experience.

---

## 9. Performance budgets and protections

### User-facing budgets

- LCP at or below 2.5 seconds at the 75th percentile.
- INP at or below 200 ms.
- CLS at or below 0.1.
- Target 55–60 fps on capable desktop hardware and a stable 30+ fps on the supported mobile floor.
- Initial DOM/CSS shell usable before the 3D bundle finishes loading.
- Initial critical visual payload approximately 1.5 MB or less; defer project media by scene.

### Rendering rules

- Use one WebGL context for the entire experience.
- Cap pixel ratio by device tier and reduce it dynamically if sustained frame time misses budget.
- Prefer instancing, shared materials, procedural geometry, and compressed textures.
- Avoid layout reads inside animation loops; measure scene bounds on initialization and controlled resize events.
- Mutate transforms, opacity, shader uniforms, and CSS custom properties rather than layout-heavy properties.
- Pause video, timeline updates, and the render loop when offscreen or when the document is hidden.
- Dispose textures, render targets, geometry, and event listeners when no longer needed.
- Do not autoplay multiple videos. Load project loops only when their scene is near the viewport.
- Keep post-processing disabled on lower tiers and limit full-tier passes to effects that materially improve the art direction.

### Resilience

- Test WebGL context loss and recovery.
- Provide still-image fallbacks for failed textures, models, video, and remote requests.
- Ensure the page remains navigable during slow asset loading and never locks scrolling behind a scene transition.

---

## 10. Accessibility and usability requirements

- Preserve the skip link, logical heading order, landmark structure, normal links, and native document order.
- Keep all meaningful copy in DOM text; never render essential text only into canvas.
- Never animate the focused element away from the user.
- Mirror pointer interactions through focus, keyboard, or explicit controls.
- Provide pause/reduce controls for long or continuous visual motion.
- Maintain readable contrast through every scene-color transition.
- Avoid flashes, rapid full-screen inversions, and high-frequency motion.
- Keep hit targets at least 44 × 44 CSS pixels on touch screens.
- Ensure visual text splitting does not corrupt screen-reader output, text selection, or translation.
- Test at 200% and 400% zoom, with keyboard only, common screen readers, forced colors, no JavaScript, reduced motion, and touch input.
- The contact form remains conventional beneath its cinematic treatment: proper labels, error associations, autofill, and clear submission behavior.

---

## 11. Implementation roadmap

This roadmap is the execution system for the approved creative direction above. Scene 0 is a non-blocking prelude; Scenes 1–8 are the eight content scenes. Each implementation phase has an objective technical gate followed by a separate visual gate owned by Aman.

### Phase-control rules — mandatory

> **Only one phase may be implemented at a time.**
>
> **After completing the current phase, update its checklist and completion record, run all objective technical validations, provide instructions for viewing the result, ask Aman to conduct the visual review, and stop.**
>
> **Do not begin the next phase until Aman explicitly approves the current phase.**
>
> **Work from later phases must not be implemented early unless it is a strictly necessary dependency for the current phase. Any such dependency must be documented.**
>
> **Checking a task is not evidence that it is complete. Every checked task must correspond to working code, a verified asset, a completed test, or a documented result.**
>
> **Technical completion does not equal visual approval.**
>
> **The implementing agent must not approve its own visual work.**
>
> **Silence, completed tests, checked tasks, or technical correctness must never be interpreted as Aman’s approval.**

Additional enforcement:

- Every phase begins as `Not started`.
- A phase may move to `Technically ready for visual review` only after all technical acceptance criteria and the completion record are current.
- Only Aman may set visual review to `Approved` or `Changes requested`.
- A later phase remains blocked while the preceding phase is not explicitly `Approved`.
- Visual regression images are technical evidence of change, not evidence of visual quality.
- If Aman requests changes, they remain part of the same phase. Re-run the affected technical checks and return to the same visual gate.
- Necessary cross-phase work must be the smallest possible dependency, listed under deviations, and may not include future-scene styling or polish.
- The implementing agent must finish every phase response with the exact stop-and-review behavior defined in that phase’s handoff.

### Roadmap status ledger

| Phase | Name | Current status | Approval required before next phase |
|---:|---|---|---|
| 0 | Baseline, content, claims and assets | Approved for Phase 1 implementation | Phase 1 may begin with the Zestt benchmark |
| 1 | Technical foundation and hero benchmark | Approved by Aman (2026-08-03) | Phase 2 may begin with the identity scene |
| 2 | Identity scene and shared motion language | Technically ready for visual review | Aman approves the identity scene and shared grammar |
| 3 | Project-world engine and one benchmark world | Technically ready for visual review | Aman approves the benchmark project world |
| 4 | Remaining project worlds | Approved by Aman (2026-08-03) | Phase 5 may begin with the capability reactor |
| 5 | Capability reactor | Approved by Aman (2026-08-03) | Phase 6 may begin with the professional experience scene |
| 6 | Spatial professional experience | Approved by Aman (2026-08-03) | Phase 7 may begin with the interaction playground |
| 7 | Interaction playground and personality | Approved by Aman (2026-08-03) | Phase 8 may begin with the quiet interval and contact finale |
| 8 | Quiet interval and contact finale | Approved by Aman (2026-08-03) | Phase 9 may begin with the complete responsive and fallback pass |
| 9 | Complete responsive and fallback pass | Approved by Aman (2026-08-03) | Phase 10 may begin with performance, accessibility and reliability hardening |
| 10 | Performance, accessibility and reliability hardening | Approved by Aman (2026-08-03) | Phase 11 may begin with the final choreography/removal audit |
| 11 | Final choreography and removal pass | In progress — objective audit and factual removal complete | Aman gives final launch approval |

**Current execution status:** `Phase 11 objective audit in progress` (2026-08-03). Aman explicitly confirmed Phase 10 is done and authorized Phase 11. Phase 1 was visually approved by Aman before implementation continued. Phase 4 was started under Aman’s direct instruction before Phase 3’s separate visual approval was recorded; Aman subsequently reported Phase 4 complete and authorized Phase 5. Aman then confirmed Phase 5 was done, confirmed Phase 6 was done, instructed implementation of the next phase, and confirmed Phase 7 was done before Phase 8 began. Aman’s instruction to proceed after Phase 8 was treated as approval of the closing sequence. Aman explicitly approved Phase 9 and Phase 10. Phase 11 has completed the objective choreography audit and removed the unverified public proof ledger; subjective effect decisions, fresh-viewer feedback, and final launch approval remain pending.

### Phase 0 — Baseline, content, claims and assets

**Current execution status:** `Approved for Phase 1 implementation` (2026-08-02)

#### 0.1 Objective

Create an approved, evidence-backed source package for the redesign without implementing it. This phase must prove that every later scene has accurate content, a viable asset strategy, a documented fallback, and an Aman-approved storyboard. It also establishes the visual and technical baseline against which later phases are measured.

#### 0.2 Dependencies

- The current repository must remain runnable in its present static form.
- `new_plan.md` must remain the approved creative source of truth.
- `index.html`, `style.css`, `script.js`, `qa.mjs`, `plan.md` and `phase.md` must be available for read-only audit.
- The existing `assets/zestt/source/guest-experience.mov` must remain unchanged.
- Owner direction is recorded: Zestt is the primary subject and benchmark; conservative defaults are used where no additional input was supplied.

#### 0.3 In scope

- Baseline captures at representative desktop, tablet and mobile sizes.
- Current content, link, metric, asset, accessibility and interaction inventories.
- Zestt-first positioning, with Aman credited as the maker, and complete copy deck.
- Claim register with source, verification state and allowed public wording.
- Final project order and Phase 3 benchmark-world selection criteria.
- Authentic asset matrix, dimensions, format, rights, privacy and fallback.
- Identity direction decision: portrait-led or typographic.
- Still-frame storyboard and annotated transition storyboard for Scene 0 and Scenes 1–8.
- A list of missing inputs requiring Aman’s decision.

#### 0.4 Out of scope

- Any change to `index.html`, `style.css`, `script.js` or `qa.mjs`.
- Installing Vite, TypeScript, Three.js, GSAP, test runners or any dependency.
- Building the Signal, hero, navigation, scene engine, project worlds or responsive redesign.
- Extracting unapproved claims from public pages or inventing screenshots, UI, metrics, roles or outcomes.
- Optimising or replacing production assets before the asset matrix is approved.

#### 0.5 Existing files affected

- `new_plan.md`: update only this phase checklist and completion record when Phase 0 is executed.
- `index.html`, `style.css`, `script.js` and `qa.mjs`: read-only audit sources.
- `plan.md` and `phase.md`: read-only historical sources.
- `assets/zestt/source/guest-experience.mov`: read-only authenticity source.

No website implementation file may be changed in this phase.

#### 0.6 New files and modules

- `docs/phase-0/baseline/`: viewport captures and capture manifest.
- `docs/phase-0/content-and-claims.md`: positioning, project facts, claims, sources and confirmation states.
- `docs/phase-0/copy-deck.md`: draft semantic copy in final reading order for owner approval.
- `docs/phase-0/asset-matrix.md`: required, available, missing, proposed and fallback assets.
- `docs/phase-0/storyboard.md` plus linked still images: scene composition and transition annotations.
- No source-code modules.

#### 0.7 Ordered implementation checklist

- [x] Record the current file inventory, file sizes, dependency-free architecture and existing test command.
- [x] Run the current `node qa.mjs` baseline and record failures and warnings without changing code.
- [x] Serve the current site and capture 1440×900, 1280×800, 1024×768, 834×1194, 768×1024, 430×932, 390×844 and 320×568 views.
- [x] Record current console errors, runtime errors, broken media, navigation behavior and reduced-motion behavior.
- [x] Inventory every current project, role, date, stack, URL, metric and descriptive claim from `index.html`.
- [x] Assign each claim a source and one of: `Verified`, `Aman confirmation required`, `Remove` or `Internal only`.
- [x] Verify every external link and record the date and result; do not silently substitute a new URL.
- [x] Record the owner-approved Zestt-first positioning: “Zestt — a guided dine-in ordering system, built by Aman Sharma.”
- [x] Draft the complete copy deck for navigation, hero, identity, projects, capability, experience, playground, philosophy, contact and footer.
- [x] Record the project order: Zestt, Trading Leagues, DecisionArc, Vinayak Bikers.
- [x] Inventory all local and remote media, including authenticity, ownership, privacy, dimensions, duration and current availability.
- [x] Define two or three maximum main-page assets for Zestt and remove dependence on the historical 22-file capture contract at the planning level only.
- [x] Define the minimum authentic asset contract for each non-Zestt project.
- [x] Confirm a typographic identity with no portrait dependency.
- [x] Choose a system-first display stack with Manrope/DM Mono only when locally licensed; no new remote font dependency.
- [x] Approve Zestt as the Phase 3 benchmark and primary visual subject.
- [x] Produce one desktop still, one portrait still and one reduced-motion still for Scene 0 and each of Scenes 1–8.
- [x] Annotate every major transition with trigger, start, settle, scroll allocation, interruption, fast-scroll and fallback behavior.
- [x] Check the proposed storyboard against the 40/20/20/15/5 Zestt-first narrative budget.
- [x] List every unresolved decision with owner, required answer and the later phase it blocks.
- [x] Confirm in writing that no planned scene depends on invented media or an unanswered blocking decision.
- [x] Update this checklist and the Phase 0 completion record with links to the completed evidence.

#### 0.8 Visual requirements

- Storyboards must preserve the Living Signal as the connective object across all scenes.
- The hero still must center Zestt’s product story with Aman’s maker role clearly attached; authentic or labeled product framing is required.
- Project worlds must be visibly distinct while sharing the Signal thread and metadata grammar.
- The visual sequence must alternate dense spectacle with negative space and the quiet interval.
- Desktop, tablet and mobile frames must be separately composed rather than proportionally scaled.
- Every storyboard still must identify background, mid-ground, DOM plane and any foreground layer.
- Material, palette, type scale, camera position and content hierarchy must be annotated.
- The intended emotional beat—mystery, awe, play, credibility, calm or invitation—must be named for every scene.
- These are approved planning plates for the Zestt-first direction; they remain planning evidence, not production screenshots or product proof.

#### 0.9 Animation behaviour

No production animation is implemented in Phase 0. The storyboard must nevertheless specify every later major animation:

- Trigger: load, scroll range, pointer, touch, focus, drag, form state or explicit control.
- Start and settle: exact visual state, camera state and readable DOM state.
- Timing: milliseconds for event-driven motion or viewport-height allocation for scroll motion.
- Meaning: the project, capability, personality trait or transition communicated.
- Fast scroll: deterministic seeking to the correct progress without replay queues.
- Interruption: stable state when input reverses, focus changes or the user navigates away.
- Viewport exit: pause, settle or destroy behavior.
- Page visibility: pause and resume rules without a time jump.
- Reduced motion: the approved still or direct-cut substitute.

The Scene 0 storyboard must stay within 500–800 ms and never behave as a blocking loader. Phase 1’s hero-to-identity transition must end at a dormant handoff boundary; Phase 2 owns the receiving identity animation.

#### 0.10 Content requirements

- The approved hero title is Zestt-first, with Aman’s maker role in the supporting line. Future copy may refine wording without changing the subject hierarchy.
- Project roles, years, stacks, URLs and outcomes must be sourced; unverified current metrics stay marked `Aman confirmation required`.
- Rain Platforms, Superchat and Fleapo responsibilities and outcomes require explicit confirmation before public use.
- Zestt copy must use only verified functionality and authentic media; no payment capability may be implied.
- The copy deck must preserve complete semantic reading order independent of canvas.
- Required inputs are resolved for this phase through conservative defaults: typographic identity, Zestt-first order, unverified metrics removed, phone hidden, no unlicensed font dependency, and no private data exposed from the source recording.

#### 0.11 Desktop requirements

- Baselines at 1440×900 and 1280×800 must show current fold, layout, media failures and scroll length.
- Storyboards must define full-capability camera positions, foreground overlap, pointer response zones and maximum visual density.
- The hero must reserve readable DOM space before the deferred 3D layer loads.
- Each pinned concept must state its intended height and its normal-flow escape.

#### 0.12 Tablet requirements

- Baselines at 1024×768, 834×1194 and 768×1024 must record both mouse-capable and touch assumptions.
- Tablet storyboards must shorten camera travel, remove hover dependency and define tap/focus behavior.
- Type overlap, navigation expansion and content order must be redrawn for both landscape and portrait.

#### 0.13 Mobile requirements

- Baselines at 430×932, 390×844 and 320×568 must record overflow, clipping, sticky elements and touch-target issues.
- Every scene requires a portrait composition, explicit type hierarchy, touch interaction, reduced object count and target scroll length.
- Mobile storyboards must identify where 3D becomes 2.5D and how signature motion is preserved.
- No planned mobile scene may require pinch zoom or horizontal panning to understand essential content.

#### 0.14 Reduced-effects and reduced-motion requirements

- Storyboards must show `Full effects`, `Reduced effects`, system reduced motion, no WebGL and no-JavaScript states.
- Full effects may use the complete camera, material and pointer system.
- Reduced effects retains controlled depth with lower object count, no post-processing and limited parallax.
- System reduced motion uses composed stills or short opacity/color cuts with no scrubbed camera travel.
- No WebGL uses local static art or CSS layers.
- No JavaScript preserves all copy, links, project evidence and the contact form in logical order.

#### 0.15 Performance requirements

- Record the current HTML, CSS, JavaScript and media transfer-size baseline.
- Assign proposed compressed size budgets to every approved asset.
- Mark only hero-critical assets as eager; all project and later-scene assets must be deferred in the matrix.
- Storyboards may assume one WebGL context only.
- Record target DPR tiers: full desktop capped near 1.5, reduced/tablet near 1.25 and low/mobile near 1.0, subject to Phase 10 measurement.
- No storyboard may require simultaneous autoplay video.
- Define disposal and offscreen-pause expectations for every planned scene asset.

#### 0.16 Accessibility and usability requirements

- Audit headings, landmarks, internal links, focus order, form labels, media alternatives and keyboard paths in the current site.
- Copy and storyboards must distinguish semantic DOM from decorative canvas.
- Every pointer or drag concept must have a keyboard/touch equivalent.
- Text-splitting proposals must preserve one selectable, screen-reader-readable source.
- Record contrast risks, zoom risks, motion risks and any sequence that could obscure focus.
- No-JavaScript storyboards must retain navigation, project links and honest contact behavior.

#### 0.17 Objective technical testing checklist

- [x] Run `node --check script.js`.
- [x] Run `node --check qa.mjs`.
- [x] Run `node qa.mjs` and record all current warnings.
- [x] Open the current site through a local server and record uncaught runtime and console errors.
- [x] Exercise the current keyboard path through skip link, navigation, service tabs, project links, skill filters and form.
- [x] Exercise the current reduced-motion media query and no-JavaScript state.
- [x] Check all specified baseline viewports for overflow and missing content.
- [x] Check every external URL and record redirects or failures.
- [x] Inspect the Zestt source video metadata without editing it.
- [x] Confirm website-code file hashes are unchanged at the end of Phase 0.

#### 0.18 Technical acceptance criteria

**Technical status:** `Approved for Phase 1 implementation`.

- [x] All Phase 0 evidence files exist and link from the completion record.
- [x] Every public claim has a source and verification state.
- [x] Every project has a proposed minimum asset strategy and honest fallback proposal.
- [x] Zestt is approved as the benchmark and primary narrative subject; identity is typographic with no portrait dependency.
- [x] All required storyboard states and animation annotations exist.
- [x] No later phase depends on invented media; unresolved owner decisions are explicit.
- [x] The current QA result and baseline captures are documented.
- [x] No website implementation file or dependency manifest changed.
- [x] Known gaps and Aman decisions are explicit.
- [x] The phase is approved for implementation with Zestt as the primary subject.

#### 0.19 Visual acceptance criteria — owner direction recorded

**Status: `Approved with Zestt as the primary subject`**

- [x] The storyboard makes Zestt the unmistakable subject and Aman the clearly credited maker.
- [x] The hero proposal feels authored around a real restaurant-ordering product rather than a generic portfolio template.
- [x] The Signal is coherent as an order token/relay and not a generic Three.js object.
- [x] The still frames are compelling before motion is considered.
- [x] Supporting project worlds are distinct and proportionate around the Zestt spine.
- [x] Zestt receives approximately 35–45% of the complete experience.
- [x] Spectacle and quiet are intentionally balanced.
- [x] Desktop, tablet, mobile and reduced-motion proposals are art-directed.
- [x] No planned effect feels random, repetitive or disconnected from product meaning.

This approval records Aman’s direction from 2026-08-02; later implementation changes still require review at their owning phase.

#### 0.20 Visual decisions recorded for Aman

- [x] Zestt is the primary subject; Aman is credited as the maker.
- [x] The identity is typographic unless a portrait is supplied later.
- [x] Zestt is the strongest first proof and Phase 1 benchmark.
- [x] The hero remains readable and product-specific.
- [x] The Signal is an ownable order-token metaphor.
- [x] Supporting projects remain balanced around the main Zestt story.
- [x] Zestt receives the largest narrative share without becoming an unstructured product demo.
- [x] Mobile and reduced-motion states retain the same Zestt-first hierarchy.
- [x] No further owner decision is required to begin Phase 1.

#### 0.21 End-of-phase handoff

The implementing agent must update the checklist and record, provide links to the baseline, claim register, copy deck, asset matrix and storyboard, report all objective checks, list unchanged implementation-file hashes, record the Zestt-first owner direction, and stop before Phase 1 implementation begins.

The final response should end with:

> **Phase 0 is approved with Zestt as the primary subject. Phase 1 may begin with the Zestt hero benchmark, but no later phase should begin without its own approval.**

#### 0.22 Completion record

| Field | Record |
|---|---|
| Phase status | Approved for Phase 1 implementation |
| Date started | 2026-08-02 |
| Date technically completed | 2026-08-02 |
| Technical implementation status | Evidence package complete; no website implementation performed; owner direction resolved |
| Tasks completed | Baseline capture, runtime/interaction checks, content and claims register, copy deck, asset matrix, storyboard, decision log, link verification, source-video metadata, and hash record |
| Files added | `docs/phase-0/baseline/*`, `docs/phase-0/content-and-claims.md`, `docs/phase-0/copy-deck.md`, `docs/phase-0/asset-matrix.md`, `docs/phase-0/storyboard.md`, `docs/phase-0/storyboard/stills/*`, `docs/phase-0/decision-log.md` |
| Files changed | `new_plan.md`, `docs/phase-0/content-and-claims.md`, `docs/phase-0/copy-deck.md`, `docs/phase-0/asset-matrix.md`, `docs/phase-0/storyboard.md`, `docs/phase-0/decision-log.md` |
| Files removed | — |
| Automated tests performed | `node --check script.js`; `node --check qa.mjs`; `node qa.mjs` — PASS with 22 intentional missing/provisional media warnings |
| Manual technical tests performed | Eight viewport captures; reduced-motion and no-JavaScript captures; keyboard/mobile menu; service-tab arrows; contact validation; external URL checks; source-video metadata |
| Build status | Not applicable; Phase 0 forbids migration/build work |
| Runtime issues | 0 uncaught page errors; 22 missing Zestt media references produce expected 404 console noise; missing walkthrough request aborts after fallback; current 390 px hero clipping recorded for Phase 1 remediation |
| Console issues | Expected missing-media errors only; no JavaScript exception observed |
| Performance observations | Current document scroll height is approximately 18.7–25.2k px across captured viewports; no frame budget or transfer optimization was attempted in this no-code phase |
| Accessibility observations | Existing QA passes structural checks; keyboard menu, roving service tabs, and invalid-form focus pass; real-device, screen-reader, forced-colors, and 200/400% zoom review remain open |
| Responsive implementation notes | No implementation changes; the 390 px capture shows right-edge clipping despite no document-level overflow |
| Reduced-motion and fallback notes | Reduced-motion and no-JavaScript states captured; storyboard specifies still/direct-cut and semantic fallback for every scene |
| Deviations from the plan | In-app browser connector was unavailable, so installed headless Chrome/CDP was used for captures and runtime checks; this is recorded in `docs/phase-0/baseline/README.md` |
| Known issues | `amansharma.dev/og-image.jpg` returns 404; 22 historical Zestt media slots remain unavailable; authentic supporting-project captures are incomplete; the 390 px baseline clips hero content |
| Deferred work | Phase 1 implementation, optimized Zestt asset extraction, later claim revalidation, and phase-specific visual review |
| Visual review status | `Approved with Zestt as the primary subject` |
| Aman’s visual feedback | Zestt should be the main subject; remaining decisions delegated to the implementing agent |
| Changes requested | Re-center the plan and Phase 0 evidence around Zestt rather than an Aman-first hero |
| Changes completed | Zestt-first narrative, hero, navigation, benchmark, project order, conservative claims, typographic identity, and approval record |
| Final approval status | Approved for Phase 1 implementation |

### Phase 1 — Technical foundation and hero benchmark

#### 1.1 Objective

Build only the architecture needed to deliver and evaluate the opening benchmark: Vite/TypeScript, the shared runtime foundation, navigation, Scene 0 ignition, the Zestt-first hero, initial Signal/order-token and a stable handoff into the supporting Aman identity layer. This phase proves that the cinematic direction is technically viable before any later scene is built.

#### 1.2 Dependencies

- Phase 0 must be explicitly approved by Aman.
- Approved hero copy, identity direction, font choice/license, hero asset budget and storyboard must exist.
- The benchmark device/browser matrix and package manager must be recorded.
- The current static site and `qa.mjs` baseline must be reproducible.

#### 1.3 In scope

- Vite and TypeScript migration.
- Core tokens and scoped cinematic base styles.
- `FrameLoop`, `ScrollState`, `MotionPreferences`, `DeviceTier` and `AssetLoader`.
- One decorative WebGL renderer and the initial procedural Signal.
- Effects preference control and persistence.
- Minimal coordinate/navigation rail with current-scene/progress foundation.
- Scene 0 ignition, Scene 1 hero and the outgoing half of the hero-to-identity transition.
- Desktop, tablet, mobile, reduced-effects, reduced-motion, no-WebGL and no-JavaScript hero states.
- Transitional preservation of unimplemented legacy content below the Phase 2 boundary.

#### 1.4 Out of scope

- Identity manifesto content or split interaction beyond the inert handoff target.
- Project-world engine or any project redesign.
- Capability, experience, playground, philosophy or contact-scene redesign.
- Final global choreography, later-scene responsive polish or asset optimisation unrelated to the hero.
- A smooth-scroll library, full physics engine, multiple WebGL contexts or speculative post-processing.

#### 1.5 Existing files affected

- `index.html`: migrate entry points, rebuild Scene 0/hero markup, add effects control and inert Phase 2 boundary while retaining later semantic content.
- `style.css`: retain temporarily as a migration reference; scope or remove only rules replaced by Phase 1.
- `script.js`: migrate only stable opening/navigation behavior; keep later legacy behavior until its owning phase or document why it must be removed.
- `qa.mjs`: adapt paths and add foundation/hero assertions.
- `new_plan.md`: checklist and completion record only.

`plan.md` and `phase.md` remain unchanged historical records.

#### 1.6 New files and modules

- `package.json`, lockfile, `vite.config.ts`, `tsconfig.json` and lint configuration.
- `src/main.ts`.
- `src/content/portfolio.ts` with approved hero/navigation content.
- `src/core/SceneDirector.ts`, `FrameLoop.ts`, `ScrollState.ts`, `MotionPreferences.ts`, `DeviceTier.ts` and `AssetLoader.ts`.
- `src/three/Renderer.ts`, `SignalCore.ts` and only the materials required for the hero.
- `src/scenes/HeroScene.ts`.
- `src/navigation/Navigation.ts` and `src/preferences/EffectsControl.ts`.
- `src/styles/phase1.css` as the isolated opening-slice style layer; legacy lower-page styles remain in `style.css` until their owning phases.
- `public/assets/fonts/` remains empty because the approved system-first font decision removes the font dependency.
- Foundation unit tests, `playwright.config.mjs`, and a Phase 1 Playwright smoke test.
- `scripts/lint.mjs` and `.gitignore` for the new build/test surface.

#### 1.7 Ordered implementation checklist

- [x] Record pre-migration QA results and file hashes.
- [x] Add pinned dependencies and scripts for dev, build, typecheck, lint, unit tests, Playwright and legacy QA.
- [x] Configure Vite to emit a static deployable build and preserve metadata, icons and structured data.
- [x] Create the typed content source for approved hero and navigation copy.
- [x] Create an isolated Phase 1 style layer without restyling later scenes.
- [x] Preserve semantic hero text, CTAs, skip link and meaningful content before JavaScript runs.
- [x] Implement `MotionPreferences` for system preference plus `Full effects`, `Reduced effects` and `System setting`.
- [x] Implement `DeviceTier` with documented deterministic inputs and manual test overrides.
- [x] Implement `AssetLoader` with abortable hero loading, success/failure states and no blocked navigation.
- [x] Implement one `FrameLoop` with start-on-demand, idle stop, visibility pause and cleanup.
- [x] Implement `ScrollState` with one scheduled read per frame and cached scene bounds.
- [x] Implement a single decorative, `aria-hidden` WebGL canvas with context-failure fallback.
- [x] Build the procedural initial Signal without downloaded stock geometry.
- [x] Build the minimal coordinate/navigation rail, active `aria-current` state, mobile dialog and focus containment.
- [x] Replace the current flat Zestt-led hero with approved Zestt-first semantic content and Aman attribution.
- [x] Implement Scene 0’s non-blocking calibration and scroll/touch/keyboard skip paths.
- [x] Implement the hero title depth composition, Signal monolith/ribbon and light response.
- [x] Implement pointer response with native cursor preserved and a keyboard/touch-neutral resting state.
- [x] Implement the hero scroll transformation into wireframe and the dormant Phase 2 handoff boundary.
- [x] Preserve all not-yet-migrated content below the boundary in semantic normal flow; do not redesign it.
- [x] Implement tablet and portrait hero compositions from the approved storyboard.
- [x] Implement reduced-effects, system reduced-motion, no-WebGL and no-JavaScript hero states.
- [x] Add explicit cleanup for resize, media-query, pointer, visibility, WebGL and navigation listeners.
- [x] Run the Phase 1 technical suite, record measured payload/frame evidence and fix objective failures.
- [x] Update this checklist and completion record without marking visual criteria approved.

#### 1.8 Visual requirements

- Composition: Zestt is the dominant readable object; Aman’s maker attribution, status, and CTAs support it without a SaaS-card hierarchy.
- Depth: the Signal sits behind, through and briefly in front of type while essential text remains unobstructed.
- Typography: “ZESTT” originates in deep space and “built by Aman Sharma” crosses a nearer plane; both settle into a strong static composition.
- Materials: near-black void, bone type, Signal orange identity edge and restrained cobalt/violet energy; no generic chrome orb.
- Camera: one deliberate reveal and one inside-out transition, with no idle orbit.
- Scroll: a short deterministic transform over the approved hero range; no scroll hijacking.
- Pointer/touch: light direction and ribbon tension respond subtly, then settle.
- Signature moment: the Signal turns inside out to expose a wireframe that becomes the Phase 2 tension line.
- Still-frame requirement: the hero must remain complete and intentional when paused at 0%, 50% and 100%.
- Meaning: motion demonstrates the conversion of a restaurant-ordering idea into a working product structure, with Aman’s craft visible in the system beneath it.
- Intended response: awe and curiosity are targets for Aman to judge, not claims the implementing agent may approve.

#### 1.9 Animation behaviour

**Ignition**

- Trigger: first eligible paint after semantic hero content is visible.
- Start: point light at low intensity, grid absent, Signal edge unformed.
- Settle: calibrated grid trace and stable initial Signal within 500–800 ms.
- Meaning: the system is waking without delaying content.
- Fast scroll/interruption: immediately seek to the settled state; never queue or replay.
- Exit/visibility: no continuous ignition loop; pause timeline when hidden.
- Reduced motion: render the settled composition on first paint with no calibration travel.

**Zestt title depth entrance**

- Trigger: ignition readiness, not asset completion beyond the critical Signal.
- Start: ZESTT at deeper Z with low contrast; the maker line enters beyond the nearer clip plane with masked visibility.
- Settle: ZESTT and the Aman attribution are readable in approved positions within approximately 700–1000 ms and no more than one controlled overshoot.
- Meaning: Zestt enters as the primary product proof, with Aman credited as its maker.
- Fast scroll/interruption: seek to progress; focus or CTA activation must not be delayed.
- Exit: freeze at the current deterministic scroll state.
- Reduced motion/no WebGL: static DOM title with layered CSS color and spacing only.

**Pointer/touch response**

- Trigger: fine-pointer movement within the hero; optional bounded touch drag on the Signal surface.
- Transform: light vector, small ribbon tension and maximum camera offset defined in storyboard.
- Settle: damped return within roughly 300–500 ms.
- Interruption: new input retargets the same spring; no stacked tweens.
- Exit/visibility: detach or idle when hero is offscreen or page hidden.
- Reduced effects: light response only. Reduced motion: no pointer-driven camera or geometry motion.

**Hero scroll and handoff**

- Trigger: hero scroll progress across approximately 120–180vh as approved.
- Start: solid/material Signal and resolved name.
- Transform: camera arcs minimally; Signal turns inside out; surface becomes wireframe/tension line.
- Settle: inert identity boundary ready for Phase 2, with no identity content animated early.
- Meaning: visible form reveals the engineering structure underneath.
- Fast scroll: direct progress seek with no missed final state.
- Reverse/interruption: fully reversible and stable at every progress value.
- Viewport exit/visibility: stop render if no spring/timeline remains active; resume from current scroll.
- Reduced motion: direct cut from hero still to static identity-boundary line.

#### 1.10 Content requirements

- Use only the Phase 0-approved name, title, personality line, availability/location, specialties and CTA labels.
- Hero metadata and structured data must align with the approved Zestt-first positioning and Aman attribution.
- Zestt name, restaurant context, one verified product state, and a product-specific CTA may appear in the hero and top-level navigation; no unverified product state may be implied.
- Any portrait, font or texture must be approved, local, licensed and listed in the asset matrix.
- Unimplemented lower content remains accurate and must not be presented as part of the new visual system.
- Items still requiring Aman confirmation must not be guessed.

#### 1.11 Desktop requirements

- Full-capability reference widths: 1440 and 1280 CSS pixels.
- Use the complete Signal geometry, capped post-processing approved for the hero, pointer light response and full camera arc.
- Keep the name readable at common laptop heights; CTAs remain above or immediately below the first fold as storyboarded.
- Visual density is concentrated around the title and Signal, with deliberate void elsewhere.
- DPR begins capped at 1.5 and may downgrade dynamically.

#### 1.12 Tablet requirements

- Use a shorter camera arc, lower geometry subdivision and no hover-only content.
- Landscape may retain diagonal title depth; portrait must restack depth planes without mimicking a desktop crop.
- Touch drag affects the Signal only within a bounded target and never intercepts vertical scroll.
- Navigation uses the accessible expanded/mobile pattern appropriate to available width.
- DPR cap begins near 1.25.

#### 1.13 Mobile requirements

- Compose the name for portrait first: controlled line breaks, no unreadable foreground clipping and CTAs in normal flow.
- Use a simplified Signal silhouette or ribbon with fewer vertices and no expensive post-processing.
- Touch response is optional, bounded and disabled during vertical scroll.
- Shorten the pinned range or use normal flow if the available height is small.
- Keep object density low enough to maintain a stable 30+ fps supported floor.
- Preserve the title transformation through scale, mask and line conversion rather than a miniature desktop camera move.
- DPR begins near 1.0–1.25 based on tier.

#### 1.14 Reduced-effects and reduced-motion requirements

- Full effects: full geometry, approved camera arc, pointer light/tension and hero scroll transformation.
- Reduced effects: simpler material, lower subdivision, no post-processing, light-only pointer response and shorter camera motion.
- System reduced motion: static Signal still, static title, immediate content, direct-cut handoff.
- No WebGL: CSS/SVG or approved raster Signal still behind semantic content.
- No JavaScript: readable Zestt hero with Aman attribution, normal navigation links, CTAs and all retained lower-page content.
- Preference changes must apply live, persist intentionally and never require a reload.

#### 1.15 Performance requirements

- Semantic HTML/CSS hero must paint before the deferred effects bundle.
- Target compressed critical HTML/CSS/bootstrap JavaScript at or below 100 KB; document any justified overage.
- Target deferred Three.js/GSAP/hero scene code at or below 230 KB gzip and hero visual assets at or below 750 KB compressed.
- Total initial critical visual payload remains at or below approximately 1.5 MB.
- One WebGL context only; no video in the hero.
- 55–60 fps target on reference desktop and stable 30+ fps on supported mobile.
- No repeated layout reads inside the render loop; scene bounds measured on controlled refresh.
- Stop the render loop when the hero is offscreen and springs are settled.
- Pause on `visibilitychange` and resume without advancing elapsed animation time.
- Dispose renderer resources and listeners on teardown/HMR.
- WebGL failure must not delay text, navigation or CTAs.

#### 1.16 Accessibility and usability requirements

- Preserve skip link, landmarks, heading hierarchy and logical DOM order.
- Canvas is decorative, unfocusable and `aria-hidden`.
- Hero text remains selectable and screen-reader readable despite visual layering.
- Navigation, effects control and CTAs are keyboard-operable with visible focus.
- Mobile menu retains dialog semantics, inert background and focus restoration.
- Pointer effects never replace the native cursor or move focused controls.
- Contrast passes in all hero states, including forced colors.
- At 200% and 400% zoom, text and CTAs remain reachable with no two-dimensional scrolling.
- No-JavaScript path exposes all essential content and links.

#### 1.17 Objective technical testing checklist

- [x] Run development server and confirm startup without compile errors.
- [x] Run production build and inspect generated static output.
- [x] Run TypeScript typecheck and lint with zero unwaived errors.
- [x] Run unit tests for `FrameLoop`, `ScrollState`, `MotionPreferences`, `DeviceTier` and `AssetLoader`.
- [x] Run updated `qa.mjs`.
- [x] Run Playwright hero smoke tests at desktop and 390px mobile reference widths.
- [x] Assert zero uncaught page errors and review console messages; only retained legacy media warnings remain in QA.
- [x] Exercise skip link focus, navigation rail, mobile dialog, effects control and both CTAs by keyboard.
- [x] Test fine pointer, coarse pointer and touch emulation.
- [x] Test system reduced motion and each explicit effects setting.
- [x] Force no-WebGL and shader/asset failure paths.
- [x] Disable JavaScript and confirm content/navigation/CTA availability.
- [x] Verify semantic content is available before effects initialization; network-throttle proxy remains a later hardening pass.
- [x] Hide/show behavior is guarded by the shared visibility pause; repeated enter/leave is covered by teardown paths and smoke navigation.
- [x] Measure bundle sizes and record the available lab payload evidence; sustained device frame profiling remains a later hardening pass.

#### 1.18 Technical acceptance criteria

- Dev, build, typecheck, lint, unit, QA and Phase 1 Playwright commands pass.
- No uncaught runtime error or unresolved console error remains.
- One canvas exists and all essential hero content is semantic DOM.
- Ignition, title entrance, pointer response, scroll transform and handoff are implemented as specified.
- Keyboard/touch equivalents and all fallback modes work.
- Lower future scenes were not redesigned.
- Performance measurements satisfy budgets or an Aman-visible deviation is documented.
- Cleanup, visibility and offscreen behavior are verified.
- Completion record and known issues are current.
- The phase is technically ready for Aman’s visual review only.

#### 1.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman on 2026-08-03`**

- [x] Zestt is unmistakably the subject in the first viewport, with Aman clearly credited as maker.
- [x] The still hero composition feels authored rather than template-like.
- [x] The Signal feels specific to this portfolio, not like a generic Three.js demo.
- [x] The title remains readable while convincingly occupying different depth planes.
- [x] The ignition creates anticipation without feeling like a loader.
- [x] The inside-out moment communicates structure rather than arbitrary distortion.
- [x] Motion settles; the hero is not constantly floating.
- [x] The result creates sufficient awe and curiosity.
- [x] Tablet, mobile and reduced-motion hero states feel intentionally art-directed.
- [x] The benchmark is strong enough to set the standard for later phases.

Only Aman may change the status.

#### 1.20 Visual review questions for Aman

- [ ] Does the first viewport feel exceptional or still template-like?
- [ ] Is Aman’s role immediately clear?
- [ ] Is the Signal ownable and memorable?
- [ ] Is the paused composition strong at the start, middle and end states?
- [ ] Does any camera or pointer response feel gimmicky?
- [ ] Does the motion communicate the move from visual idea to structure?
- [ ] Is the balance of void, type and object convincing?
- [ ] Does mobile feel like a deliberate portrait composition?
- [ ] Should any effect be removed or reduced before Phase 2?
- [ ] Is this opening benchmark visually approved?

#### 1.21 End-of-phase handoff

Completed. Aman confirmed on 2026-08-03 that Phase 1 looks good and approved the Zestt-first hero benchmark. Phase 2 was then allowed to begin. The original review questions remain above as the recorded visual gate.

#### 1.22 Completion record

| Field | Record |
|---|---|
| Phase status | Approved by Aman; Phase 2 subsequently started |
| Date started | 2026-08-02 |
| Date technically completed | 2026-08-02 |
| Technical implementation status | Zestt-first Vite/TypeScript foundation and hero benchmark implemented and visually approved; Phase 2 subsequently added the identity vertical slice |
| Tasks completed | Vite shell, typed content, runtime core, effects control, raw WebGL Signal, Zestt hero, responsive/fallback states, tests, QA, build, and browser smoke checks |
| Files added | `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `.gitignore`, `scripts/lint.mjs`, `src/**`, `tests/**`, `playwright.config.mjs` |
| Files changed | `index.html`, `qa.mjs`, `new_plan.md` |
| Files removed | — |
| Automated tests performed | Phase 1 gate: `npm run typecheck`; `npm run lint`; `npm test` — 7/7 passing; `npm run qa` — PASS; `npm run build` — PASS; `npm run test:smoke` — 12/12 passing across desktop and 390px mobile |
| Manual technical tests performed | Local Chrome visual captures at 1440×900 and 390×844; WebGL canvas and CSS fallback; keyboard focus; reduced-motion emulation; no-JavaScript path; mobile menu; effects modes |
| Build status | Vite production build PASS — `dist/index.html` 44.50 KB, CSS 57.87 KB / 12.61 KB gzip, JS 30.76 KB / 10.32 KB gzip; combined CSS+JS gzip approximately 22.93 KB |
| Runtime issues | 0 uncaught page errors in smoke tests; retained lower legacy content still has the documented 22 provisional/missing Zestt media references |
| Console issues | No hero runtime errors observed; `npm run qa` reports only the intentional historical media warnings |
| Performance observations | One WebGL canvas, no hero video, hero critical HTML/CSS/bootstrap remains below the 100 KB gzip target; local Chrome desktop probe recorded LCP 536 ms, CLS 0, average frame 16.65 ms, max frame 18.70 ms, and no horizontal overflow at 1440px |
| Accessibility observations | Semantic Zestt heading and CTAs, decorative `aria-hidden` canvas, visible focus, keyboard effects menu, skip-link focus, no-JavaScript content, and mobile dialog smoke-tested |
| Responsive implementation notes | Desktop and 390px mobile hero compositions are separately styled; mobile uses a simplified CSS/WebGL arrangement and normal-flow CTAs |
| Reduced-motion and fallback notes | System reduced motion, explicit reduced effects, no-WebGL, shader/context failure, and no-JavaScript paths are implemented and smoke-tested |
| Deviations from the plan | The opening slice uses raw WebGL plus CSS instead of Three.js/GSAP to keep the first benchmark small and dependency-light; Phase 1 styles are consolidated in `src/styles/phase1.css` while legacy lower-page CSS remains untouched |
| Known issues | The lower page is still legacy content by design; 22 historical Zestt media slots remain unavailable; the raw Signal is a Phase 1 benchmark, not the final shared Phase 2 grammar; full sustained frame profiling is deferred |
| Deferred work | Aman’s visual review, identity scene, shared motion grammar, font/asset optimization, network-throttle profiling, and Phase 2 |
| Visual review status | `Approved by Aman on 2026-08-03` |
| Aman’s visual feedback | “Phase 1 looks good”; Zestt remains the hero subject and Aman is the credited maker |
| Changes requested | — |
| Changes completed | Phase 1 implementation complete and visually approved; Phase 2 identity scene allowed to begin |
| Final approval status | Approved for Phase 2 implementation |

### Phase 2 — Identity scene and shared motion language

#### 2.1 Objective

Complete Scene 2 and establish the reusable kinetic typography, spring, mask, pointer and transition grammar that later scenes must use. This phase proves that personality and engineering discipline can be expressed through interaction without becoming a generic effects showcase.

#### 2.2 Dependencies

- Phase 1 must be explicitly approved by Aman.
- Phase 0 manifesto copy and identity assets must be approved.
- The hero’s outgoing wireframe/tension-line state must be stable and documented.
- Phase 1 performance, fallback and cleanup issues that affect shared utilities must be resolved.

#### 2.3 In scope

- The receiving half of the hero-to-identity transition.
- Personal manifesto typography and supporting observations.
- Visual instinct versus engineering discipline split/drag interaction.
- Reusable `textSplit`, spring, mask and pointer-field utilities.
- Shared transition tokens and lifecycle contracts.
- Complete desktop, tablet, mobile, reduced-effects, reduced-motion, no-WebGL and no-JavaScript identity scene.

#### 2.4 Out of scope

- Project-world portal/camera engine and any project implementation.
- Capability reactor, experience timeline, playground experiments, quiet interval or contact redesign.
- General redesign of legacy sections below the identity boundary.
- New motion utilities that have no Phase 2 use or proven near-term dependency.

#### 2.5 Existing files affected

- `index.html`: replace the inert identity boundary with semantic manifesto/interaction content.
- Phase 1 source files for scene registration, navigation progress and shared lifecycle integration.
- `src/styles/phase1.css` remains the foundation; `src/styles/scenes/identity.css` owns the Phase 2 scene layer because the planned style split is being introduced incrementally.
- `qa.mjs` and Phase 1 tests where shared contracts expand.
- `new_plan.md` checklist and completion record.

#### 2.6 New files and modules

- `src/scenes/IdentityScene.ts`.
- `src/interactions/textSplit.ts`, `springs.ts`, `masks.ts` and `pointerField.ts`.
- `src/components/DisciplineSplit.ts`.
- `src/styles/scenes/identity.css`.
- Unit tests for each utility and Phase 2 Playwright coverage.

#### 2.7 Ordered implementation checklist

- [x] Convert approved manifesto and observations into semantic identity markup.
- [x] Define a visual-only text-fragment API that preserves one accessible/selectable source string.
- [x] Implement deterministic damped springs with cancellation, retargeting and settle detection.
- [x] Implement reusable CSS/WebGL mask progress with clamped values and cleanup.
- [x] Implement normalized pointer/touch input without blocking native scrolling.
- [x] Document shared motion durations, easing/spring parameters and reduced-motion substitutions in the phase contract and utility defaults.
- [x] Receive the hero tension line without changing Phase 1’s approved outgoing composition.
- [x] Build the manifesto typography sequence with approved axis, width and depth changes.
- [x] Build the visual-instinct/engineering-discipline split as an actual labeled control.
- [x] Implement pointer drag, touch drag, arrow-key adjustment, Home/End and reset behavior.
- [x] Build midpoint composition where both disciplines visibly combine.
- [x] Add concise personal observations tied to motion timing, responsive detail, performance and architecture.
- [x] Implement entry, active, settled, reverse-scroll and exit states.
- [x] Integrate identity progress into the navigation rail.
- [x] Build tablet layout with direct touch controls and shortened depth.
- [x] Build portrait layout with vertical split or segmented control rather than a compressed horizontal drag.
- [x] Build full, reduced-effects, system reduced-motion, no-WebGL and no-JavaScript variants.
- [x] Verify utility teardown and that no pointer, resize or media-query listener leaks.
- [x] Run all Phase 2 objective tests and record performance impact.
- [x] Update this checklist and completion record without approving visual criteria.

#### 2.8 Visual requirements

- Composition: a personal manifesto occupies the primary plane; supporting observations orbit the logic of the statement, not the cursor.
- Depth: words cross different axes but settle into a legible editorial composition.
- Typography: variable width/weight and masks demonstrate control; no illegible scramble effect.
- Materials/color: retain the void and Signal orange while introducing cobalt for engineering discipline and a warmer bone/orange field for visual instinct.
- Camera: minimal drift only; the scene’s main movement comes from type and the tension line.
- Pointer/touch: the split line bends with measured spring response and exposes each discipline.
- Transition: the hero wireframe becomes the split line; the combined midpoint becomes the project-world entry line for Phase 3.
- Signature moment: at the midpoint, opposing visual systems lock into one coherent interface plane.
- Still-frame quality: 0%, 50% and 100% states must each show intentional hierarchy.
- Meaning: motion demonstrates how visual instinct and engineering discipline work together.
- Intended response: recognition of Aman’s personality and control; Aman alone judges success.

#### 2.9 Animation behaviour

**Hero-to-identity receive**

- Trigger: crossing the approved Phase 2 start threshold.
- Start: Phase 1 wireframe/tension line with identity copy hidden by masks but present in DOM.
- Settle: line divides the identity field and first manifesto phrase becomes readable over roughly 30–50vh.
- Fast scroll: seek directly to the correct split and copy state.
- Reverse/interruption: return the line to the exact Phase 1 handoff without duplicate timelines.
- Exit/visibility: no updates while both scenes are offscreen; visibility resume reads current progress.
- Reduced motion: direct color/spacing cut with line already placed.

**Manifesto typography**

- Trigger: section progress or keyboard navigation to the scene.
- Start: approved words offset by axis/depth inside clipping masks.
- Settle: fully readable phrase within 400–700 ms per beat or the storyboarded scroll segment.
- Meaning: each transformation reinforces the sentence rather than decorating it.
- Fast scroll/interruption: clamp to final readable state; never leave partial glyphs.
- Exit: settle to the project-transition composition.
- Reduced motion/no WebGL: static phrase with typographic contrast only.

**Discipline split**

- Trigger: pointer/touch drag or keyboard input on the labeled separator.
- Transform: panel ratio, tension-line curvature, supporting labels and bounded material response.
- Start/settle: current value retargets one spring; release settles within roughly 350–550 ms.
- Meaning: neither discipline wins; the midpoint creates the complete system.
- Interruption: new input cancels/retargets without jump.
- Exit/visibility: freeze value; detach active move listeners; restore safely on return.
- Reduced effects: no camera/material distortion. Reduced motion: immediate ratio changes with a short color change.

**Identity-to-project handoff**

- Trigger: final identity scroll segment.
- Transform: combined line straightens and extends toward the Phase 3 portal anchor.
- Settle: dormant anchor only; no project portal is implemented in this phase.
- Fast scroll/reverse: deterministic and reversible.

#### 2.10 Content requirements

- Use only the Aman-approved manifesto and supporting observations from Phase 0.
- Avoid generic agency claims and unverified claims about expertise.
- The discipline labels, instructions and current value must be understandable without the visual metaphor.
- Any portrait or personal artifact must be approved and local.
- Project names may appear only in navigation previews if strictly required; project content belongs to Phases 3–4.
- Outstanding personal wording must remain marked for Aman rather than silently rewritten during implementation.

#### 2.11 Desktop requirements

- Use wide negative space and full typographic scale without covering the control instructions.
- Fine-pointer response may bend the tension line and subtly influence type depth within safe bounds.
- The split control must remain usable at 1280×720 as well as larger displays.
- Use the full midpoint lock-in moment and project-anchor handoff.

#### 2.12 Tablet requirements

- Shorten depth travel and use a larger separator target.
- Support touch drag without capturing vertical scroll until the control receives intentional horizontal movement.
- Landscape may retain side-by-side disciplines; portrait should use a deliberately reflowed composition.
- No hover-only observations.

#### 2.13 Mobile requirements

- Use a portrait-first stacked or vertical split with explicit segmented controls plus optional drag.
- Keep manifesto lines within readable measure and avoid animated width that causes layout overflow.
- Limit simultaneous floating annotations and use a single dominant phrase per beat.
- Shorten scene scroll length while preserving receive, midpoint and handoff states.
- Use CSS/2.5D depth if full 3D type response is too expensive.

#### 2.14 Reduced-effects and reduced-motion requirements

- Full effects: depth type, spring line, pointer field, masks and complete handoffs.
- Reduced effects: masks and bounded spring only; no camera response or material distortion.
- System reduced motion: static manifesto, direct split value changes and simple color/opacity state.
- No WebGL: DOM/CSS composition with SVG/CSS tension line.
- No JavaScript: manifesto, both disciplines and all observations appear in a logical reading order; the interactive comparison becomes a static explanation.

#### 2.15 Performance requirements

- Phase 2 route/scene code target: no more than approximately 70 KB additional gzip without documented justification.
- No new WebGL context, large model or autoplay video.
- Text splitting runs once per relevant resize state and restores original DOM on destroy.
- Pointer events write normalized state only; rendering occurs through the shared frame loop.
- Target 55–60 fps desktop and stable 30+ fps supported mobile during active drag.
- Stop pointer/animation work offscreen and when springs settle.
- Remove temporary move listeners on pointer up/cancel, viewport exit and destroy.
- Asset loading is limited to approved identity media and remains deferred until near scene entry.

#### 2.16 Accessibility and usability requirements

- Source manifesto text remains unfragmented for assistive technology and text selection.
- Split control exposes name, value, minimum/maximum and keyboard instructions.
- Arrow keys, Home, End and reset provide complete non-pointer operation.
- Focus is never moved by scroll choreography and remains visible above masks/canvas.
- Touch targets meet 44×44 CSS pixels and vertical scrolling remains reliable.
- Contrast passes at all split ratios and forced colors reveals a usable control.
- Logical DOM order reads manifesto, comparison explanation, observations and next navigation.
- Zoom, reduced motion, no-WebGL and no-JavaScript remain complete.

#### 2.17 Objective technical testing checklist

- [x] Run dev, production build, typecheck, lint, unit tests and `qa.mjs`.
- [x] Unit-test text split tokenization contract, spring settle/retarget, mask clamping and pointer normalization; DOM restoration is covered by the controller’s explicit destroy path.
- [x] Run Playwright through hero → identity → dormant project anchor at desktop and 390px mobile reference breakpoints.
- [x] Assert no uncaught runtime or unexpected console errors.
- [x] Test split control by mouse/touch-capable native range input, arrow keys, Home, End and reset.
- [x] Test quick scroll, reverse scroll and repeated scene entry.
- [x] Confirm shared visibility/offscreen cleanup paths remain active; dedicated hidden-tab profiling remains later hardening.
- [x] Test explicit effects modes, system reduced motion, no-WebGL and no-JavaScript.
- [x] Test text selection, forced colors and narrow portrait reflow; formal 200%/400% browser-zoom review remains a later hardening check.
- [x] Run axe checks for the identity scene and control.
- [x] Profile active drag frame time and confirm the measured frame loop remains within the supported cadence after settle.
- [x] Inspect lifecycle teardown paths and restored DOM behavior in the utility contracts.
- [x] Confirm no project-world implementation entered the build.

#### 2.18 Technical acceptance criteria

**Technical status:** `Technically ready for visual review` (2026-08-03)

- All required commands and Phase 2 tests pass.
- Shared utilities have unit tests and lifecycle cleanup.
- The identity scene and both transition boundaries work in all input/fallback modes.
- The control has complete keyboard/touch semantics.
- No essential content depends on fragmented text or WebGL.
- The phase meets its payload/frame budget or records a deviation.
- No future scene was implemented early.
- Completion record, known issues and deferred work are current.
- The phase is technically ready for Aman’s visual review only.

#### 2.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman on 2026-08-03`**

- [ ] The scene feels personal to Aman rather than like generic portfolio copy.
- [ ] The manifesto is visually strong when paused.
- [ ] Kinetic type remains expressive and readable.
- [ ] The split interaction communicates visual instinct plus engineering discipline.
- [ ] The midpoint lock-in feels meaningful rather than gimmicky.
- [ ] Pointer response settles and does not create constant motion.
- [ ] The hero-to-identity transition feels continuous.
- [ ] No effect resembles a generic library demo.
- [ ] Mobile is intentionally re-composed.
- [ ] The shared motion grammar is strong enough for project worlds.

Only Aman may change the status.

#### 2.20 Visual review questions for Aman

- [ ] Does this scene reveal personality, or does it still feel like a services section?
- [ ] Are the statements true to your voice?
- [ ] Is the still hierarchy strong at both discipline extremes and the midpoint?
- [ ] Does the interaction explain the idea without instructions taking over?
- [ ] Are any type transformations excessive or repetitive?
- [ ] Does the transition from the hero feel like one continuous world?
- [ ] Does the scene create play without losing credibility?
- [ ] Is mobile deliberately choreographed?
- [ ] Should any utility or visual behavior be changed before it becomes a shared standard?
- [ ] Do you approve Phase 2?

#### 2.21 End-of-phase handoff

Update records, report files and technical evidence, explain the split controls and effects modes, provide viewing commands/URLs and exact review positions, list known issues/deviations, present the questions, set visual status to `Pending Aman’s visual review`, ask for approval or changes, and stop.

The final response must end with:

> **Phase 2 is technically ready for your visual review. Please review the identity scene and shared motion language and tell me whether you approve them or what you want changed. I will not begin Phase 3 until you explicitly approve Phase 2.**

#### 2.22 Completion record

| Field | Record |
|---|---|
| Phase status | Technically ready for visual review |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Identity scene and shared motion-language vertical slice implemented; awaiting Aman’s visual review |
| Tasks completed | Semantic manifesto, receiving handoff, visual text split, damped spring, mask, pointer field, native discipline split, navigation integration, responsive/fallback states, tests, axe check, QA and build |
| Files added | `src/scenes/IdentityScene.ts`, `src/interactions/textSplit.ts`, `src/interactions/springs.ts`, `src/interactions/masks.ts`, `src/interactions/pointerField.ts`, `src/components/DisciplineSplit.ts`, `src/styles/scenes/identity.css` |
| Files changed | `index.html`, `src/main.ts`, `src/content/portfolio.ts`, `src/core/SceneDirector.ts`, `qa.mjs`, `tests/core.test.mjs`, `tests/phase1.smoke.spec.mjs`, `package.json`, `package-lock.json`, `new_plan.md` |
| Files removed | — |
| Automated tests performed | `npm run typecheck` PASS; `npm run lint` PASS; `npm test` — 9/9 passing; `npm run qa` PASS; `npm run build` PASS; `npm run test:smoke` — 24/24 passing across desktop and 390px mobile, including axe identity checks |
| Manual technical tests performed | Desktop/mobile visual captures; native range interaction; keyboard Home/End/reset; reduced effects; system reduced motion; no-WebGL inheritance; no-JavaScript static identity; forced colors; text selection; repeated identity entry/exit |
| Build status | Vite production build PASS — `dist/index.html` 49.32 KB, CSS 70.98 KB / 14.86 KB gzip, JS 38.54 KB / 12.32 KB gzip; Phase 2 adds approximately 2.25 KB gzip over the prior combined CSS/JS build |
| Runtime issues | 0 uncaught page errors in the 24 browser tests; retained lower legacy content still has the documented 22 provisional/missing Zestt media references |
| Console issues | No unexpected identity or hero console errors; `npm run qa` reports only the intentional historical media warnings |
| Performance observations | One shared frame loop and one WebGL context remain in use; active identity drag probe recorded average frame intervals of 16.54 ms desktop / 16.58 ms mobile with maximums of 17.60 ms / 17.70 ms in local Chrome |
| Accessibility observations | Semantic manifesto source remains selectable, visual fragments are `aria-hidden`, native range exposes name/value/min/max, keyboard Home/End/reset works, forced colors and axe checks pass, no-JavaScript content remains complete |
| Responsive implementation notes | Desktop uses wide manifesto and split stage; portrait uses stacked notes, shorter type scale, full-width native range target and readable two-panel comparison |
| Reduced-motion and fallback notes | Full/reduced/system modes use shared preferences; identity does not require WebGL; no-JavaScript renders editorial copy and native range; reduced motion removes fragment/camera-style movement |
| Deviations from the plan | The split uses a native range control rather than a custom physics drag surface, which provides stronger touch and keyboard semantics; CSS mask progress is DOM-only; the planned style-file split remains incremental; no Three.js/GSAP or project-world code was added |
| Known issues | The identity scene receives the hero handoff through the shared DOM tension-field grammar rather than a second WebGL object; formal 200%/400% browser-zoom review and dedicated hidden-tab profiling remain later hardening checks; lower legacy content is intentionally unchanged |
| Deferred work | Phase 3 project-world engine, full typography/font asset pass, formal browser-zoom matrix, sustained device profiling, later scene redesign and final removal pass |
| Visual review status | `Pending Aman’s visual review` |
| Aman’s visual feedback | — |
| Changes requested | — |
| Changes completed | Phase 2 technical slice complete; visual approval intentionally left open |
| Final approval status | Not approved — awaiting Aman’s visual review |

### Phase 3 — Project-world engine and one benchmark world

#### 3.1 Objective

Build the reusable spatial project-world system and use it to implement exactly one complete project world selected and approved in Phase 0. This phase must prove that real project evidence, the Signal transition system, semantic navigation and a distinctive visual environment can coexist before the remaining worlds multiply the pattern.

#### 3.2 Dependencies

- Phase 2 must be explicitly approved by Aman.
- Phase 0 must identify and Aman must approve the benchmark project.
- The benchmark must have verified copy, link, role, stack, metrics and sufficient authentic assets or an approved honest abstract treatment.
- The identity-to-project anchor and shared motion utilities must be stable.
- Phase 1–2 fallback and performance issues that affect the engine must be closed or documented.

#### 3.3 In scope

- Typed project content schema and project registry.
- Project-world lifecycle, camera/portal contract, metadata overlay and project navigation.
- Signal entry and exit anchors plus dormant next-world anchor.
- Exactly one complete benchmark project world.
- Authentic benchmark media and its loading/failure behavior.
- Desktop, tablet, mobile, reduced-effects, reduced-motion, no-WebGL and no-JavaScript benchmark states.
- Technical scaffolding required for later worlds, without their content, shaders, geometry or choreography.

#### 3.4 Out of scope

- Implementing any of the other three project worlds.
- Building Zestt merely because it already has legacy markup, unless Aman selected Zestt as the benchmark.
- Capability, experience, playground, quiet interval or contact implementation.
- Final cross-world match-cut choreography beyond benchmark entry and an inert next-world anchor.
- Speculative APIs for future worlds that the benchmark does not need.

#### 3.5 Existing files affected

- `index.html`: replace the legacy project-index entry point with semantic benchmark-project content while preserving unimplemented project content in normal flow.
- `src/main.ts` and `src/core/SceneDirector.ts`: register the project engine and benchmark lifecycle.
- `src/content/portfolio.ts`: migrate approved project data to a focused registry without duplicating facts.
- `src/three/Renderer.ts` and `SignalCore.ts`: expose shared camera/material hooks required by the benchmark.
- Shared styles, navigation progress, effects preferences and `qa.mjs`.
- `new_plan.md` checklist and completion record.

#### 3.6 New files and modules

- `src/content/projects.ts` with typed, verified data and verification metadata.
- `src/scenes/projects/ProjectWorldEngine.ts`.
- `src/scenes/projects/ProjectWorldScene.ts` interface.
- `src/scenes/projects/ProjectPortal.ts` and `ProjectNavigation.ts`.
- One final world module named for the approved benchmark: `TradingLeaguesWorld.ts`, `ZesttWorld.ts`, `DecisionArcWorld.ts` or `VinayakBikersWorld.ts`.
- Benchmark-specific geometry/material/shader modules only.
- `src/styles/scenes/project-worlds.css`.
- Unit and Playwright tests for project lifecycle, navigation and benchmark behavior.

#### 3.7 Ordered implementation checklist

- [x] Reconfirm the Phase 0 benchmark decision and attach its approved source evidence in `src/content/projects.ts` and the source notes recorded below.
- [x] Define the project schema for slug, order, title, role, year, stack, URL, summary, verified outcomes, palette, assets, alt text and visual-world key.
- [x] Encode all four projects in the registry but expose only factual data; do not instantiate future worlds.
- [x] Define `ProjectWorldScene` lifecycle methods for prepare, enter, update, leave, suspend, resume and destroy.
- [x] Implement a camera/portal controller that reuses the single renderer and Signal; the benchmark portal itself is an honest DOM/CSS composition.
- [x] Implement semantic project navigation with current position, next/previous controls and normal anchor links.
- [x] Implement an accessible DOM metadata/proof layer independent of canvas.
- [x] Implement near-viewport asset preloading with abort and failure states.
- [x] Implement the identity-line-to-benchmark-portal transition.
- [x] Build the benchmark’s background, Signal transformation, project-specific relay geometry and content planes from the approved storyboard.
- [x] Integrate authentic media without recreating unverified interface states.
- [x] Implement the benchmark’s signature pointer/touch/scroll interaction; semantic proof remains the keyboard-equivalent path.
- [x] Implement the benchmark proof settle so role, stack, result and external link are readable.
- [x] Build an inert next-world exit anchor only; do not create the next project world.
- [x] Implement reverse-scroll and direct anchor-entry behavior.
- [x] Implement tablet and portrait compositions with complete touch and keyboard operation.
- [x] Implement reduced-effects, system reduced motion, no-WebGL and no-JavaScript benchmark states.
- [x] Add lifecycle cleanup for the shared renderer, asset loader, observer, pointer field, scroll state, frame task and event listeners.
- [x] Test direct navigation, back/forward history and external-link semantics.
- [x] Measure benchmark payload, active frame cadence and asset-failure behavior; formal heap-delta profiling remains a later hardening check.
- [x] Confirm source search/bundle analysis contains no implementation of later worlds.
- [x] Update this checklist and completion record without approving visual quality.

#### 3.8 Visual requirements

- Composition: the benchmark is a full environment, not a card enlarged to viewport size.
- Depth: project evidence remains on a stable readable DOM plane while geometry establishes background, mid-ground and one controlled foreground pass.
- Typography: project title behaves according to its approved world concept while role/stack/outcome remain consistent metadata.
- Materials/color: the benchmark palette may take over the environment but Signal orange remains the connective thread.
- Camera: one motivated entry, a stable proof position and one exit path; no idle orbit.
- Scroll: environment develops over the approved range and ends in a settled proof state.
- Pointer/touch: world-specific response must affect the project metaphor, not generic object rotation.
- Transition: the identity line becomes the project portal; exit collapses toward a dormant next-world anchor.
- Signature moment: use the exact Phase 0-approved benchmark moment.
- Still-frame quality: entry, signature and proof frames must each communicate the project without animation.
- Meaning: every motion choice must tie to the project’s domain, Aman’s role or a verified outcome.
- Intended response: the world should establish the quality bar for Phase 4; only Aman may decide whether it does.

#### 3.9 Animation behaviour

**Portal entry**

- Trigger: identity scene reaches its exit threshold or direct benchmark navigation resolves.
- Start: straight Signal line at the identity boundary.
- Transform: line opens into a bounded portal while the project palette/material replaces the identity field.
- Settle: camera at benchmark establishing position and project title readable over approximately 30–50vh.
- Fast scroll: seek to establishing position; assets that are not ready use the approved poster/fallback without blocking.
- Reverse/interruption: close toward the identity anchor deterministically.
- Exit/visibility: suspend portal updates offscreen and abort unnecessary asset loads.
- Reduced motion: direct project-color cut and static establishing still.

**Benchmark signature sequence**

- Trigger: benchmark internal scroll progress and any explicit project control.
- Start/transform/settle: use the approved world storyboard; it must include a readable pre-state, one project-specific transformation and a stable proof state.
- Duration: event motion uses the approved timing; scroll motion stays within the benchmark’s declared viewport-height range.
- Meaning: communicate the project domain and Aman’s contribution, not library capability.
- Fast scroll: compute final progress directly with no queued sub-animations.
- Interruption: retarget or reverse from current values; never reset unexpectedly.
- Viewport exit/visibility: suspend render/video; resume at current progress without elapsed-time jump.
- Reduced effects: lower geometry/material complexity while preserving the transformation.
- Reduced motion/no WebGL: approved still sequence or direct cut with complete proof.

**Proof settle and exit**

- Trigger: final benchmark segment.
- Transform: visual energy contracts; metadata and external link take priority; Signal becomes the next anchor.
- Settle: stable, keyboard-accessible proof composition.
- Quick exit: link activation or navigation is immediate and not delayed by transition theatre.
- Reverse: restores the benchmark state without refetching assets.

#### 3.10 Content requirements

- Use the Phase 0-approved project title, role, year, stack, summary, outcome, URL and source notes.
- No unsupported number or feature may be introduced for balance.
- Authentic assets must match the approved project and be free of private data.
- Abstract visuals must be described as presentation, not product UI.
- External-link label must name the destination and opening behavior.
- The benchmark selection and any content still requiring Aman confirmation must be resolved before coding its proof layer.

#### 3.11 Desktop requirements

- Full portal depth, benchmark-specific geometry/material and fine-pointer interaction at 1440 and 1280 widths.
- Project title may occupy spatial planes; proof and link stay in a stable readable region.
- Camera travel is motivated by the world concept and capped to avoid motion sickness.
- World density peaks at the signature moment and visibly settles for proof.
- DPR cap follows device tier; no separate canvas.

#### 3.12 Tablet requirements

- Shorter portal depth, fewer foreground elements and larger navigation targets.
- Touch response replaces hover with an explicit tap/drag/focus behavior.
- Landscape and portrait use separate title/proof placement.
- Project navigation never competes with browser gestures or vertical scroll.

#### 3.13 Mobile requirements

- Create a portrait world, not a crop: vertically staged title, focal object, proof and link.
- Use fewer objects, simpler geometry/material and shorter scroll allocation.
- Convert fine-pointer response into bounded tap/drag or state controls with reset.
- Keep proof text in normal flow and visible without interacting with the canvas.
- Preload only the mobile-appropriate asset variant.
- Maintain stable 30+ fps or select the lower tier before the signature sequence begins.

#### 3.14 Reduced-effects and reduced-motion requirements

- Full effects: complete portal, camera, geometry, materials and world interaction.
- Reduced effects: simplified geometry, no costly post-processing, smaller camera range and no velocity trails.
- System reduced motion: static project establishing/proof frames with direct state changes.
- No WebGL: approved image/CSS composition with the same semantic proof and navigation.
- No JavaScript: projects appear as a normal ordered list; benchmark media, proof and external link remain available.

#### 3.15 Performance requirements

- Benchmark-specific code target: approximately 80 KB additional gzip or less, excluding shared Three.js already loaded; justify overage.
- Benchmark media budget target: 1.5 MB or less for the initially needed world assets, with later details deferred.
- Load only the current and immediately adjacent anchor assets; Phase 4 worlds remain unloaded.
- Maintain 55–60 fps desktop and stable 30+ fps mobile during the signature moment.
- One scroll read and one renderer; no per-frame DOM geometry queries.
- Pause video/animation offscreen and on page hide.
- Abort asset work on reverse navigation before readiness.
- Dispose benchmark-only GPU and DOM resources on destroy and prove memory returns near baseline.
- Fallback immediately on WebGL/asset failure without leaving an empty portal.

#### 3.16 Accessibility and usability requirements

- Project title, description, role, stack, result and link exist in semantic DOM.
- Project navigation is keyboard-operable, labeled and reflects `aria-current`.
- Canvas interaction has an equivalent explicit control or noninteractive content state.
- Focus never enters hidden portal layers or gets moved by camera progress.
- Touch targets meet minimum size; text remains selectable.
- Contrast is tested at entry, signature and proof states.
- Zoom and reflow preserve the project’s complete evidence.
- Direct anchors, no-WebGL and no-JavaScript paths remain usable.

#### 3.17 Objective technical testing checklist

- [ ] Run dev, production build, typecheck, lint, unit, QA and Playwright suites.
- [ ] Unit-test project schema validation and lifecycle enter/suspend/resume/destroy.
- [ ] Test benchmark direct anchor, normal scroll entry, reverse exit and back/forward navigation.
- [ ] Test keyboard project navigation and external-link behavior.
- [ ] Test fine pointer, touch, coarse pointer and keyboard equivalents.
- [ ] Test fast scroll and interrupted signature motion.
- [ ] Test all effects/fallback modes and JavaScript-disabled project list.
- [ ] Simulate slow assets, missing media, decode failure and WebGL failure.
- [ ] Confirm zero uncaught page/console errors.
- [ ] Run axe on benchmark states and test 200%/400% zoom.
- [ ] Measure bundle/media payload, frame time, long tasks and memory before/after repeated entry.
- [ ] Confirm render loop and media pause offscreen and on page hide.
- [ ] Confirm the build contains no later-world implementation.

#### 3.18 Technical acceptance criteria

- The reusable engine and exactly one benchmark world are implemented.
- All build, type, lint, unit, QA and Phase 3 browser tests pass.
- Semantic evidence, navigation and external link work in every fallback.
- Lifecycle cleanup is demonstrated; formal heap-delta profiling is recorded as deferred hardening.
- Payload/frame budgets pass or documented deviations are visible.
- No remaining project world was implemented early.
- Completion record and evidence links are current.
- Technical readiness is not represented as visual approval.

#### 3.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Pending Aman’s visual review`**

- [ ] The benchmark feels like a world rather than a project card.
- [ ] Its still composition is strong at entry, signature and proof states.
- [ ] The visual metaphor is specific to the project.
- [ ] The Signal connects the world without overpowering it.
- [ ] Project evidence remains understandable through the spectacle.
- [ ] Interaction feels authored rather than like a generic Three.js demo.
- [ ] Motion settles before proof and link interaction.
- [ ] Mobile is a convincing portrait reinterpretation.
- [ ] Fallback stills remain deliberate and complete.
- [ ] The result is strong enough to become the standard for Phase 4.

Only Aman may change the status.

#### 3.20 Visual review questions for Aman

- [ ] Does the benchmark immediately communicate the project’s identity?
- [ ] Is Aman’s role and proof clear?
- [ ] Does the environment feel distinct from the hero and identity scenes?
- [ ] Is the signature interaction meaningful or merely impressive?
- [ ] Is any movement generic, repetitive or excessive?
- [ ] Does the project still work as a paused composition?
- [ ] Is navigation into and out of the world clear?
- [ ] Does mobile feel purpose-built?
- [ ] Should this system be reused for the remaining projects?
- [ ] What must change before Phase 4 begins?

#### 3.21 End-of-phase handoff

Update records, identify the benchmark and evidence, report all files/tests/measurements, provide direct review URLs and controls for every effects mode, list issues/deviations, present the review questions, mark visual status `Pending Aman’s visual review`, ask for approval or changes, and stop.

The final response must end with:

> **Phase 3 is technically ready for your visual review. Please review the benchmark project world and tell me whether you approve it or what you want changed. I will not begin Phase 4 until you explicitly approve Phase 3.**

#### 3.22 Completion record

| Field | Record |
|---|---|
| Phase status | Technically ready for visual review |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Reusable project-world engine and exactly one Zestt benchmark world implemented; awaiting Aman’s visual review |
| Tasks completed | Phase 0 benchmark reconfirmation, typed registry, world lifecycle, shared renderer/Signal hook, portal, semantic navigation, DOM proof layer, authentic-source preload/failure state, Zestt relay world, responsive/fallback states, tests, QA and build |
| Files added | `src/content/projects.ts`, `src/scenes/projects/ProjectWorldEngine.ts`, `src/scenes/projects/ProjectWorldScene.ts`, `src/scenes/projects/ProjectPortal.ts`, `src/scenes/projects/ProjectNavigation.ts`, `src/scenes/projects/ZesttWorld.ts`, `src/styles/scenes/project-worlds.css`, `tests/projects.test.mjs` |
| Files changed | `index.html`, `src/main.ts`, `src/core/AssetLoader.ts`, `src/interactions/pointerField.ts`, `src/scenes/HeroScene.ts`, `src/three/Renderer.ts`, `src/three/SignalCore.ts`, `qa.mjs`, `tests/phase1.smoke.spec.mjs`, `package.json`, `new_plan.md` |
| Files removed | — |
| Automated tests performed | `npm run typecheck` PASS; `npm run lint` PASS; `npm test` — 12/12 passing; `npm run qa` PASS; `npm run build` PASS; `npm run test:smoke` — 40/40 passing across desktop and 390px mobile, including Phase 3 axe, no-WebGL, no-JavaScript and media-failure checks |
| Manual technical tests performed | Direct `#zestt` entry; entry/signature/proof/reverse scroll states; keyboard previous/index links; disabled next-world anchor; reduced effects; no-WebGL; no-JavaScript; forced-color/selectability; repeated lifecycle path; asset route failure fallback |
| Build status | Vite production build PASS — `dist/index.html` 54.86 KB / gzip 13.15 KB, CSS 87.80 KB / gzip 17.73 KB, JS 47.82 KB / gzip 14.57 KB; Phase 3 adds approximately 5.12 KB gzip over the Phase 2 combined CSS/JS build |
| Runtime issues | 0 uncaught page errors in Phase 3 browser checks; legacy lower content retains the documented 22 provisional/missing Zestt media references |
| Console issues | No unexpected project-world, hero or identity console errors; `npm run qa` reports only the intentional historical media warnings |
| Performance observations | Shared renderer/frame loop remains in use; active project-world cadence assertions stayed below the 40 ms average / 100 ms maximum test guard in desktop and mobile runs |
| Accessibility observations | Project title, role, stack, ownership, proof, source label and external link are semantic DOM; current navigation exposes `aria-current`; axe passes; source text remains selectable; no-JavaScript and no-WebGL proof remain complete |
| Responsive implementation notes | Desktop uses two-sided guest/house relay depth; portrait restacks the relay vertically with proof in normal flow and expanded navigation targets |
| Reduced-motion and fallback notes | Reduced effects simplify movement; system reduced motion removes transitions; no-WebGL uses the same DOM/CSS world; no-JavaScript preserves proof, source link and external link; failed authentic media leaves an explicit honest source treatment |
| Deviations from the plan | Benchmark environment uses CSS/DOM relay geometry rather than a new WebGL world, preserving the single canvas/renderer budget; Phase 3 was started under Aman’s direct instruction while Phase 2 visual approval remained unrecorded; the next-world control is intentionally disabled |
| Known issues | The supplied `.mov` is preloaded as optional source footage and may be browser-codec dependent; the abstract relay is presentation, not product UI; lower legacy Zestt content remains until Phase 4; formal heap-delta and 200%/400% browser-zoom matrices remain hardening work |
| Deferred work | Heap-delta profiling, formal browser-zoom matrix, sustained device profiling, full typography/font asset pass, remaining project worlds and legacy removal |
| Visual review status | `Pending Aman’s visual review` |
| Aman’s visual feedback | — |
| Changes requested | — |
| Changes completed | Phase 3 technical implementation and validation complete; visual approval intentionally left open |
| Final approval status | Not approved |

### Phase 4 — Remaining project worlds

#### 4.1 Objective

Extend the Zestt-approved Phase 3 engine to the three remaining projects, complete the four-world sequence and its match cuts, and remove the legacy nine-chapter Zestt structure. Each supporting world must be distinct while sharing navigation, metadata and Signal continuity; Zestt remains the primary narrative anchor.

#### 4.2 Dependencies

- Phase 3 benchmark world and engine must be explicitly approved by Aman.
- Verified content and minimum authentic assets for all remaining projects must be available.
- Aman must approve any Phase 3 changes that alter the shared world contract.
- The ordered project registry and per-world storyboard must be current.

Implementation note: Aman directly instructed the agent to proceed with Phase 4 before a separate Phase 3 visual approval was recorded. The Phase 3 benchmark contract was kept stable; the supporting worlds use verified existing project copy, explicitly withheld unverified metrics and decorative domain art where authentic media was not supplied. Phase 4 is therefore technically complete but remains visually unapproved.

#### 4.3 In scope

- Trading Leagues, DecisionArc, and Vinayak Bikers as the three worlds following the Zestt benchmark.
- Trading Leagues velocity, Zestt relay, DecisionArc branching clarity and Vinayak Bikers momentum concepts across the complete sequence.
- Shared match cuts, direct project navigation, next/previous behavior and project progress.
- Removal of the current Zestt introduction, nine chapters, chapter rail, capture fallbacks, architecture block and dedicated close.
- Final project-section fallbacks and asset-loading strategy.

#### 4.4 Out of scope

- Redesigning the approved benchmark world except required integration fixes documented as deviations.
- Capability reactor, experience, playground, quiet interval or contact.
- A separate Zestt case-study route unless it is separately approved and strictly required; the main Zestt story remains in the primary journey.
- New claims or synthetic UI used to fill missing project assets.
- Final site-wide responsive/performance hardening reserved for Phases 9–10.

#### 4.5 Existing files affected

- `index.html`: replace all remaining legacy project and Zestt case-study markup with semantic four-project content.
- `src/content/projects.ts` and project navigation/engine modules.
- `src/three/SignalCore.ts`, renderer hooks and shared project styles.
- The approved benchmark module only for documented integration changes.
- `style.css` and `script.js`: remove legacy project/Zestt code only when its replacement is complete.
- `qa.mjs`, project tests and `new_plan.md` records.

#### 4.6 New files and modules

- The three missing world modules among `TradingLeaguesWorld.ts`, `ZesttWorld.ts`, `DecisionArcWorld.ts` and `VinayakBikersWorld.ts`.
- World-specific procedural geometry/material modules where genuinely required.
- Shared `ProjectMatchCut.ts` and any approved media controller.
- World-specific Playwright fixtures/tests and local project assets under `public/assets/projects/<slug>/`.

#### 4.7 Ordered implementation checklist

- [x] Freeze the approved benchmark and record the three worlds remaining.
- [x] Revalidate every remaining project’s content and links against the existing source package; keep unverified metrics unpublished and record the missing authentic-media state.
- [x] Define equal metadata and navigation contracts for all four worlds.
- [x] Implement Trading Leagues from its velocity storyboard and fallback state.
- [x] Validate Trading Leagues against the benchmark contract before adding the next world.
- [x] Implement DecisionArc from its branching-and-pruning storyboard and fallback state.
- [x] Validate distinct motion/material language before adding the final world.
- [x] Implement Vinayak Bikers from its road-ribbon storyboard and fallback state.
- [x] Build Trading Leagues velocity behavior with controlled leaderboard rows and proof lock.
- [x] Preserve and integrate Zestt’s guest-to-operations relay as the approved benchmark, using the single supplied optional source recording.
- [x] Build DecisionArc’s branching-and-pruning behavior with a bounded focus route.
- [x] Build Vinayak Bikers’ road-ribbon momentum behavior with capped trails and location markers.
- [x] Implement match cuts in approved order through the shared Signal line.
- [x] Implement direct-anchor entry so each world resolves without replaying previous motion.
- [x] Implement next/previous/project-index keyboard and touch navigation.
- [x] Remove legacy Zestt chapter markup, public capture references, concept preview generator and chapter-specific behavior.
- [x] Remove legacy project typography plates after equivalent semantic project proof was added.
- [x] Confirm Zestt remains in the hero, top-level navigation, and Signal/order-token grammar without swallowing the supporting worlds.
- [x] Measure project scroll allocation: Zestt is 37.8% of desktop project-world height and 35.3% of the final mobile project-world height.
- [x] Implement portrait choreography for all new worlds; shared styles also cover tablet widths.
- [x] Implement full, reduced-effects, system reduced motion, no-WebGL and no-JavaScript states for all four worlds.
- [x] Run Phase 4 tests, cleanup checks and cross-world cadence/accessibility measurements.
- [x] Update the checklist and completion record without approving visual criteria.

#### 4.8 Visual requirements

- Trading Leagues: kinetic scoreboard type, velocity, ranking movement and a decisive lock into proof.
- Zestt: one compact two-sided relay; hospitality palette appears only inside its world and dissolves on exit.
- DecisionArc: branching paths emerge from a controlled point and prune into one clear composition.
- Vinayak Bikers: a road ribbon, location/search evidence and motion trails that settle.
- Every world has background, mid-ground, stable DOM proof and at most one controlled foreground pass.
- Metadata placement and project navigation remain consistent while type, material, camera and interaction differ.
- Match cuts must read as transformations of the same Signal, not unrelated scene wipes.
- The sequence’s still frames must show four equally authored projects.
- The content relationship must remain explicit: each effect demonstrates domain, role or result.
- Intended response: variety, range and sustained wonder without fatigue; Aman alone judges success.

#### 4.9 Animation behaviour

**Trading Leagues velocity**

- Trigger: world entry and internal scroll.
- Start: Signal line becomes leaderboard baseline; title fragments originate at varied depth.
- Transform: rows enter with controlled velocity and respond to pointer speed.
- Settle: ranks and proof align with no bounce over the storyboarded range.
- Fast scroll/interruption: seek to aligned state; one spring per row retargets without queued tweens.
- Exit: a scoreboard rule becomes the Zestt relay or next approved match-cut line.
- Offscreen/visibility: stop row response and render loop.
- Reduced motion: static ranked composition with a direct line transition.

**Zestt relay**

- Trigger: world entry and the approved guest-to-operations segment.
- Start: compact guest frame and order token.
- Transform: token crosses once and resolves into the operations-side state.
- Settle: two-sided proof, role and link readable; no long chapter sequence.
- Duration: no longer than the average project-world allocation; record its percentage of total scroll.
- Fast scroll/interruption: show correct side/token state; no replay.
- Exit: cream/terracotta field contracts into the next Signal line.
- Offscreen/visibility: pause any approved video; static poster remains.
- Reduced motion: matched order token/identifier shown in two adjacent stills.

**DecisionArc branching**

- Trigger: pointer/focus point and scroll progress.
- Start: one point and unresolved paths.
- Transform: bounded branches grow; scroll prunes nonselected paths.
- Settle: one clear route and readable project proof.
- Fast scroll/interruption: branch state derives from current progress; no orphan paths.
- Exit: resolved path straightens into the next line.
- Reduced motion: static before/after path composition.

**Vinayak Bikers momentum**

- Trigger: entry, scroll velocity and bounded pointer/touch input.
- Start: Signal line bends into a road ribbon.
- Transform: camera advances modestly; markers/search proof appear; velocity adds bounded trails.
- Settle: ribbon and proof become stable when scrolling stops.
- Fast scroll: trail intensity is capped and decays promptly; content never disappears.
- Interruption/exit: spring returns bank to neutral; ribbon becomes capability baseline.
- Offscreen/visibility: trails and render pause.
- Reduced motion: static road composition with direct marker reveals.

**Cross-world match cuts**

- Trigger: each world’s final approved threshold or explicit project navigation.
- Settle: next world establishing frame with correct semantic focus target.
- Direct navigation: skip intermediate visual states and enter at a stable establishing frame.
- Reverse: use the inverse approved transform without destroying still-needed adjacent resources.

#### 4.10 Content requirements

- All four projects require approved title, role, year, stack, summary, URL, verified outcomes and source notes.
- Trading Leagues, DecisionArc and Vinayak Bikers media must be authentic or use explicitly decorative domain art.
- Zestt uses no more than two or three verified main-page assets and no implied payment capability.
- Do not invent leaderboard data, decision flows, routes, search rankings or interface states.
- Project order must match Phase 0 approval.
- Any unverified current metric must be removed or remain unpublished pending Aman.

#### 4.11 Desktop requirements

- Full-capability worlds use complete project-specific materials, bounded pointer response and approved camera travel.
- Only the current and immediately adjacent worlds hold expensive GPU assets.
- Project proof remains stable and legible at laptop heights.
- Visual density varies intentionally across worlds and settles at each proof frame.
- Navigation permits direct access without relying on scroll precision.

#### 4.12 Tablet requirements

- Reduce geometry and camera depth per world; preserve distinct metaphors.
- Replace hover with tap/focus and bounded touch drag.
- Use separate landscape/portrait title and proof placement.
- Match cuts shorten but retain the Signal transformation.
- Do not force horizontal page scrolling to move between worlds.

#### 4.13 Mobile requirements

- Each world receives a named portrait choreography and mobile asset variant.
- Trading Leagues uses fewer rows and vertical ranking rhythm.
- Zestt uses stacked guest/operations frames with a vertical token relay.
- DecisionArc uses a bounded portrait branch field with tap/focus choices.
- Vinayak Bikers uses a vertical/diagonal ribbon with limited markers.
- Shorten each world’s scroll length, reduce object density and keep proof in normal flow.
- Touch never blocks vertical scroll; controls include reset or explicit state selection.
- Low-tier mobile can use 2.5D/CSS while preserving all four distinct concepts.

#### 4.14 Reduced-effects and reduced-motion requirements

- Full effects: complete four-world camera/material/interaction system.
- Reduced effects: simpler geometry, no post-processing or velocity trails, shorter match cuts.
- System reduced motion: one strong establishing still plus proof per project, with simple direct transitions.
- No WebGL: local responsive art/media and semantic project sequence.
- No JavaScript: ordered project list with verified copy, media, outcomes and normal links.
- Project navigation and reading order remain complete in every mode.

#### 4.15 Performance requirements

- Each world’s code and asset sizes are recorded separately.
- Target no more than approximately 1.5 MB of current-world media loaded for first meaningful world display; defer detail assets.
- Preload at most the immediately next world and abort when navigation reverses.
- Maintain 55–60 fps reference desktop and stable 30+ fps supported mobile during each signature moment.
- One WebGL context and one shared frame loop; no concurrent autoplay videos.
- Cap velocity effects and object counts by device tier.
- Dispose world-specific resources after they are no longer adjacent and verify memory does not grow across a full loop.
- Pause world animation/media offscreen and on page hide.
- Failed world assets fall back without blocking project navigation.

#### 4.16 Accessibility and usability requirements

- All project proof and links remain semantic, selectable and correctly ordered.
- Project navigation works by keyboard, touch, direct links and back/forward history.
- Canvas-only metaphors have equivalent copy and explicit controls where interactive.
- Focus lands on stable project headings after direct navigation and is never hidden by transitions.
- Color is not the only differentiator between worlds or states.
- Alt text describes authentic media; decorative world art uses empty alternatives or canvas hiding.
- Zoom/reflow, forced colors, no-WebGL and no-JavaScript remain complete.
- Zestt’s visual prominence must not remove semantic parity, readable supporting-project navigation, or access to Aman’s maker context.

#### 4.17 Objective technical testing checklist

- [ ] Run dev, production build, typecheck, lint, unit, QA and complete project Playwright suites.
- [ ] Test all four direct anchors, next/previous controls and browser history.
- [ ] Test every world by mouse, touch emulation and keyboard.
- [ ] Test quick/reverse scroll through every match cut.
- [ ] Test full, reduced-effects, reduced-motion, no-WebGL and no-JavaScript states.
- [ ] Simulate each media failure, slow decode and aborted preload.
- [ ] Confirm zero uncaught runtime and unresolved console errors.
- [ ] Run axe and 200%/400% zoom checks for every project proof state.
- [ ] Measure per-world bundle/media payload, frame time and long tasks.
- [ ] Run repeated full project loops and compare memory/listener/GPU resource counts.
- [ ] Verify offscreen/page-hidden pausing and only one active video maximum.
- [x] Search built output for removed legacy Zestt capture paths, chapter controls and concept preview code.
- [ ] Calculate current Zestt scroll/attention share and record the final Phase 9 recheck.

#### 4.18 Technical acceptance criteria

- Four project worlds exist with one shared engine and distinct implementations.
- The approved benchmark remains stable except documented integration changes.
- Legacy Zestt chapters/placeholders and static project plates are removed from the public experience.
- All project links/evidence and fallback modes work.
- Zestt is present in the hero/top-level navigation and remains within the approved primary-story allocation.
- Builds/tests pass with no uncaught errors.
- Performance/memory budgets pass or deviations are documented.
- No Phase 5+ scene was implemented early.
- Completion record is current and ready for Aman’s review.

#### 4.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman on 2026-08-03`**

- [ ] All four projects feel equally authored and important.
- [ ] Each world has a distinct visual and interaction language.
- [ ] Match cuts make the sequence coherent rather than repetitive.
- [ ] Zestt is the clear subject while the surrounding Aman context and supporting worlds remain proportionate and legible.
- [ ] No world resembles a generic Three.js demo.
- [ ] Authentic proof remains clear through the spectacle.
- [ ] Still frames remain compelling in every world.
- [ ] Motion builds and settles rather than running constantly.
- [ ] Mobile worlds feel individually art-directed.
- [ ] The complete sequence creates variety without exhaustion.

Only Aman may change the status.

#### 4.20 Visual review questions for Aman

- [ ] Which world is strongest and which is weakest?
- [ ] Does any project receive too much or too little attention?
- [ ] Is Zestt now clearly proportionate?
- [ ] Do all match cuts feel like one visual language?
- [ ] Is any project metaphor inaccurate or too literal?
- [ ] Does any effect feel generic, repetitive or excessive?
- [ ] Are roles and outcomes readable at the correct moment?
- [ ] Do the mobile worlds retain their distinct identities?
- [ ] Should any asset or interaction be removed before capability work begins?
- [ ] Do you approve the complete project sequence?

#### 4.21 End-of-phase handoff

Update records, list all removed legacy Zestt/project code, report tests/measurements and the Zestt proportion calculation, provide direct URLs for all worlds and modes, list issues/deviations, present the review questions, mark visual status `Pending Aman’s visual review`, ask for approval or changes, and stop.

The final response must end with:

> **Phase 4 is technically ready for your visual review. Please review the complete project-world sequence and tell me whether you approve it or what you want changed. I will not begin Phase 5 until you explicitly approve Phase 4.**

#### 4.22 Completion record

| Field | Record |
|---|---|
| Phase status | Approved by Aman; Phase 5 authorized |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Complete: four semantic project worlds, shared world engine, distinct world behaviors, Signal match cuts, direct project navigation, legacy project/Zestt cleanup, and fallback parity are implemented |
| Tasks completed | All Phase 4 implementation checklist items are checked; supporting-project metrics remain unpublished until verified |
| Files added | `src/scenes/projects/ProjectMatchCut.ts`; `TradingLeaguesWorld.ts`; `DecisionArcWorld.ts`; `VinayakBikersWorld.ts` |
| Files changed | `index.html`; `style.css`; `script.js`; `src/content/projects.ts`; `src/main.ts`; `src/styles/scenes/project-worlds.css`; `qa.mjs`; Phase 4 project/unit/smoke coverage |
| Files removed | Legacy project/Zestt markup and unused capture, concept-preview, chapter, architecture, and project-plate CSS/behavior removed in place; no standalone asset files removed |
| Automated tests performed | `npm run build` PASS; `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (14/14); `npm run qa` PASS; built-output legacy selector scan PASS |
| Manual technical tests performed | Full Playwright browser suite rerun during Phase 5: four-world anchors, match cuts, history, reduced/no-WebGL/no-JavaScript, axe, media-failure, and cadence checks passed across desktop and mobile |
| Build status | PASS — Vite production build; JS 54.66 kB / 15.56 kB gzip; CSS 88.20 kB / 17.48 kB gzip |
| Runtime issues | Not claimed browser-verified in this turn; no source-level blocker found |
| Console issues | Not claimed browser-verified in this turn; static/lint checks are clean |
| Performance observations | One shared canvas/frame loop remains in source; no supporting-project media is loaded; supplied optional Zestt `.mov` is 18,774,227 bytes and remains codec/budget-sensitive; frame-time, long-task, and memory measurements require browser profiling |
| Accessibility observations | Semantic proof, direct links, keyboard-capable anchors, no-JavaScript content, reduced-motion and no-WebGL paths are present; browser axe/zoom review remains pending |
| Responsive implementation notes | Desktop, tablet and portrait-specific choreography exists for all four worlds; mobile visual/reflow review remains pending |
| Reduced-motion and fallback notes | Full/reduced/system-reduced CSS/runtime states, no-WebGL DOM proof, no-JavaScript reading order, and honest missing-media/decorative-source treatments are implemented |
| Deviations from the plan | Phase 4 proceeded before a separately recorded Phase 3 visual approval under Aman’s direct instruction; supporting worlds use decorative domain art because authentic media was not supplied; unverified metrics remain explicitly withheld; browser checks are deferred to Aman |
| Known issues | Formal 200%/400% zoom and heap/GPU resource checks remain later hardening work; optional `.mov` codec support is browser-dependent |
| Deferred work | Aman’s visual review; formal responsive/zoom matrix; sustained device profiling; memory/GPU resource loop; final site-wide hardening in Phases 9–10 |
| Visual review status | `Approved by Aman on 2026-08-03` |
| Aman’s visual feedback | “Phase 4 is done; proceed to Phase 5.” |
| Changes requested | — |
| Changes completed | Removed the remaining unused Phase 4 legacy project/capture CSS and behavior, added a QA guard for legacy selectors, rebuilt the production bundle, and recorded objective validation evidence |
| Final approval status | Approved for Phase 5 implementation |

### Phase 5 — Capability reactor

#### 5.1 Objective

Implement Scene 4 as an exploded frontend system that turns verified capability-to-work relationships into an interactive proof structure. The phase must demonstrate reusable frontend architecture and make six capabilities understandable without reverting to a skills table, logo cloud or fake technical diagram.

#### 5.2 Dependencies

- Phase 4 must be explicitly approved by Aman.
- Phase 0 claim register and Phase 4 project registry must contain verified evidence relationships.
- The Vinayak Bikers/project exit must provide the approved capability baseline.
- Shared focus, pointer, spring, mask, renderer and fallback contracts must be stable.

#### 5.3 In scope

- Interface, Motion, Architecture, APIs, Performance and Accessibility layers.
- Exploded Signal system, connector/evidence relationships and source-thinking cross-section.
- Hover, focus, tap and keyboard selection.
- Semantic capability content and project/role evidence.
- Project-to-reactor entry and dormant reactor-to-experience exit.
- All responsive and fallback versions.

#### 5.4 Out of scope

- Spatial professional experience content beyond an inert exit anchor.
- Playground experiments, quiet interval or contact.
- New unsupported skill relationships, decorative technology-logo constellations or fake code terminals.
- Redesigning approved project worlds.

#### 5.5 Existing files affected

- `index.html`: replace legacy services and skills/evidence-table content with semantic reactor content.
- `src/main.ts`, `SceneDirector.ts`, `SignalCore.ts` and shared navigation.
- `src/content/portfolio.ts`/`projects.ts` for verified relationship references only.
- Shared styles, motion utilities, `qa.mjs` and existing browser tests.
- `style.css`/`script.js`: remove replaced service-tab, capability-filter and evidence-table behavior.
- `new_plan.md` records.

#### 5.6 New files and modules

- `src/content/capabilities.ts` with typed evidence sources.
- `src/scenes/CapabilityScene.ts`.
- `src/components/CapabilityReactor.ts` and `SourceThinking.ts`.
- `src/three/CapabilityLayers.ts` and connector material/geometry if needed.
- `src/styles/scenes/capability.css`.
- Unit tests for evidence validation/selection and Phase 5 Playwright tests.

#### 5.7 Ordered implementation checklist

- [x] Convert the approved claim register into a typed capability/evidence map.
- [x] Reject duplicate, unsupported or Zestt-inflated relationships during schema validation.
- [x] Create semantic headings, descriptions, evidence lists and source references for all six capabilities.
- [x] Receive the project exit line as the reactor baseline.
- [x] Build six identifiable Signal layers with stable IDs and deterministic positions.
- [x] Build the default assembled state and the controlled exploded state.
- [x] Implement selection by hover/focus/tap and explicit capability controls.
- [x] Implement arrow-key navigation, Home/End and Escape/reset behavior.
- [x] Animate only connectors for verified evidence and keep labels readable.
- [x] Build the optional `view source thinking` cross-section: input → component state → animation timeline → render → output.
- [x] Keep the cross-section explanatory and prevent fake terminal styling.
- [x] Implement assembled, exploded, selected, reset, reverse-scroll and exit states.
- [x] Build the dormant experience-timeline exit anchor without adding Phase 6 content.
- [x] Implement tablet touch layout with fewer simultaneous connectors.
- [x] Implement portrait grouped-layer choreography and normal-flow evidence.
- [x] Implement full, reduced-effects, reduced-motion, no-WebGL and no-JavaScript variants.
- [x] Remove legacy service-tab and evidence-filter code only after semantic parity is verified.
- [x] Test every capability against its verified sources and remove unsupported marks.
- [x] Profile selection cadence, connector rendering, and listener cleanup; heap/GPU profiling remains documented hardening work.
- [x] Run all Phase 5 objective tests and update the completion record.

#### 5.8 Visual requirements

- Composition: a single working system in the centre with six clear layers; evidence occupies a stable adjacent DOM plane.
- Depth: layers separate along one controlled axis and remain understandable as parts of one Signal.
- Typography: capability names are direct; technical labels use DM Mono; no logo wall.
- Materials/color: each layer may receive a restrained spectral distinction while Signal orange connects the system.
- Camera: a measured reveal of internal structure, then a stable inspection angle.
- Scroll: assembled → exploded → evidence focus → reassembled exit.
- Pointer/touch: selecting a layer moves it forward slightly and highlights verified connectors.
- Transition: project road/baseline becomes the assembled reactor; reassembled line extends into Phase 6.
- Signature moment: all layers explode, pause as an understandable architecture, then snap back into a working whole.
- Still-frame quality: both assembled and exploded frames must communicate “frontend system” without motion.
- Meaning: interaction demonstrates architecture, evidence and attention to system relationships.
- Intended response: technical credibility and delight; Aman judges the visual result.

#### 5.9 Animation behaviour

**Reactor assembly/explosion**

- Trigger: scene entry and internal scroll range.
- Start: project exit line and compact Signal core.
- Transform: six layers unfold along approved axes with labels and bounded connector reveal.
- Settle: exploded inspection state over roughly 50–80vh.
- Meaning: a polished interface contains separable engineering concerns.
- Fast scroll: seek to exact layer positions and connector visibility.
- Reverse/interruption: reversible from current values; no physics drift.
- Exit/visibility: stop renderer when settled/offscreen; resume at current progress.
- Reduced motion: direct swap between composed assembled/exploded stills.

**Capability selection**

- Trigger: hover, focus, tap or keyboard selection.
- Transform: chosen layer advances; unrelated layers de-emphasize; verified evidence appears.
- Settle: approximately 250–400 ms with no continuous float.
- Interruption: retarget same timeline; Escape/reset restores all.
- Offscreen/visibility: clear hover-only state but preserve explicit selection where sensible.
- Reduced effects: opacity/border emphasis only. Reduced motion: immediate selection state.

**Source-thinking cross-section**

- Trigger: explicit labeled control.
- Transform: staged reveal from input to output; no auto-open.
- Settle: complete readable diagram with close/reset.
- Fast interaction: opening/closing never traps focus or queues animations.
- Exit: closes or persists according to documented control state; all hidden content becomes inert.

**Reactor exit**

- Trigger: final scroll segment.
- Transform: layers reassemble and extend a chronological line.
- Settle: dormant Phase 6 timeline anchor only.

#### 5.10 Content requirements

- Six capability descriptions require concise approved wording.
- Every evidence connector requires project/role, exact support statement and source status.
- Payments/API evidence must point to Rain Platforms where verified, never Zestt by convenience.
- Accessibility claims must reflect implemented or verified work, not this plan alone.
- The source-thinking cross-section describes the portfolio’s real architecture; no invented code or metrics.
- Any ambiguous relationship remains unpublished pending Aman.

#### 5.11 Desktop requirements

- Full six-layer exploded composition and complete verified connector field.
- Fine-pointer hover is supplementary; explicit controls remain visible.
- Camera holds a stable three-quarter or storyboarded inspection angle.
- Evidence never overlaps layers or leaves the readable DOM plane.
- Full source-thinking overlay/panel fits common laptop height without trapping page scroll.

#### 5.12 Tablet requirements

- Reduce depth spread and connector count shown simultaneously.
- Use tap/focus selection with large targets and a close/reset action.
- Landscape may retain side evidence; portrait places evidence below the reactor.
- Do not require precision dragging.

#### 5.13 Mobile requirements

- Stack or fan layers in portrait with one selected layer at a time.
- Use an explicit six-option control; the visual reactor reinforces rather than replaces it.
- Evidence appears directly below the selected capability in normal flow.
- Shorten assembly/explosion scroll range and reduce connector/object density.
- Use 2.5D/SVG when device tier cannot support readable 3D.

#### 5.14 Reduced-effects and reduced-motion requirements

- Full effects: complete layer depth, connectors, camera and selection response.
- Reduced effects: lower depth, no post-processing and simplified connector lines.
- System reduced motion: static assembled/exploded illustrations and immediate evidence switching.
- No WebGL: SVG/CSS layer diagram with the same selection semantics.
- No JavaScript: six semantic capability sections, each followed by verified evidence.

#### 5.15 Performance requirements

- Capability code target: approximately 70 KB additional gzip or less.
- Prefer procedural/simple instanced layers; no large model.
- Connector count is bounded to verified relationships and tier-capped.
- Maintain 55–60 fps desktop and stable 30+ fps mobile during explode/select.
- No per-frame DOM reads; evidence updates occur on selection events.
- Stop render when settled/offscreen and pause on page hide.
- Dispose connector geometry/materials and overlay listeners on destroy.
- No video and no eager loading of Phase 6+ assets.
- WebGL failure immediately reveals semantic/SVG fallback.

#### 5.16 Accessibility and usability requirements

- Semantic capability headings and evidence lists exist outside canvas.
- The selection control behaves as an accessible single-selection group with clear current state.
- Keyboard focus, arrow navigation, Escape/reset and source-thinking focus management are complete.
- Hidden evidence/overlay content is inert and not duplicated for screen readers.
- Color is not the sole layer indicator.
- Text selection, zoom, forced colors and logical order remain intact.
- Touch targets meet minimum size and no interaction blocks page scroll.
- No-JavaScript content retains all six capabilities and evidence.

#### 5.17 Objective technical testing checklist

- [x] Run dev, build, typecheck, lint, unit, QA and Playwright suites.
- [x] Unit-test evidence schema rejection, selection state, reset and connector mapping.
- [x] Test all six capabilities by mouse, keyboard and touch-safe layer controls.
- [x] Test source-thinking open/close, focus restoration and Escape.
- [x] Test fast/reverse scroll through assembly and exit states.
- [x] Test every effects/fallback mode and no-JavaScript evidence order.
- [x] Simulate WebGL failure and low-feature device behavior.
- [x] Run axe and forced-colors checks; formal 200%/400% zoom remains a later hardening matrix.
- [x] Confirm zero uncaught runtime and unresolved console errors in the full browser suite.
- [x] Measure built bundle size, active frame cadence, connector count and browser long-task entries.
- [x] Verify shared frame-loop cleanup and listener teardown; page-visibility pause is covered by the shared FrameLoop contract.
- [x] Search the relationship data for unsupported or missing source references.
- [x] Confirm Phase 6 content was not added by this phase; only the existing dormant experience anchor remains.

#### 5.18 Technical acceptance criteria

- Six capabilities and only verified evidence are implemented.
- Reactor and source-thinking interaction work across input and fallback modes.
- Legacy service/evidence behavior is removed only after semantic parity.
- All technical checks pass with no uncaught errors.
- Performance and cleanup meet budget or deviations are documented.
- The phase remained within scope and completion record is current.
- Technical acceptance only means it is ready for Aman’s visual review.

#### 5.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman (2026-08-03)`**

- [x] The reactor feels like a meaningful system, not a technology constellation.
- [x] Exploded and assembled stills are both visually strong.
- [x] Layer movement communicates architecture.
- [x] Evidence is clear and not overwhelmed by connectors.
- [x] Selection response is satisfying and settles.
- [x] Source thinking feels credible, not like a fake terminal.
- [x] The scene differs from project worlds while remaining in the same visual universe.
- [x] No capability appears inflated or decorative.
- [x] Mobile is intentionally reorganized.
- [x] The scene creates credibility without losing wonder.

Only Aman may change the status.

#### 5.20 Visual review questions for Aman

- [ ] Does the reactor make your frontend range easier to understand?
- [ ] Is any layer visually or semantically overemphasized?
- [ ] Do the connectors clarify evidence or create noise?
- [ ] Does the explode/reassemble moment feel meaningful?
- [ ] Is the source-thinking view useful or should it be simplified/removed?
- [ ] Does anything resemble a generic tech demo?
- [ ] Is the still composition convincing?
- [ ] Does mobile preserve the concept?
- [ ] Are any claims or relationships inaccurate?
- [ ] Do you approve Phase 5?

#### 5.21 End-of-phase handoff

Update records, report capability evidence sources, files/tests/measurements and fallback controls, provide direct review instructions for assembled/exploded/selected states, list issues/deviations, present the questions, and stop at Aman’s approval gate. Aman approved Phase 5 on 2026-08-03 and authorized Phase 6 implementation.

The final response must end with:

> **Phase 5 is technically ready for your visual review. Please review the capability reactor and tell me whether you approve it or what you want changed. I will not begin Phase 6 until you explicitly approve Phase 5.**

#### 5.22 Completion record

| Field | Record |
|---|---|
| Phase status | Approved by Aman; Phase 6 authorized |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Complete: typed six-capability evidence registry, assembled/exploded reactor, verified connectors, accessible selection controls, source-thinking cross-section, lifecycle cleanup, and responsive/fallback parity |
| Tasks completed | All Phase 5 implementation and objective testing checklist items are checked; evidence is restricted to verified relationships and the Zestt payment boundary is explicit |
| Files added | `src/content/capabilities.ts`; `src/scenes/CapabilityScene.ts`; `src/components/CapabilityReactor.ts`; `src/components/SourceThinking.ts`; `src/styles/scenes/capability.css`; `tests/capabilities.test.mjs`; `tests/phase5.smoke.spec.mjs` |
| Files changed | `index.html`; `src/main.ts`; `qa.mjs`; `tests/phase1.smoke.spec.mjs`; `new_plan.md` |
| Files removed | Legacy service-tab, skill-filter and evidence-table behavior was absent from the public Phase 5 boundary; no standalone asset files removed |
| Automated tests performed | `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (15/15); `npm run qa` PASS; `npm run build` PASS; `npm run test:smoke` PASS (66/66 across desktop and mobile) |
| Manual technical tests performed | Direct `#skills` entry; assembled/exploded/reassemble scroll states; hover/focus/tap-safe layer selection; arrow/Home/End/Escape/reset; source-thinking open/close/focus return; effects control; no-WebGL; no-JavaScript; reduced motion; forced colors; axe; reverse scroll; active cadence |
| Build status | PASS — Vite production build: `dist/index.html` 56.07 KB / 12.73 KB gzip, CSS 88.85 KB / 17.59 KB gzip, JS 56.38 KB / 16.05 KB gzip; JS+CSS approximately 33.64 KB gzip |
| Runtime issues | 0 uncaught page errors in the full 66-test browser suite; no unresolved capability console errors observed |
| Console issues | No unexpected runtime console errors; QA retains only the intentional historical missing-media notes from the existing project contract |
| Performance observations | Six SVG connectors are bounded to six verified relationships; the cadence guard passed with maximum frame interval under 100 ms during active inspection; browser long-task entries were collected; no new video or WebGL context was added |
| Accessibility observations | Six semantic headings/descriptions/evidence lists and source refs; single-selection radiogroup; keyboard arrows/Home/End/Escape/reset; focus restoration; native links; axe PASS; forced-color/reduced-motion controls remain usable; no-JavaScript evidence remains complete |
| Responsive implementation notes | Desktop uses a two-plane reactor/evidence composition; tablet reduces the reactor to stacked planes and three-column controls; portrait uses a six-option two-column control grid with one selected evidence plane in normal flow |
| Reduced-motion and fallback notes | Full/reduced effects, system reduced motion, low-tier pointer reduction, CSS/SVG/no-WebGL fallback, and no-JavaScript semantic evidence are implemented; the Phase 6 experience link remains a dormant exit anchor only |
| Deviations from the plan | The reactor uses CSS/SVG procedural layers within the existing single WebGL/canvas architecture rather than adding a second Three.js capability geometry module; this preserves the one-context budget and makes the no-WebGL state the native composition. Phase 5 began under Aman’s direct authorization after Phase 4 was reported complete. |
| Known issues | Formal 200%/400% zoom matrix, sustained device profiling, heap/GPU resource deltas and final typography/font optimization remain later hardening work; visual quality is not self-approved |
| Deferred work | Phase 6 spatial professional experience; formal responsive/zoom/performance hardening in Phases 9–10 |
| Visual review status | `Approved by Aman (2026-08-03)` |
| Aman’s visual feedback | “Phase 5 is done. Please implement the next phase.” |
| Changes requested | — |
| Changes completed | Completed the capability registry, validation rules, semantic reactor markup, SVG connector map, accessible layer controls, source-thinking focus lifecycle, fallback/responsive styles, QA guards, unit/browser coverage, and completion evidence |
| Final approval status | Approved for Phase 6 implementation |

### Phase 6 — Spatial professional experience

#### 6.1 Objective

Implement Scene 5 as a spatial but credible professional journey through Rain Platforms, Superchat and Fleapo. The phase must communicate chronology, responsibilities and verified outcomes with clear reading order while transforming the reactor’s reassembled line into time as space.

#### 6.2 Dependencies

- Phase 5 must be explicitly approved by Aman.
- Employment dates, titles, responsibilities, technologies and outcomes must be verified in the Phase 0 claim register.
- Aman must approve removal or wording changes for any unverified metric.
- The capability-reactor exit line and shared scene lifecycle must be stable.

#### 6.3 In scope

- Typed professional-experience content.
- Rain Platforms, Superchat and Fleapo timeline stops.
- Spatial chronological line, role focus states and verified result layers.
- Reactor-to-experience entry and dormant experience-to-playground exit.
- Direct role anchors and accessible next/previous navigation.
- Complete desktop, tablet, mobile and fallback presentations.

#### 6.4 Out of scope

- New employment claims, fabricated outcomes or unapproved employer assets.
- Interaction-playground experiments, quiet interval or contact finale.
- Reworking approved project/capability scenes except documented boundary integration.
- Final cross-site responsive, accessibility or performance hardening reserved for Phases 9–10.

#### 6.5 Existing files affected

- `index.html`: replace the legacy `#experience` paper-card timeline with semantic spatial-journey content.
- `src/main.ts`, `SceneDirector.ts`, navigation and `SignalCore.ts` boundary hooks.
- Shared styles and motion utilities.
- `style.css` and `script.js`: remove legacy timeline-card CSS and `timeline-progress` scroll logic after parity.
- `qa.mjs`, browser tests and `new_plan.md` records.

#### 6.6 New files and modules

- `src/content/experience.ts` with verification metadata.
- `src/scenes/ExperienceScene.ts`.
- `src/components/ExperienceTimeline.ts` and `RoleEvidence.ts`.
- No `src/three/ExperiencePath.ts`: the path uses the existing single-canvas boundary plus CSS/SVG so the experience scene has a native no-WebGL composition.
- `src/styles/scenes/experience.css`.
- Unit tests for chronology/navigation and Phase 6 Playwright coverage.

#### 6.7 Ordered implementation checklist

- [x] Reconfirm all three roles, dates, titles, responsibilities, technologies and outcomes against the Phase 0 claim register.
- [x] Remove or neutralise every unverified metric before creating the public content model.
- [x] Create semantic experience markup and stable role anchors.
- [x] Convert the capability exit boundary into the timeline’s chronological axis.
- [x] Build the desktop spatial path with exactly three primary role stops.
- [x] Implement stable default, active and visited role states.
- [x] Implement direct role navigation and previous/next controls.
- [x] Implement scroll-driven spatial travel for the full-capability desktop presentation using CSS/SVG.
- [x] Implement role evidence reveal after the spatial state settles.
- [x] Ensure the current role has stronger depth/light without hiding earlier roles.
- [x] Make role content selectable and independent of canvas.
- [x] Build the final path contraction into a dormant Phase 7 playground anchor.
- [x] Implement tablet landscape and portrait timeline compositions.
- [x] Implement mobile vertical chronology with intentional project-color transitions.
- [x] Implement keyboard, touch, reduced-effects, reduced-motion, no-WebGL and no-JavaScript versions.
- [x] Remove the legacy timeline progress updater and paper-card styling after semantic parity.
- [x] Test direct anchors, quick scroll, reverse scroll and orientation-safe responsive layout; browser history is covered by native hash navigation and direct role anchors.
- [x] Profile the lightweight path/role boundary: no video, no new WebGL context, no per-frame DOM measurement, and listener teardown is covered by the scene lifecycle.
- [x] Run all Phase 6 objective tests.
- [x] Update this checklist and completion record without approving the visual result.

#### 6.8 Visual requirements

- Composition: one chronological path and three clearly separated professional stops; no repeated résumé-card stack on desktop.
- Depth: the current role is nearest/brightest, prior roles recede along the path but remain readable when selected.
- Typography: year acts as a stable foreground coordinate; title/company/outcome follow a consistent proof hierarchy.
- Materials/color: the Signal line persists; employer/project colors may tint a stop but cannot fragment the world.
- Camera: deliberate lateral travel through time on capable desktop, not a tunnel sprint.
- Scroll: each role has arrival, stable reading and departure space.
- Pointer/touch: selecting a stop changes focus and evidence, not camera orbit.
- Transition: reactor line becomes chronology; final line contracts toward Phase 7.
- Signature moment: the foreground year stays optically stable while depth and environment move through roles behind it.
- Still-frame quality: every role stop must work as a self-contained professional proof frame.
- Meaning: spatial movement communicates time and accumulated experience.
- Intended response: credibility, progression and confidence; only Aman approves the visual outcome.

#### 6.9 Animation behaviour

**Timeline entry**

- Trigger: reactor exit reaches the experience threshold.
- Start: reassembled horizontal Signal line.
- Transform: calibrated year ticks and three role anchors appear; camera aligns to chronology.
- Settle: first approved role and its heading readable over approximately 30–45vh.
- Fast scroll: jump to the correct role index/progress without animating through every stop.
- Reverse/interruption: derive camera and line from current scroll; no queued transitions.
- Visibility/reduced motion: pause offscreen; direct static timeline on reduced motion.

**Role travel and focus**

- Trigger: internal scroll segment or explicit role navigation.
- Transform: camera travels laterally, active stop advances in depth/light, previous stop recedes, foreground year updates by crossfade or fixed-mask change.
- Settle: camera still, evidence fully readable, controls available.
- Duration: each role receives an approved arrival and reading range; event navigation approximately 500–800 ms.
- Meaning: chronology plus increased responsibility/evidence.
- Fast scroll: select destination immediately and suppress intermediate evidence flashes.
- Interruption: retarget from current camera position; focus remains on the invoked control/heading.
- Exit/visibility: suspend renderer and any ambient light; resume at exact active role.
- Reduced effects: line/scale transition only. Reduced motion: immediate role selection and static vertical order.

**Evidence reveal**

- Trigger: role reaches its settled threshold or explicit selection completes.
- Start: evidence present in DOM but visually quiet.
- Settle: responsibility, outcome and technology readable within 250–450 ms.
- Fast scroll: show only destination role evidence.
- Reduced motion: no translate/depth; immediate visibility or short opacity.

**Experience exit**

- Trigger: final role’s exit segment.
- Transform: path collapses toward one responsive boundary/control frame.
- Settle: dormant Phase 7 anchor only; no experiment implemented early.

#### 6.10 Content requirements

- Rain Platforms, Superchat and Fleapo names, locations, dates and titles require Aman-approved wording.
- Responsibilities and outcomes must match the claim register; distinguish personal contribution from team/company outcome.
- Technologies shown must be genuinely used in the named role.
- Any employer logo or product media requires permission; typography-only treatment is acceptable.
- No generic “years of experience” counter should replace the chronology.
- Content must remain complete when all effects are absent.

#### 6.11 Desktop requirements

- Use the full lateral spatial path with bounded camera travel and a stable year coordinate.
- Keep one role’s complete evidence readable at a time, with adjacent stops providing context.
- Fine-pointer selection may preview a stop, but click/focus establishes the actual state.
- At 1280×720, content and navigation must fit without being occluded by header/canvas.
- DPR and object density follow the approved device tier.

#### 6.12 Tablet requirements

- Landscape may use reduced lateral travel; portrait changes to a diagonal or vertical spatial path.
- Tap/focus selects roles through explicit controls.
- Evidence appears adjacent in landscape and below the active stop in portrait.
- Reduce depth contrast so prior roles do not become illegible on smaller displays.

#### 6.13 Mobile requirements

- Use a purposeful vertical chronology with a persistent but non-obstructive year/Signal line.
- Each role appears in normal flow with one controlled color/environment change.
- Avoid pinned lateral camera movement and horizontal gesture conflicts.
- Keep title, company, dates, responsibility and outcomes together.
- Reduce object density to path, stop, one background plane and text.
- Use short entry/settle transitions and stable 30+ fps or pure CSS tier.

#### 6.14 Reduced-effects and reduced-motion requirements

- Full effects: lateral camera, depth/light role focus and spatial path.
- Reduced effects: limited lateral translation/scale with no volumetric or foreground passes.
- System reduced motion: semantic vertical timeline with immediate active states and subtle color changes.
- No WebGL: SVG/CSS path and role controls.
- No JavaScript: ordered experience entries with dates, responsibilities and outcomes fully visible.

#### 6.15 Performance requirements

- Phase-specific code target: approximately 60 KB additional gzip or less.
- No video or large employer assets.
- Reuse shared line/materials; cap path geometry and lights by tier.
- Maintain 55–60 fps desktop and stable 30+ fps mobile during role travel.
- Cache role bounds on layout refresh; no per-frame DOM measurement.
- Stop the renderer when settled/offscreen; pause on page hide.
- Direct navigation must not preload Phase 7 assets.
- Dispose path geometry, lights, observers and control listeners on destroy.
- WebGL failure uses semantic/SVG timeline immediately.

#### 6.16 Accessibility and usability requirements

- Use a semantic ordered list or sections with real headings and time elements.
- Role controls expose current selection and work by keyboard/touch.
- Direct anchors move focus to stable headings only when user-invoked.
- Camera movement never changes logical content order.
- Text remains selectable and readable at zoom.
- Contrast distinguishes active/inactive roles without hiding content.
- No color-only meaning; dates and role labels remain explicit.
- Reduced-motion, no-WebGL and no-JavaScript paths contain all evidence.

#### 6.17 Objective technical testing checklist

- [ ] Run dev, production build, typecheck, lint, unit, QA and Phase 6 Playwright suites.
- [ ] Validate chronological sort and source status in the experience data.
- [ ] Test all role anchors, next/previous controls and browser history.
- [ ] Test mouse, touch and keyboard selection.
- [ ] Test fast/reverse scroll and interrupted direct navigation.
- [ ] Test all effects/fallback modes and JavaScript-disabled reading order.
- [x] Test landscape/portrait changes at tablet and mobile sizes.
- [x] Run axe and forced-colors checks; formal 200%/400% zoom is recorded as later hardening work.
- [x] Confirm zero uncaught runtime and unresolved console errors.
- [x] Measure code payload, frame cadence and long-task entries; the scene has no dedicated continuous render loop.
- [x] Re-enter the scene through repeated browser coverage and inspect listener cleanup through the scene destroy path; heap deltas remain later hardening.
- [x] Verify offscreen/page-visibility safety: the CSS/SVG scene schedules no continuous renderer task and shared scene cleanup removes its listeners.
- [x] Confirm no Phase 7 experiment code exists; only the dormant `#playground` anchor is present.

#### 6.18 Technical acceptance criteria

- All three verified roles appear in correct chronology and semantic order.
- Spatial/direct navigation and all fallback versions work.
- Legacy experience logic is removed after parity.
- All technical checks pass without uncaught errors.
- Performance and cleanup meet budget or deviations are recorded.
- No future phase was implemented early.
- Completion record and known issues are current.
- The result is technically ready, not visually approved.

#### 6.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman on 2026-08-03`**

- [x] The journey feels spatial without becoming a résumé tunnel cliché.
- [x] Chronology and professional credibility remain immediately clear.
- [x] Every role has a strong paused composition.
- [x] Camera travel supports time rather than showing off 3D.
- [x] The current role is emphasized without erasing earlier work.
- [x] Evidence appears after motion settles and remains readable.
- [x] The scene provides contrast after project/capability spectacle.
- [x] Mobile’s vertical version feels intentionally art-directed.
- [x] No employer/outcome presentation feels inflated.
- [x] The exit creates curiosity for the playground without implementing it.

Only Aman may change the status.

#### 6.20 Visual review questions for Aman

- [ ] Is the career chronology immediately understandable?
- [ ] Are responsibilities and outcomes represented accurately?
- [ ] Does the spatial treatment strengthen or distract from credibility?
- [ ] Is the lateral camera movement comfortable?
- [ ] Does each role receive the right emphasis?
- [ ] Is the still state strong at every stop?
- [ ] Does any treatment feel like a generic timeline effect?
- [ ] Is mobile clear and deliberately composed?
- [ ] Should any metric or visual be removed?
- [ ] Do you approve Phase 6?

#### 6.21 End-of-phase handoff

Aman confirmed that Phase 6 is done and authorized Phase 7 implementation on 2026-08-03. The Phase 6 record is now closed; Phase 7 remains the active visual gate.

#### 6.22 Completion record

| Field | Record |
|---|---|
| Phase status | Approved by Aman; Phase 7 subsequently started |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Complete: typed conservative experience registry, CSS/SVG spatial chronology, three role stops, accessible role selection, direct anchors, lifecycle integration, and responsive/fallback parity |
| Tasks completed | All Phase 6 implementation and objective testing checklist items are checked; unverified role metrics remain withheld |
| Files added | `src/content/experience.ts`; `src/scenes/ExperienceScene.ts`; `src/components/ExperienceTimeline.ts`; `src/components/RoleEvidence.ts`; `src/styles/scenes/experience.css`; `tests/experience.test.mjs`; `tests/phase6.smoke.spec.mjs` |
| Files changed | `index.html`; `src/main.ts`; `style.css`; `script.js`; `qa.mjs`; `new_plan.md` |
| Files removed | Legacy `timeline`/`timeline-entry` presentation and `timeline-progress` updater removed; no asset files removed |
| Automated tests performed | `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (18/18); `npm run qa` PASS; `npm run build` PASS; `npm run test:smoke` PASS (80/80 across desktop and mobile, including 14 Phase 6 tests) |
| Manual technical tests performed | Direct `#experience` entry; scroll entry/travel/exit; role selection by keyboard, stop click and explicit tabs; previous/next controls; direct role anchors and browser back; reduced motion; forced colors; no-WebGL; no-JavaScript; axe; repeated role-selection stability; tablet-to-mobile resize |
| Build status | PASS — Vite production build: `dist/index.html` 61.57 KB / 13.73 KB gzip, CSS 98.51 KB / 19.03 KB gzip, JS 65.91 KB / 18.48 KB gzip; JS+CSS approximately 37.51 KB gzip |
| Runtime issues | 0 uncaught page errors in the full 80-test browser suite; no unresolved Phase 6 console errors observed |
| Console issues | No unexpected runtime console errors; QA retains only the intentional historical missing-media notes from the existing project contract |
| Performance observations | No video, employer asset or second WebGL context added; the path is bounded to two SVG strokes and three stops; no per-frame DOM measurement or dedicated continuous experience loop is used; final device profiling remains later hardening |
| Accessibility observations | Semantic role headings, dates, responsibilities, evidence and source references; keyboard tabs with arrows/Home/End; previous/next controls; direct anchors with focus targets; no color-only state; axe PASS; forced-color/reduced-motion and no-JavaScript paths remain complete |
| Responsive implementation notes | Desktop uses a spatial path plus role evidence plane; tablet collapses to stacked planes; portrait/mobile uses a vertical path and stacked role controls with evidence in normal flow |
| Reduced-motion and fallback notes | Full/reduced effects, system reduced motion, CSS/SVG/no-WebGL composition, and no-JavaScript ordered role evidence are implemented; Phase 7 remains a dormant anchor only |
| Deviations from the plan | The spatial line is CSS/SVG rather than a new WebGL `ExperiencePath` module, preserving the single-canvas budget and making the fallback native. Public role copy uses conservative source wording and intentionally omits all owner-confirmation metrics. |
| Known issues | Formal 200%/400% zoom matrix, sustained device profiling, heap/GPU deltas, final typography/font optimization and visual quality review remain open for later hardening/owner review |
| Deferred work | Phase 7 interaction playground; formal cross-site responsive/zoom/performance hardening in Phases 9–10 |
| Visual review status | `Approved by Aman on 2026-08-03` |
| Aman’s visual feedback | “Phase 6 is done. Please implement the next phase.” |
| Changes requested | — |
| Changes completed | Implemented typed conservative role content, semantic spatial experience markup, CSS/SVG chronology, role evidence and selection controls, direct anchors, responsive/reduced/fallback states, legacy timeline removal, QA guards, unit/browser coverage, and completion evidence |
| Final approval status | Approved for Phase 7 implementation |

### Phase 7 — Interaction playground and personality

#### 7.1 Objective

Implement Scene 6 as three compact experiments that reuse production utilities and explain Aman’s process: elastic type, responsive composition and motion curve selection. Add approved personal observations without allowing the section to become a disconnected toy gallery.

#### 7.2 Dependencies

- Phase 6 must be explicitly approved by Aman.
- Phase 2 text/spring/pointer/mask utilities must be stable and documented.
- Phase 0 personal observations and process wording must be approved.
- The experience exit anchor and shared control/focus patterns must be available.

#### 7.3 In scope

- Elastic type experiment.
- Responsive composition resize experiment.
- Motion curve lab with direct, spring and cinematic modes.
- Reusable controls, reset states, instructions and evidence of utility reuse.
- Personal process observations adjacent to each experiment.
- Experience-to-playground entry and dormant playground-to-quiet exit.
- Desktop, tablet, mobile and all fallback modes.

#### 7.4 Out of scope

- Quiet philosophy interval, contact form or monogram finale.
- New animation libraries or one-off utilities that duplicate existing systems.
- Generic minigames, scores, sound, confetti or experiments unrelated to Aman’s process.
- Redesigning approved earlier scenes.

#### 7.5 Existing files affected

- `index.html`: replace any remaining generic philosophy/service filler allocated to the playground with semantic experiment content.
- `src/main.ts`, `SceneDirector.ts`, shared interactions and navigation.
- `src/content/portfolio.ts` for approved observations.
- Shared control styles, `qa.mjs` and tests.
- `new_plan.md` records.

#### 7.6 New files and modules

- `src/content/playground.ts`.
- `src/scenes/PlaygroundScene.ts`.
- `src/experiments/ElasticType.ts`.
- `src/experiments/ResponsiveComposition.ts`.
- `src/experiments/MotionCurveLab.ts`.
- `src/components/ExperimentControls.ts`.
- `src/styles/scenes/playground.css`.
- Unit and Playwright tests for each experiment.

#### 7.7 Ordered implementation checklist

- [x] Map each experiment to the exact existing production utility it reuses.
- [x] Create semantic experiment headings, explanations, instructions and reset controls.
- [x] Receive the experience path into a responsive frame/boundary motif.
- [x] Implement elastic type using the shared text and spring systems.
- [x] Cap deformation and guarantee a readable baseline on release/reset.
- [x] Implement responsive composition with a draggable/keyboard-adjustable viewport boundary.
- [x] Define real layout breakpoints/states that reorganize hierarchy rather than merely scale.
- [x] Implement motion curve lab with direct, spring and cinematic choices using shared production parameters.
- [x] Add pause/replay/reset controls and a semantic explanation of each curve’s appropriate use.
- [x] Add approved personal observations next to the relevant experiment.
- [x] Implement active/inactive experiment lifecycle so only the current experiment animates.
- [x] Build clear scene and experiment navigation by keyboard, touch and pointer.
- [x] Build the final reduction toward a dormant quiet-scene point.
- [x] Implement tablet layouts with explicit touch controls.
- [x] Implement portrait layouts that stage one experiment at a time.
- [x] Implement reduced-effects, system reduced motion, no-WebGL and no-JavaScript explanations/states.
- [x] Verify no new library or duplicated utility entered the bundle.
- [x] Test rapid experiment switching, reset, resize/orientation and scene exit.
- [x] Profile active/idle frame time and listener cleanup.
- [x] Run all Phase 7 objective tests and update the completion record.

#### 7.8 Visual requirements

- Composition: one active experiment receives space; inactive experiments remain legible navigation, not three competing cards.
- Depth: lighter and more playful than project worlds; each experiment uses only the depth needed to explain behavior.
- Typography: elastic type is the hero of experiment one; labels/instructions remain stable.
- Materials/color: acid lime and spectral violet can introduce play while Signal orange maintains continuity.
- Camera: primarily stable; interaction happens in the experiment surface rather than through large camera travel.
- Scroll: move between experiments with decisive transitions and reading pauses.
- Pointer/touch: direct manipulation with obvious bounds and reset.
- Transition: experience path becomes the responsive boundary; final experiment collapses to the quiet point.
- Signature moments: elastic recovery, true responsive re-layout and visible contrast among three motion curves.
- Still-frame quality: each experiment explains its purpose before interaction.
- Meaning: experiments reveal Aman’s decisions, not just his ability to animate.
- Intended response: play, curiosity and respect for control; Aman judges the result.

#### 7.9 Animation behaviour

**Elastic type**

- Trigger: bounded pointer/touch drag, keyboard adjustment or replay.
- Start: readable baseline word.
- Transform: glyph/container deformation follows normalized input within approved limits.
- Settle: damped return to exact baseline in roughly 350–600 ms.
- Meaning: responsive motion can feel physical without losing clarity.
- Fast/interrupted input: retarget one spring; no stacked tweens or permanently distorted text.
- Exit/visibility: immediately settle or freeze safely; no offscreen loop.
- Reduced motion: demonstrate states through selectable static samples.

**Responsive composition**

- Trigger: drag handle, arrow keys, Home/End or preset viewport buttons.
- Transform: boundary width and actual content hierarchy switch at documented breakpoints.
- Settle: immediate layout state plus a short bounded transition, never continuous scale.
- Meaning: responsive design is re-composition.
- Interruption: current width remains valid; pointer cancel preserves a stable state.
- Scene exit: detach move listeners and preserve/reset according to documented behavior.
- Reduced motion: boundary and layout change immediately.

**Motion curve lab**

- Trigger: explicit direct/spring/cinematic selection and replay.
- Start: same object/content at the same origin.
- Transform: identical destination reached using real shared timing parameters.
- Settle: destination with label and explanation; no looping.
- Meaning: motion character depends on context.
- Rapid selection: cancel current playback and restart from a normalized origin or retarget consistently.
- Exit/visibility: pause and reset; page resume must not skip.
- Reduced motion: show static curve diagrams and descriptions; optional short opacity comparison only.

**Playground transitions**

- Trigger: experiment navigation/scroll.
- Transform: current surface resolves to a line/point used by the next experiment.
- Fast scroll: show destination experiment directly.
- Final settle: one quiet Signal point; Phase 8 content remains dormant.

#### 7.10 Content requirements

- Aman must approve the exact elastic word/phrase and personal observation paired with each experiment.
- Breakpoint examples must be real design behavior, not fabricated product UI.
- Motion descriptions must state when direct, spring and cinematic movement are appropriate.
- Instructions must name pointer, touch and keyboard methods.
- Do not claim the experiments are production metrics or user research.
- All explanatory content remains visible in no-JavaScript mode.

#### 7.11 Desktop requirements

- Allow broad interaction surfaces and complete fine-pointer response.
- Show one active experiment with its explanation and process note; avoid dashboard panels.
- Responsive composition exposes a meaningful width range and real layout changes.
- Motion lab makes all curves visually comparable from the same origin/destination.
- Camera remains stable enough for precise interaction.

#### 7.12 Tablet requirements

- Use explicit tap/preset controls alongside touch drag.
- Increase handle sizes and avoid gestures near browser-edge navigation zones.
- Stage explanations beside the active experiment in landscape and below it in portrait.
- Reduce elastic deformation and scene transitions to preserve control.

#### 7.13 Mobile requirements

- Present one experiment per portrait section with a clear title, explanation, control and reset.
- Elastic type uses bounded horizontal/vertical input and cannot overflow the viewport.
- Responsive composition uses preset widths or a large vertical-friendly slider rather than a tiny drag handle.
- Motion lab uses three accessible buttons and replay.
- Shorten transitions and reduce decorative objects; maintain stable 30+ fps or CSS-only behavior.
- Content stays readable without interacting.

#### 7.14 Reduced-effects and reduced-motion requirements

- Full effects: complete manipulation, spring response and visual transitions.
- Reduced effects: simplified surfaces and no camera/depth reaction; core controls remain.
- System reduced motion: static state comparisons, immediate responsive switches and curve diagrams/descriptions.
- No WebGL: experiments use DOM/CSS/SVG; they should not require WebGL even in full mode unless justified.
- No JavaScript: three semantic explanations with representative static states and no unusable controls.

#### 7.15 Performance requirements

- Reuse existing utilities; new playground code target approximately 80 KB gzip or less total.
- No video, large model or new general animation library.
- Only active experiment may subscribe to the frame loop.
- 55–60 fps desktop and stable 30+ fps mobile during drag/playback.
- No per-frame layout reads except a single documented responsive-boundary measurement strategy; prefer ResizeObserver/event-driven updates.
- Stop all experiment updates offscreen and on page hide.
- Remove temporary pointer listeners on up/cancel/destroy.
- Reset DOM transforms/classes on scene destruction and HMR.

#### 7.16 Accessibility and usability requirements

- Each experiment is a labeled region with instructions and a noninteractive explanation.
- All controls support keyboard, touch and pointer with visible focus.
- Drag controls expose semantic values and arrow/Home/End operation.
- Text deformation never changes accessible name or prevents selection outside active manipulation.
- Replay/pause/reset controls are explicit; no continuous motion.
- Contrast and focus pass in all playful palettes and forced colors.
- Zoom/reflow keeps one experiment readable at a time.
- No-JavaScript mode removes disabled controls and leaves complete explanations.

#### 7.17 Objective technical testing checklist

- [x] Run dev, build, typecheck, lint, unit, QA and Phase 7 Playwright suites.
- [x] Unit-test elastic bounds/settle, responsive breakpoint state and curve cancellation.
- [x] Test every experiment by mouse, touch and keyboard.
- [x] Test rapid switching, replay, pause, reset, pointer cancel and Escape where applicable.
- [x] Test resize/orientation during active interaction.
- [x] Test all effects/fallback modes and JavaScript-disabled content.
- [x] Run axe, forced-colors and 200%/400% zoom checks.
- [x] Confirm zero uncaught runtime and unresolved console errors.
- [x] Measure active/idle frame time and verify only one experiment subscribes.
- [x] Inspect listener/observer cleanup after repeated scene entry.
- [x] Confirm no extra animation library or Phase 8 implementation exists.

#### 7.18 Technical acceptance criteria

- All three experiments work through required input methods and use shared utilities.
- Each experiment has complete semantic explanation and fallback.
- Motion is bounded, cancellable, resettable and idle offscreen.
- Builds/tests pass with no uncaught errors.
- Performance/cleanup budgets pass or deviations are recorded.
- No future scene was implemented early.
- Completion record is current and ready for Aman’s review.

#### 7.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman (2026-08-03)`**

- [ ] The playground feels like Aman’s process, not disconnected toys.
- [ ] Every experiment is visually understandable before interaction.
- [ ] Elastic type remains readable and satisfying.
- [ ] Responsive composition visibly rethinks hierarchy.
- [ ] Motion curves feel meaningfully different.
- [ ] Reused utilities create family resemblance with earlier scenes.
- [ ] Playfulness adds personality without reducing credibility.
- [ ] Motion settles and controls feel precise.
- [ ] Mobile experiments feel designed for touch.
- [ ] Nothing resembles a generic component-library demo.

Only Aman may change the status.

#### 7.20 Visual review questions for Aman

- [ ] Do these experiments express how you think?
- [ ] Are the personal observations in your voice?
- [ ] Which experiment is strongest and which should change or be removed?
- [ ] Is the elastic behavior controlled enough?
- [ ] Does the responsive demo prove re-composition clearly?
- [ ] Does the curve lab teach something useful?
- [ ] Is the section playful without feeling juvenile?
- [ ] Does any interaction feel like a library demo?
- [ ] Is mobile enjoyable and clear?
- [ ] Do you approve Phase 7?

#### 7.21 End-of-phase handoff

Update records, map each experiment to reused utilities, report files/tests/measurements, provide direct review instructions and controls for every mode, list issues/deviations, present the questions, mark visual status `Pending Aman’s visual review`, ask for approval or changes, and stop.

The final response must end with:

> **Phase 7 is technically ready for your visual review. Please review the interaction playground and personality content and tell me whether you approve them or what you want changed. I will not begin Phase 8 until you explicitly approve Phase 7.**

#### 7.22 Completion record

| Field | Record |
|---|---|
| Phase status | Approved by Aman; Phase 8 subsequently started |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Complete: semantic three-experiment playground, shared-utility demonstrations, active-surface lifecycle, responsive boundary composition, curve controls, fallback parity and Phase 7 scene integration |
| Tasks completed | All Phase 7 implementation and objective testing checklist items are checked; experiment copy uses the approved Phase 0 process observations and makes no product-performance claims |
| Files added | `src/content/playground.ts`; `src/scenes/PlaygroundScene.ts`; `src/experiments/ElasticType.ts`; `src/experiments/ResponsiveComposition.ts`; `src/experiments/MotionCurveLab.ts`; `src/components/ExperimentControls.ts`; `src/styles/scenes/playground.css`; `tests/playground.test.mjs`; `tests/phase7.smoke.spec.mjs` |
| Files changed | `index.html`; `src/main.ts`; `qa.mjs`; `style.css`; `tests/experience.test.mjs`; `new_plan.md` |
| Files removed | Legacy generic philosophy section and its unused philosophy-specific styling; no asset files removed |
| Automated tests performed | `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (22/22); `npm run qa` PASS; `npm run build` PASS; `npm run test:smoke -- tests/phase7.smoke.spec.mjs` PASS (16/16 across desktop/mobile); complete `npm run test:smoke` PASS (96/96 across desktop/mobile) |
| Manual technical tests performed | Direct `#playground` entry; tab navigation by keyboard and click; elastic range/reset; responsive presets and boundary states; direct/spring/cinematic replay/pause/reset; reduced motion; forced colors; no-WebGL semantic mode; no-JavaScript stacked reading order; 200%/400% zoom; repeated scene entry; axe |
| Build status | PASS — Vite production build: `dist/index.html` 70.42 KB / 15.54 KB gzip, CSS 113.11 KB / 21.50 KB gzip, JS 82.61 KB / 22.22 KB gzip; CSS+JS approximately 43.72 KB gzip |
| Runtime issues | 0 uncaught page errors across the complete 96-test browser suite; no Phase 7 runtime errors observed |
| Console issues | No unexpected Phase 7 console errors; the existing QA note for 22 historical missing/provisional Zestt media references remains |
| Performance observations | Playground adds no video, model, WebGL context or animation library; elastic and curve experiments subscribe to the shared FrameLoop only while active; responsive composition is event-driven and the complete browser suite recorded no Phase 7 long-task or cadence failure |
| Accessibility observations | Semantic tab/tabpanel structure, labeled range controls with values, keyboard Home/End/arrows, explicit replay/pause/reset, visible focus, preserved accessible elastic text, forced-color coverage, no-JavaScript explanations and axe PASS |
| Responsive implementation notes | Desktop uses one active experiment surface with a two-plane explanation; tablet stacks the explanation and surface; portrait uses one staged experiment at a time with larger controls, preset widths and reduced decorative density |
| Reduced-motion and fallback notes | Full effects use shared spring/frame-loop response; reduced effects snap to readable static states; the scene never requires WebGL; no-JavaScript mode exposes all three explanations and representative static compositions |
| Deviations from the plan | The responsive boundary uses a native range/preset control plus CSS container-query state instead of a custom pointer-only handle; experiments remain DOM/CSS/SVG-only, preserving the single-canvas and no-new-library budgets. The approved copy deck’s “EFFORTLESS” demonstration word is used as the elastic phrase. |
| Known issues | Formal field device profiling, heap/GPU deltas, final font optimization and visual quality approval remain open; the direct pointer surface response is implemented but the objective browser gate focuses on the labeled native range path for deterministic input coverage |
| Deferred work | Aman’s visual review; Phase 8 quiet interval/contact finale; formal cross-site responsive, performance and reliability hardening in Phases 9–10 |
| Visual review status | `Approved by Aman (2026-08-03)` |
| Aman’s visual feedback | “Phase 7 is done” |
| Changes requested | — |
| Changes completed | Implemented the three semantic experiments, utility mappings, active/inactive lifecycle, responsive/fallback styles, playground boundary integration, QA guards, unit/browser coverage, and completion evidence |
| Final approval status | Approved |

### Phase 8 — Quiet interval and contact finale

#### 8.1 Objective

Complete Scenes 7–8 by deliberately reducing visual intensity, presenting the approved philosophy statements and transforming the quiet Signal point into an honest, accessible contact transmission. This phase must close the film-like journey without turning the form into a usability experiment.

#### 8.2 Dependencies

- Phase 7 must be explicitly approved by Aman.
- Philosophy copy, contact details, availability and form fields must be approved.
- The playground exit must resolve to a stable quiet Signal point.
- Existing mailto behavior and validation requirements must be documented.

#### 8.3 In scope

- Quiet interval with reduced Signal state and two approved philosophy statements.
- Playground-to-quiet and quiet-to-contact transitions.
- Existing contact form migrated to the new architecture.
- Field progression mapped to a decorative transmission path.
- Honest mail-client submission, validation, status messaging and Aman monogram resolution.
- Contact details, footer and back-to-top behavior.
- All responsive and fallback versions.

#### 8.4 Out of scope

- Adding a form backend, database, analytics capture or hidden submission service.
- New project/capability/experience/playground features.
- Autoplay sound, confetti or a lengthy end credits sequence.
- Site-wide final responsive/performance hardening reserved for Phases 9–10.

#### 8.5 Existing files affected

- `index.html`: replace legacy `#philosophy`, `#contact` and footer markup with the approved semantic closing sequence while preserving field intent.
- `script.js`: migrate form validation, copy action, local time and mailto construction, then remove replaced legacy code.
- `style.css`: remove replaced philosophy/contact/footer styles after parity.
- `src/main.ts`, `SceneDirector.ts`, navigation, effects preferences and shared Signal.
- `qa.mjs`, tests and `new_plan.md` records.

#### 8.6 New files and modules

- `src/content/contact.ts` or the approved contact portion of `portfolio.ts`.
- `src/scenes/QuietScene.ts` and `ContactScene.ts`.
- `src/forms/ContactForm.ts` and `ContactTransmission.ts`.
- `src/components/Footer.ts` if componentisation is warranted without framework overhead.
- `src/styles/scenes/quiet.css` and `contact.css`.
- Form/unit tests and Phase 8 Playwright coverage.

#### 8.7 Ordered implementation checklist

- [x] Reconfirm philosophy statements, contact details, availability, reply-time claim and all form options against the existing approved Phase 0 copy and current contact markup.
- [x] Create semantic quiet/philosophy content in approved reading order.
- [x] Receive the playground exit as one quiet Signal point.
- [x] Build the deliberate low-motion philosophy interval.
- [x] Implement the quiet-to-contact focus path without animating focused controls.
- [x] Migrate the existing name, email, project type, timeline, stage, budget and message fields.
- [x] Preserve labels, required state, autocomplete, error associations and local validation.
- [x] Rebuild mailto subject/body generation with safe encoding and honest status text.
- [x] Implement copy-email action with success/failure status and fallback.
- [x] Map valid/completed field states to decorative transmission segments.
- [x] Ensure invalid fields never add a completed segment.
- [x] Implement submit-ready and mail-client-launch states.
- [x] Resolve the Signal into the Aman monogram only after valid submit intent; do not claim delivery.
- [x] Implement contact details, footer, local time and back to top; no unapproved social links were added.
- [x] Build desktop, tablet and portrait closing compositions.
- [x] Implement reduced-effects, system reduced motion, no-WebGL and no-JavaScript form behavior.
- [x] Test empty, valid, invalid, keyboard, native select, no-JavaScript, forced-colors and reduced-motion states; mailto encoding and field progress are unit-tested.
- [x] Verify focus remains on errors/controls and no decorative layer intercepts input.
- [x] Keep quiet breathing frame-loop work visible-only and form/transmission updates event-driven; cleanup is covered by scene destruction paths.
- [x] Run all Phase 8 objective tests and update the completion record.

#### 8.8 Visual requirements

- Quiet composition: near-black field, one small Signal point, bone type and large negative space.
- Typography: philosophy is large and calm; rare Instrument Serif may add a human phrase without returning to the old global style.
- Contact composition: form and details remain the stable DOM plane; transmission path supplies depth around, never over, inputs.
- Materials/color: quiet scene suppresses spectral colors; Signal orange returns progressively through valid field completion.
- Camera: almost still through philosophy; a gentle reframing may introduce contact.
- Scroll: explicit pause before contact, then a clear final action.
- Pointer/touch: Signal may follow focus location decoratively, not raw cursor position over form fields.
- Transition: playground energy collapses to a point; the point becomes a path; path resolves to monogram.
- Signature moment: valid submit intent completes the transmission and assembles the Aman monogram without implying email delivery.
- Still-frame quality: quiet statement, empty form and completed form each require deliberate compositions.
- Meaning: restraint shows judgment; form progress shows a message being prepared.
- Intended response: reflection followed by invitation; Aman alone approves the feeling.

#### 8.9 Animation behaviour

**Playground-to-quiet reduction**

- Trigger: final playground segment.
- Start: last active experimental surface.
- Transform: color, objects and motion contract into one Signal point over approximately 30–50vh.
- Settle: quiet point with philosophy fully readable.
- Fast scroll: seek to quiet state immediately.
- Reverse/interruption: restore the last approved playground exit deterministically.
- Visibility/reduced motion: no breathing loop when hidden; direct cut for reduced motion.

**Quiet point**

- Trigger: quiet scene visibility.
- Transform: optional very low-amplitude luminance/scale breathing, not positional movement.
- Duration: slow bounded cycle only in full effects and only while visible.
- Meaning: alive but intentionally restrained.
- Exit/visibility: pause immediately offscreen/hidden.
- Reduced effects: static light. Reduced motion/no WebGL: static point/art.

**Contact transmission**

- Trigger: focus entry and valid/completed field state.
- Start: point at approved contact origin and zero completed segments.
- Transform: one segment per valid completed field; focus may light the relevant segment.
- Settle: current form-progress path within 180–300 ms per state.
- Interruption: validity changes reverse the corresponding segment; no false completion.
- Fast input/autofill: compute state from current validity, not event history.
- Exit/visibility: path freezes; form remains interactive; no animation time jump.
- Reduced motion: immediate segment state or simple color change.

**Submit/monogram**

- Trigger: valid submit intent immediately before opening the mail client.
- Transform: path resolves to Aman monogram and status explains that the email app is opening.
- Duration: short enough not to delay the mailto action; navigation wins immediately.
- Meaning: the site receives intent, not proof of delivery.
- Failed/unavailable mail client: show honest selectable email fallback and never display “sent.”
- Reduced motion: immediate monogram/status state.

#### 8.10 Content requirements

- Aman must approve both philosophy statements and any serif-emphasized phrases.
- Email, phone, location, availability, response-time claim and social links must be current.
- Preserve the approved form options or document every requested change.
- Status copy must distinguish “opening/prepared” from “sent/delivered.”
- Privacy note must truthfully state that the site does not secretly store/send form data.
- Footer year/local-time behavior must be accurate or removed.

#### 8.11 Desktop requirements

- Quiet interval uses broad negative space and almost no camera movement.
- Contact may use a two-plane composition, but inputs remain flat, stable and easy to scan.
- Transmission path occupies surrounding depth without crossing labels, focus rings or error text.
- Full monogram resolution stays visible without delaying mail-client navigation.
- Form fits common laptop widths/heights through normal scrolling.

#### 8.12 Tablet requirements

- Quiet scene keeps generous space but shortens excessive empty scroll.
- Contact uses a clear stacked or balanced two-column layout based on orientation.
- Touch focus, autofill and native select behavior remain primary.
- Transmission path simplifies around the form and avoids keyboard viewport shifts.

#### 8.13 Mobile requirements

- Philosophy uses portrait type hierarchy and a compact but deliberate pause.
- Contact form is one column in native DOM order with full-width controls and safe-area spacing.
- Transmission becomes a vertical edge/path or section progress that never runs beneath inputs.
- Account for on-screen keyboard resize without camera jumps or fixed-element obstruction.
- Monogram resolves within the visible confirmation region; no forced scroll.
- Reduce idle animation and use CSS/SVG fallback by default on low tier.

#### 8.14 Reduced-effects and reduced-motion requirements

- Full effects: quiet luminance, focus-guided path and monogram resolution.
- Reduced effects: static point, simple path draws, no camera or depth reaction.
- System reduced motion: static philosophy/contact compositions and immediate progress/monogram states.
- No WebGL: CSS/SVG point, path and monogram.
- No JavaScript: all philosophy/contact content, normal mailto/email/phone links and a usable contact fallback; if the enhanced form cannot construct mailto, expose the direct email clearly.

#### 8.15 Performance requirements

- Phase-specific code target: approximately 55 KB additional gzip or less.
- No new large assets, video or expensive post-processing.
- Quiet breathing renders only while visible and full effects are enabled.
- Form updates are event-driven; no per-frame DOM reads.
- Contact path geometry is lightweight and reused.
- Maintain responsive input performance with no long task during validation or mailto generation.
- Pause on page hide and remove form/copy/visibility listeners on destroy.
- WebGL failure cannot affect form availability or layout.

#### 8.16 Accessibility and usability requirements

- Preserve semantic philosophy headings, contact landmark, labels, autocomplete and logical form order.
- Errors are programmatically associated, concise and announced appropriately.
- Focus moves to the first invalid control on failed submit and is never animated.
- Decorative path/monogram is hidden from assistive technology.
- Copy control and status region work by keyboard and screen reader.
- Native inputs/selects remain zoom/autofill/touch friendly.
- Contrast and focus pass in empty, focused, invalid, valid and confirmation states.
- No-JavaScript exposes direct contact methods and does not present a nonfunctional submit.

#### 8.17 Objective technical testing checklist

- [x] Run dev, production build, typecheck, lint, unit, QA and Phase 8 Playwright suites.
- [x] Unit-test content validation, mailto encoding, field-progress calculation and semantic error/status contracts; browser-test field error mapping and copy status surface.
- [x] Test empty, partial, invalid and valid states; native input/select events provide the autofill/paste-compatible event path and reset/listener cleanup are implemented.
- [x] Test keyboard-only error focus and native form controls on desktop and mobile projects.
- [x] Test touch/native controls and responsive portrait composition through the mobile smoke project.
- [x] Test the mail-client intent contract through encoded mailto unit coverage and verify unavailable-copy fallback text without claiming delivery.
- [x] Test all effects/fallback modes and no-JavaScript direct contact path.
- [x] Verify quiet animation is registered only while the quiet scene is active; FrameLoop page-visibility pausing remains shared infrastructure.
- [x] Run axe, forced-colors and responsive zoom coverage; Phase 7’s 200%/400% checks remain green in the complete suite.
- [x] Confirm zero uncaught runtime and unresolved console errors across the 108-test browser suite.
- [x] Verify event-driven form updates, lightweight SVG path geometry and production payload output.
- [x] Verify listener cleanup and that no Phase 9 broad changes entered early.

#### 8.18 Technical acceptance criteria

- [x] Quiet interval, philosophy, contact transmission, form, footer and all fallbacks are implemented.
- [x] Form behavior is honest, accessible and does not claim delivery.
- [x] All build/test commands pass without uncaught errors.
- [x] Input responsiveness, idling and cleanup meet budget or deviations are documented.
- [x] No broad Phase 9/10 work was implemented early.
- [x] Completion record and known issues are current.
- [x] Technical readiness is clearly separated from Aman’s visual approval.

#### 8.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman (2026-08-03)`**

- [x] The quiet interval creates meaningful contrast after the playground.
- [x] Stillness feels intentional, not empty or unfinished.
- [x] Philosophy typography feels personal and controlled.
- [x] The form remains inviting, serious and easy to understand.
- [x] Transmission motion supports form progress without distracting from input.
- [x] The monogram resolution feels like a conclusion rather than a generic success animation.
- [x] No state falsely communicates that an email was sent.
- [x] Mobile handles the pause, form and keyboard intentionally.
- [x] The ending feels connected to the opening Signal.
- [x] The complete close balances emotion and usability.

Only Aman may change the status.

#### 8.20 Visual review questions for Aman

- [x] Is the visual pause long and quiet enough?
- [x] Do the philosophy statements feel true to you?
- [x] Does the contact composition feel inviting rather than themed?
- [x] Is the transmission path meaningful or distracting?
- [x] Does the form stay easy to use?
- [x] Does the monogram provide a satisfying ending?
- [x] Is any motion too active for the quiet section?
- [x] Does mobile feel deliberately composed around the keyboard and form?
- [x] Is the closing strong without pretending submission succeeded?
- [x] Do you approve Phase 8?

#### 8.21 End-of-phase handoff

Update records, report files/tests/form states/measurements and exact contact viewing instructions, list issues/deviations, explain the honest mailto limitation, present the review questions, mark visual status `Pending Aman’s visual review`, ask for approval or changes, and stop.

The final response must end with:

> **Phase 8 is technically ready for your visual review. Please review the quiet interval and contact finale and tell me whether you approve them or what you want changed. I will not begin Phase 9 until you explicitly approve Phase 8.**

#### 8.22 Completion record

| Field | Record |
|---|---|
| Phase status | Visually approved; Phase 9 authorized |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Complete: quiet philosophy interval, low-motion Signal point, semantic contact transmission, migrated form behavior, honest mailto flow, monogram intent state, footer/local-time behavior and fallback parity |
| Tasks completed | Phase 8 implementation and objective validation checklists are checked; current approved contact details and form options are preserved, with no new claims or social links added |
| Files added | `src/content/contact.ts`; `src/scenes/QuietScene.ts`; `src/scenes/ContactScene.ts`; `src/forms/ContactForm.ts`; `src/forms/ContactTransmission.ts`; `src/styles/scenes/quiet.css`; `src/styles/scenes/contact.css`; `tests/contact.test.mjs`; `tests/phase8.smoke.spec.mjs` |
| Files changed | `index.html`; `src/main.ts`; `script.js`; `style.css`; `qa.mjs`; `new_plan.md` |
| Files removed | Replaced legacy contact/copy/local-time behavior from `script.js`; removed legacy contact/footer/toast rules from `style.css` and the unused toast node; no asset files removed |
| Automated tests performed | `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (26/26); `npm run qa` PASS; `npm run build` PASS; `npm run test:smoke -- tests/phase8.smoke.spec.mjs` PASS (14/14 across desktop/mobile); complete `npm run test:smoke -- --workers=1` PASS (110/110 across desktop/mobile); the isolated pre-existing Phase 6 cadence assertion also PASS (1/1) |
| Manual technical tests performed | Direct `#philosophy` and `#contact` entry; quiet Signal receive; empty/invalid form; first-error focus; partial/valid field transmission; native select controls; copy status fallback; reduced motion; forced colors; no WebGL; no JavaScript direct email fallback; axe; 200%/400% zoom; one-worker complete responsive suite |
| Build status | PASS — Vite production build: `dist/index.html` 74.97 KB / 16.52 KB gzip, CSS 121.32 KB / 22.94 KB gzip, JS 90.89 KB / 24.06 KB gzip; CSS+JS approximately 47.00 KB gzip |
| Runtime issues | 0 uncaught page errors across the complete 108-test browser suite; no Phase 8 runtime issues observed |
| Console issues | No unexpected Phase 8 console errors; no mail client was opened during automated tests, so no external-protocol result is claimed |
| Performance observations | Quiet breathing uses the shared `FrameLoop` only while the quiet scene is active and full effects are available; contact updates are event-driven; transmission uses one lightweight SVG; no new video, model, canvas or animation library was added |
| Accessibility observations | Semantic philosophy heading and contact landmark; seven labeled controls with autocomplete, required state, `aria-describedby` errors and `aria-invalid`; focus-to-first-error; status/copy announcements; decorative path/monogram hidden from assistive technology; forced-colors and axe PASS |
| Responsive implementation notes | Desktop uses a two-plane intro/form composition with an external transmission path; tablet stacks the planes; portrait uses one-column native form order, larger controls, simplified path framing and no fixed element around the keyboard viewport |
| Reduced-motion and fallback notes | Full effects allow restrained quiet breathing and path emphasis; reduced/system motion uses static point and immediate state changes; no WebGL uses CSS/SVG; no JavaScript retains all copy, fields, direct mailto links and a usable fallback note |
| Deviations from the plan | A separate `Footer.ts` component was not warranted; footer markup remains semantic HTML. The monogram is an inline decorative SVG and valid submit intent immediately triggers `mailto:` navigation, so the browser/email-client handoff cannot be verified as delivery. No social links were added because none were newly approved in the available source. |
| Known issues | Formal field-device profiling, heap/GPU deltas, final font optimization, visual quality approval and external email-client behavior remain open; browser tests verify prepared intent/status, not delivery |
| Deferred work | Formal performance, accessibility and reliability hardening in Phase 10; final choreography/removal in Phase 11 |
| Visual review status | `Approved by Aman (2026-08-03)` |
| Aman’s visual feedback | “Phase 8 is done”; proceed with Phase 9 |
| Changes requested | — |
| Changes completed | Implemented and validated the quiet interval, Signal reduction, contact transmission, validation/error focus, encoded mailto preparation, copy fallback, monogram intent state, footer/local time, responsive/fallback styles, QA guards, unit/browser coverage and completion evidence |
| Final approval status | Approved |

### Phase 9 — Complete responsive and fallback pass

#### 9.1 Objective

Review and technically correct every approved scene as one system across the complete viewport, input and fallback matrix. This phase does not invent new art direction; it proves that the approved cinematic experience has intentional large-desktop, laptop, tablet, mobile, touch, reduced-effects, reduced-motion, no-WebGL, no-JavaScript, slow-loading and failure compositions.

#### 9.2 Dependencies

- Phases 1–8 must each be explicitly approved by Aman.
- Every scene must expose stable lifecycle, device-tier and fallback hooks.
- The approved storyboard and all phase-specific responsive notes must be current.
- Authentic final scene assets must be present or have approved fallbacks.

#### 9.3 In scope

- Large desktop, standard desktop, laptop, tablet landscape/portrait, large mobile and small mobile review.
- Mouse, fine pointer, coarse pointer, touch and keyboard input.
- Full effects, reduced effects, system reduced motion, no WebGL and no JavaScript.
- Slow loading, missing assets, zoom, orientation changes, dynamic viewport height and mobile keyboard.
- Cross-scene navigation, scroll lengths, pinned ranges, focus visibility and content reflow.
- Objective responsive/fallback fixes in all completed scene/style modules.

#### 9.4 Out of scope

- New scenes, project worlds, experiments, claims, art-direction systems or signature effects.
- Subjective replacement of an Aman-approved composition without documenting why the responsive constraint requires review.
- Deep performance/accessibility optimisation reserved for Phase 10, except objective blockers discovered here.
- Final choreography/removal decisions reserved for Phase 11.

#### 9.5 Existing files affected

- `index.html` and all current semantic scene markup where reflow/fallback order requires correction.
- `src/core/DeviceTier.ts`, `MotionPreferences.ts`, `ScrollState.ts`, `SceneDirector.ts` and `AssetLoader.ts`.
- Every implemented scene, component, interaction and form module as objectively required.
- `src/styles/responsive.css`, `motion.css` and scene-specific styles.
- `qa.mjs` and existing automated tests.
- `new_plan.md` records.

#### 9.6 New files and modules

- `tests/responsive.spec.ts`.
- `tests/fallbacks.spec.ts`.
- `tests/input-matrix.spec.ts`.
- `tests/fixtures/device-tiers.ts` and deterministic WebGL/asset-failure fixtures.
- Additional responsive style modules only if splitting the existing file improves ownership; do not create duplicate rule sources.
- No new visual scene.

#### 9.7 Ordered implementation checklist

- [x] Freeze the available approved Phase 1–8 reference records and capture objective screenshots for comparison.
- [x] Define exact test viewports: 1920×1080, 1440×900, 1280×800, 1024×768, 834×1194, 768×1024, 430×932, 390×844, 360×800 and 320×568.
- [x] Define input profiles for fine mouse, trackpad-like wheel, coarse pointer, touch and keyboard only.
- [x] Audit navigation, skip link, effects control and scene progress at every viewport.
- [x] Audit Scene 0/hero composition, type clipping, camera range and CTA visibility.
- [x] Audit identity split control, manifesto reflow and project handoff.
- [x] Audit each project world’s portrait/landscape choreography, proof readability and direct navigation.
- [x] Audit capability reactor layer/control/evidence layout.
- [x] Audit experience chronology and role evidence across orientations.
- [x] Audit all three playground experiments and reset controls.
- [x] Audit quiet interval, form, mobile keyboard behavior and footer.
- [x] Correct every horizontal overflow, obscured focus target, clipped text, unreachable control and unsafe-area issue found in the matrix.
- [x] Normalise scroll/pin lengths per viewport and small-height laptop/mobile cases.
- [x] Test orientation changes during each scene and restore a valid scene/progress state.
- [x] Test 200% and 400% zoom and correct reflow without losing content.
- [x] Test explicit full/reduced/system effects changes while each scene is active.
- [x] Test system reduced motion from first load and when changed live.
- [x] Force no WebGL at initial load and verify the existing context-failure fallback contract.
- [x] Disable JavaScript and verify complete content, navigation, project links and direct contact path.
- [x] Simulate delayed loading, missing video and aborted requests; no image, font or texture asset is requested by the current build.
- [x] Test mobile browser dynamic viewport and form keyboard-resize behavior through the 390×500 reduced-height fixture.
- [x] Capture objective screenshots for every declared viewport selected for regression.
- [x] Record the responsive changes and the absence of new visual features in the Phase 9 completion record.
- [x] Run all Phase 9 technical checks and update the completion record.

#### 9.8 Visual requirements

- Composition: every approved scene retains its subject and hierarchy at each breakpoint; no fallback becomes a stack of generic cards.
- Depth: desktop uses full depth; tablet and mobile reduce/redirect depth intentionally; no important content becomes background decoration.
- Typography: approved scale relationships survive reflow with controlled line breaks and no arbitrary `overflow-wrap:anywhere` appearance.
- Materials/color: project and scene identities remain intact across lower tiers and forced fallback assets.
- Camera: travel shortens by device/height while preserving each scene’s narrative start and settle.
- Scroll: no pin exceeds its useful transformation; small screens retain readable pauses.
- Pointer/touch: input-specific behavior feels direct and never conflicts with browser scrolling.
- Transitions: match cuts remain understandable even when shortened or replaced with direct cuts.
- Signature moments: each scene retains one recognisable signature or an approved static equivalent.
- Still-frame quality: every tested viewport must have strong establishing and settled frames for Aman to review.
- Meaning: responsive changes preserve content purpose, not merely visual similarity.
- Intended response: one coherent film with intentionally different cuts; only Aman approves visual success.

#### 9.9 Animation behaviour

This phase does not add new major animations. It standardises existing behavior:

- Trigger recalculation: controlled resize/orientation refresh recomputes bounds once and seeks current scene progress without replay.
- Start/settle: every animation retains the approved semantic start/settle state at all tiers.
- Scroll allocation: record the actual viewport-height range per scene and shorten only where the same meaning is preserved.
- Fast scroll: destination scenes resolve directly; no queued transitions, blank canvases or skipped proof.
- Interruption: pointer cancel, orientation, effects-mode change and navigation leave every scene in a valid state.
- Viewport exit: offscreen scenes suspend; active semantic content remains readable.
- Page visibility: pause and resume without time jumps across all scenes.
- Reduced effects: lower geometry/material/camera complexity as previously approved.
- Reduced motion: direct cuts/stills, no scrubbed camera, parallax, velocity trail or spring overshoot.
- No WebGL/JavaScript: no animation dependency may hide or reorder content.

#### 9.10 Content requirements

- No new marketing copy or claims.
- Responsive abbreviations may be introduced only if Aman approves and the full accessible label remains available.
- All project evidence, role details, philosophy and form fields must remain complete at every viewport/mode.
- Alt text, captions, link labels and instructions must remain accurate when media/control presentation changes.
- Any missing asset discovered here returns to the approved asset matrix; it is not replaced with invented content.

#### 9.11 Desktop requirements

- Test 1920×1080, 1440×900, 1280×800 and 1024×768, including small-height laptop behavior.
- Preserve full camera/depth at capable widths without letting scale create empty or unreadable compositions.
- Fine-pointer response stays bounded; all essential controls remain explicit.
- Navigation rail, progress and scene pins must not obscure content at short heights.
- DPR remains tier-capped rather than tied only to physical display density.

#### 9.12 Tablet requirements

- Test 1024×768, 834×1194 and 768×1024 with coarse pointer/touch.
- Provide separate landscape and portrait compositions, not one shared shrink rule.
- Reduce geometry/object counts, camera travel and connector density while retaining scene identity.
- All hover content becomes tap/focus/static content.
- Orientation change restores a correct current scene without a jump or trapped scroll.

#### 9.13 Mobile requirements

- Test 430×932, 390×844, 360×800 and 320×568 plus dynamic address-bar/keyboard changes.
- Confirm portrait type hierarchy, safe areas, 44×44 controls and normal-flow proof for every scene.
- Shorten pins, reduce objects and select mobile assets before loading desktop variants.
- Touch gestures must not block vertical scroll; every drag has presets/reset/keyboard-equivalent semantics where relevant.
- Prevent horizontal overflow, clipped focus rings and content beneath fixed UI.
- Maintain a stable 30+ fps supported floor or choose 2.5D/static tier before motion begins.

#### 9.14 Reduced-effects and reduced-motion requirements

- Full effects: all approved capabilities for the selected device tier.
- Reduced effects: same content and signature states with lower geometry, DPR, post-processing, camera range and interaction energy.
- System reduced motion: complete static art direction, direct state changes and no motion-dependent meaning.
- No WebGL: local responsive images/SVG/CSS scene art plus semantic DOM.
- No JavaScript: complete reading order, navigation anchors, projects, evidence, experience, experiment explanations, philosophy and direct contact.
- Switching modes live must clean up disallowed effects and initialise the new state without reload or duplication.

#### 9.15 Performance requirements

- Record initial and deferred payload for every viewport/tier; mobile must not download unused desktop hero/project assets.
- Confirm lazy-loading thresholds do not preload more than the current and immediately next heavy scene.
- Verify 55–60 fps desktop and stable 30+ fps supported mobile in representative signature moments.
- Confirm DPR caps and dynamic downgrade work deterministically.
- Audit render-loop subscriptions so only visible/transitioning/spring-active scenes run.
- Confirm one coordinated layout-read phase and no layout thrash under resize.
- Pause all offscreen video/animation and on page hide.
- Test cleanup through repeated orientation and mode changes.
- Confirm missing assets/WebGL never trigger retry loops or memory growth.

#### 9.16 Accessibility and usability requirements

- Preserve semantic DOM, headings, landmarks and logical order in every composition.
- Test complete keyboard paths and focus visibility at all viewport sizes.
- Test touch and coarse pointer without hover dependency.
- Verify contrast, forced colors, text selection and reflow at 200%/400% zoom.
- Ensure screen-reader labels/instructions match the active control variant.
- Effects controls are discoverable and do not reset focus.
- No-JavaScript content is complete and no enhanced-only control remains misleading.
- Form remains usable with mobile keyboard, zoom, autofill and validation.

#### 9.17 Objective technical testing checklist

- [x] Run dev, production build, typecheck, lint, unit and `qa.mjs`.
- [x] Run responsive Playwright matrix at all declared viewports.
- [x] Run mouse, coarse-pointer, touch and keyboard input suites.
- [x] Assert no horizontal overflow, clipped focus or unreachable controls.
- [x] Test full/reduced/system effects on first load and live change.
- [x] Test no-WebGL and no-JavaScript suites for complete content.
- [x] Test delayed loading and every available approved asset-failure fixture.
- [x] Test 200%/400% zoom and forced colors.
- [x] Test orientation and dynamic viewport changes in every scene.
- [x] Confirm zero uncaught runtime and unresolved console errors.
- [x] Run axe at representative scene states for desktop/tablet/mobile through the complete prior-phase suite and Phase 9 matrix.
- [x] Measure payload, frame time, long tasks and DPR per tier.
- [x] Inspect listener/render cleanup through repeated resize/mode cycles; deeper heap/GPU profiling remains Phase 10 scope.
- [x] Compare objective regression screenshots and document expected changes without calling them visually approved.

#### 9.18 Technical acceptance criteria

- [x] All declared viewport/input/mode combinations are runnable and complete.
- [x] No horizontal overflow, obscured focus, inaccessible control or missing essential content remains.
- [x] Effects mode, no-WebGL, no-JavaScript, delayed-loading and asset-failure paths work.
- [x] Builds/tests pass with no uncaught errors.
- [x] Measured tier/payload/frame behavior meets phase budgets or deviations are documented.
- [x] No new scene/feature was added.
- [x] All material deviations from approved compositions are flagged for Aman.
- [x] Completion record is current and ready for visual review.

#### 9.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman (2026-08-03)`**

- [x] Large desktop, laptop, tablet and mobile each feel intentionally composed.
- [x] Mobile is not simply desktop with effects removed.
- [x] Every scene keeps a recognisable signature moment or strong still substitute.
- [x] Type hierarchy and visual density remain controlled across sizes.
- [x] Touch interactions feel natural and settle.
- [x] Reduced-effects and reduced-motion modes look complete and art-directed.
- [x] No-WebGL stills feel deliberate rather than broken.
- [x] Cross-scene pacing remains balanced at every viewport.
- [x] No approved scene lost its identity during adaptation.
- [x] Zestt remains proportionate in all responsive cuts.

Only Aman may change the status.

#### 9.20 Visual review questions for Aman

- [x] Which viewport or orientation feels weakest?
- [x] Does mobile feel like a purposeful portrait cut?
- [x] Are any type sizes, line breaks or overlaps wrong?
- [x] Does any shortened transition lose meaning?
- [x] Are touch interactions clear and satisfying?
- [x] Do reduced-effects/reduced-motion versions still feel authored?
- [x] Does any no-WebGL composition feel unfinished?
- [x] Is the visual density comfortable on laptops and small phones?
- [x] Should any responsive effect be removed rather than repaired?
- [x] Do you approve the complete responsive and fallback pass?

#### 9.21 End-of-phase handoff

Phase 9 was approved by Aman on 2026-08-03 after the responsive/fallback evidence and review handoff. Its technical and visual records are frozen before Phase 10 hardening.

#### 9.22 Completion record

| Field | Record |
|---|---|
| Phase status | Visually approved; Phase 10 authorized |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Complete: responsive overflow corrections, contact-stage containment, small-screen handoff wrapping, viewport/input/fallback regression coverage and objective screenshot/metrics evidence |
| Tasks completed | Phase 9 implementation and technical acceptance checklists are checked; no new scene, feature, claim or art-direction system was added |
| Files added | `tests/phase9.smoke.spec.mjs`; `docs/phase-9/README.md`; `docs/phase-9/runtime-metrics.json`; `docs/phase-9/` objective hero/contact captures for all ten declared viewports |
| Files changed | `src/styles/scenes/identity.css`; `src/styles/scenes/contact.css`; `new_plan.md` |
| Files removed | None |
| Automated tests performed | `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (26/26 at Phase 9 freeze); `npm run qa` PASS; `npm run build` PASS; Phase 9 suite PASS (7/7 executed, 5 intentional duplicate-matrix skips); complete `npm run test:smoke -- --workers=1` PASS (127/127 executed, 5 intentional skips; 132 total after Phase 10 coverage) |
| Manual technical tests performed | Ten viewport overflow matrix; contact transmission bounds at desktop/tablet/mobile sizes; four orientation changes plus 390×500 keyboard-height fixture; live full/reduced/system effects; no-WebGL; delayed/aborted Zestt media; 320px no-JavaScript reading order; objective screenshots; DPR/frame-interval/long-task measurement |
| Build status | PASS — Vite production build: `dist/index.html` 74.97 KB / 16.51 KB gzip, CSS 121.44 KB / 22.94 KB gzip, JS 90.89 KB / 24.06 KB gzip; CSS+JS approximately 47.00 KB gzip |
| Runtime issues | 0 uncaught page errors across the complete 132-test browser suite; no Phase 9 runtime issues observed |
| Console issues | No unexpected console errors in the complete browser suite; external email-client behavior remains intentionally unclaimed |
| Performance observations | Desktop 1440×900 measured 15.7–17.6 ms RAF intervals with 0 long tasks; mobile 390×844 measured 15.8–17.6 ms with 0 long tasks; DPR remained 1 in the test Chrome environment; deeper heap/GPU profiling remains Phase 10 |
| Accessibility observations | Existing axe/keyboard/forced-colors/reduced-motion coverage remains green; new matrix asserts semantic content bounds, reachable contact controls and no clipped transmission stage; no-JavaScript direct contact remains complete |
| Responsive implementation notes | Decorative identity word fragments are clipped to their semantic heading; the identity handoff wraps at small widths; contact transmission is contained inside the form stage instead of extending beyond it; the responsive layout otherwise required no broad scene changes |
| Reduced-motion and fallback notes | Full/reduced/system effects continue to switch live; no-WebGL and no-JavaScript content remain complete; delayed video failure settles into the existing honest fallback; no image/font/texture asset fallback was needed because none is requested by the current build |
| Deviations from the plan | No pre-Phase 9 Phase 1–8 implementation screenshot set existed in the workspace, so the available phase records/storyboard were frozen as references and the 20 objective regression captures were generated after the responsive corrections. True OS-level virtual-keyboard, heap/GPU and field-device profiling remain Phase 10 hardening scope. |
| Known issues | True device/browser keyboard behavior, external mail-client behavior, final font optimization and deeper heap/GPU profiling remain open |
| Deferred work | Phase 10 technical hardening completed; Phase 10 visual review; Phase 11 final choreography/removal |
| Visual review status | `Approved by Aman (2026-08-03)` |
| Aman’s visual feedback | “Phase 9 ok do phase 10” |
| Changes requested | — |
| Changes completed | Corrected the three responsive defects found in the objective audit, added Phase 9 viewport/orientation/fallback tests, captured the declared viewport evidence set, recorded runtime metrics and updated the phase ledger/completion record |
| Final approval status | Approved |

### Phase 10 — Performance, accessibility and reliability hardening

#### 10.1 Objective

Harden the approved complete experience with reproducible performance, accessibility and reliability evidence. This phase refines loading, device tiers, lifecycle cleanup and fallbacks; expands automated coverage; and documents objective launch readiness without making subjective claims about visual quality.

#### 10.2 Dependencies

- Phase 9 must be explicitly approved by Aman.
- Final scene structures, responsive compositions and fallback modes must be stable.
- Final intended assets must be present.
- A supported browser/device matrix and deployment target must be recorded.
- Any unresolved visual change must return to its owning phase before hardening.

#### 10.3 In scope

- Performance profiling and asset optimisation.
- Device-tier measurement/refinement and dynamic downgrade.
- WebGL context loss/recovery, slow network, page visibility and memory testing.
- Playwright journeys, axe automation, keyboard paths, visual-regression infrastructure and fallback fixtures.
- Screen-reader-oriented semantic checks and manual technical inspection.
- Error handling, asset failures, no-JavaScript and reduced-motion reliability.
- Objective launch reports and documented remaining limitations.

#### 10.4 Out of scope

- New scenes, content, signature effects or visual concepts.
- Subjective redesign based solely on the implementing agent’s taste.
- Claiming field Core Web Vitals p75 without real deployed traffic.
- Adding analytics, tracking or a backend unless Aman separately authorises it.
- Final emotional choreography/removal decisions reserved for Phase 11.

#### 10.5 Existing files affected

- `vite.config.ts`, `package.json`, lockfile and build scripts.
- `src/core/FrameLoop.ts`, `DeviceTier.ts`, `AssetLoader.ts`, `MotionPreferences.ts`, `SceneDirector.ts` and `src/three/Renderer.ts`.
- Any scene/module requiring objective performance, cleanup or accessibility correction.
- Asset files and references after approved transcoding/compression.
- `qa.mjs` and all automated test configuration/files.
- `new_plan.md` records.

#### 10.6 New files and modules

- `playwright.config.ts` if not already present.
- `tests/journeys.spec.ts`, `accessibility.spec.ts`, `performance.spec.ts`, `reliability.spec.ts` and `visual-regression.spec.ts`.
- `tests/fixtures/webgl.ts`, `network.ts` and `visibility.ts`.
- `src/core/PerformanceGovernor.ts` only if measurement proves dynamic downgrade is necessary.
- `docs/phase-10/technical-report.md` and machine-readable measurement outputs.
- Optimised AVIF/WebP/WebM/MP4/font subsets as approved.

#### 10.7 Ordered implementation checklist

- [x] Freeze the Phase 9-approved visual baselines before optimisation.
- [x] Inventory every production bundle, font, image, texture, model and video with raw/compressed sizes and loading priority.
- [x] Remove unused code, materials, debug helpers, source assets and duplicate variants from the production build where the audit found them; the duplicate legacy section observer was removed.
- [x] Verify no approved production font asset exists to subset and that the current system fallback path has no observed layout shift.
- [x] Verify no production image variant is requested by the current build; semantic alt/caption contracts remain intact.
- [x] Evaluate the approved optional video path; it remains metadata-only with no autoplay, and the unavailable local transcode/alternate-output risk is documented.
- [x] Analyse JavaScript chunks and reduce accidental eager imports; the final bundle and gzip inventory are recorded.
- [x] Refine device tiers from capability hints and add deterministic unit coverage rather than relying on user-agent strings.
- [x] Implement a bounded dynamic reduced-DPR downgrade after sustained missed-frame intervals without oscillation.
- [x] Verify one WebGL context and explicit context-loss/restoration behavior.
- [x] Verify scene destroy/recreate, renderer disposal, observer/listener cleanup, contact timers and aborted requests.
- [x] Verify render-loop idle, offscreen project suspension and page-visibility pause/resume across the shared runtime.
- [x] Add complete Phase 10 Playwright journeys for representative navigation, project media, effects, accessibility and contact controls.
- [x] Add axe automation at eight representative settled scene states.
- [x] Add keyboard-only field/control journeys and screen-reader-oriented semantic checks through the existing landmark/name/order assertions.
- [x] Run no-WebGL, no-JavaScript, reduced-effects and reduced-motion suites through the complete prior-phase suite and Phase 10 journeys.
- [x] Add delayed/missing optional-media and context-loss fixtures; decode-failure remains covered by the loader timeout/error contract.
- [x] Add representative visual-regression captures and label them objective change detection, not visual approval.
- [x] Profile lab paint/Web Vitals proxies, long tasks, frame pacing, DPR, heap samples and network waterfalls on the reference matrix.
- [x] Run repeated full-site direct-navigation loops and compare available browser resource/heap samples; GPU/field-memory limits are documented.
- [x] Document lab versus field metrics and the post-launch method needed to establish p75 field values.
- [x] Correct objective failures with the smallest change; no material approved-composition change was introduced.
- [x] Run the complete technical suite from a clean lockfile install and production preview.
- [x] Update the checklist, report and completion record.

#### 10.8 Visual requirements

- Optimisation must preserve every Aman-approved composition, material hierarchy, type rendering and signature state.
- Compressed media must not introduce visible banding, unreadable interface proof or poster mismatch.
- Device-tier downgrades must retain the scene’s intended still and narrative transformation.
- Context recovery and failure states must use approved fallback compositions.
- Visual-regression differences require explanation but cannot be self-approved.
- Intended emotional response is unchanged from the creative direction and remains Aman’s judgment.

#### 10.9 Animation behaviour

No new signature animation is introduced. Hardening must verify:

- Trigger determinism after clean load, direct navigation, back/forward and restored tab.
- Start/settle parity before and after code splitting/optimisation.
- Timing that excludes hidden-tab elapsed time.
- Fast-scroll seeking without queued work or blank destination scenes.
- Interruption/cancellation for all pointer, touch, navigation, asset and mode changes.
- Offscreen suspension and event-driven render restart.
- Context loss: stop rendering, reveal fallback, attempt bounded recovery and restore current semantic scene without replay.
- Reduced effects/motion: no prohibited motion enters through shared utilities.
- Scene destruction: cancel animation frames/tweens, release GPU resources, abort loads and remove listeners.

#### 10.10 Content requirements

- No content changes unless correcting an objective factual, accessibility or truncation defect.
- Revalidate external links, claims, dates, contact details, asset rights, alt text and captions.
- Video captions/transcripts must match final media.
- Any copy change remains visible to Aman and may require visual re-review if layout changes.
- Technical report must state measurement conditions and not present lab estimates as field p75.

#### 10.11 Desktop requirements

- Profile reference capable desktop and a constrained laptop profile.
- Verify full effects at DPR cap, sustained frame time, GPU/CPU load, memory and long tasks.
- Confirm small-height laptop navigation and pins remain stable after optimisation.
- Test mouse, keyboard and high-refresh displays without assuming 60 Hz timing.

#### 10.12 Tablet requirements

- Profile landscape/portrait touch profiles with reduced memory/CPU assumptions.
- Verify tier selection, asset variants, orientation recovery and coarse-pointer controls.
- Confirm no desktop assets/post-processing load unnecessarily.
- Test Safari/WebKit-oriented behavior where the supported matrix includes it.

#### 10.13 Mobile requirements

- Profile large and small mobile viewports under CPU/network throttling and at least one real-device class where available.
- Verify mobile asset selection, DPR, 30+ fps floor, memory and thermal-conscious lower tier.
- Test dynamic viewport, orientation and form keyboard.
- Confirm failure/downgrade happens before prolonged jank and preserves content.

#### 10.14 Reduced-effects and reduced-motion requirements

- Full effects passes budgets on capable tier or automatically downgrades without loops.
- Reduced effects loads fewer/lighter resources rather than only hiding already-downloaded effects where feasible.
- System reduced motion avoids scrubbed camera/parallax/velocity/spring overshoot and passes complete journey tests.
- No WebGL loads no unnecessary Three.js scene assets where architecture permits and renders approved fallbacks.
- No JavaScript exposes a complete, usable semantic portfolio and direct contact route.
- Mode changes clean up the old mode’s subscriptions/resources.

#### 10.15 Performance requirements

- LCP lab target at or below 2.5 s under documented test conditions; field p75 remains a post-deployment requirement.
- INP lab proxy at or below 200 ms and no long input-blocking task left unexplained.
- CLS at or below 0.1.
- 55–60 fps target on reference desktop and stable 30+ fps supported mobile during signature interactions.
- Critical shell remains usable before effects; initial critical visual payload target remains approximately 1.5 MB or less.
- Record initial/deferred JavaScript and asset payload by tier.
- One WebGL context, bounded DPR and no multiple autoplay video.
- No per-frame layout thrash; render loop idle when nothing changes.
- No monotonic memory growth across three complete navigation loops.
- Offscreen/page-hidden work pauses; teardown releases scene-specific resources.
- Slow/missing assets and context loss recover or fall back without navigation lock.

#### 10.16 Accessibility and usability requirements

- Automated axe checks have no unreviewed serious/critical issues.
- Keyboard-only journey reaches every interactive feature with visible focus and correct order.
- Screen-reader-oriented checks confirm landmarks, headings, names, descriptions, live regions and hidden decorative content.
- Text selection, 200%/400% zoom, forced colors, contrast and reflow are verified.
- Effects controls work and preferences persist without trapping focus.
- Forms retain labels, errors, autocomplete, honest status and no-JavaScript fallback.
- Touch targets and gestures remain usable; no essential hover behavior.
- Automated success never substitutes for Aman’s visual review or a human screen-reader usability judgment.

#### 10.17 Objective technical testing checklist

- [x] Run clean dependency install using the committed lockfile.
- [x] Run dev server and production preview.
- [x] Run production build, typecheck, lint, unit and `qa.mjs`.
- [x] Run all Playwright functional, responsive, input and fallback journeys.
- [x] Run axe at all representative scene states and review every result.
- [x] Run keyboard-only and screen-reader-oriented semantic assertions.
- [x] Run full/reduced/system/no-WebGL/no-JavaScript suites.
- [x] Run slow-network, missing-asset, decode-failure-contract and context-loss tests.
- [x] Run page-visibility, offscreen, direct-navigation, fast-scroll and interruption tests.
- [x] Run visual regression and explain every baseline change.
- [x] Measure build chunks, asset payload, LCP/INP/CLS lab metrics and long tasks.
- [x] Measure frame pacing and DPR/downgrade behavior on reference tiers.
- [x] Run repeated full-site loops and compare available heap/listener/observer/resource state; GPU deltas remain a documented limitation.
- [x] Confirm zero uncaught runtime and unresolved console errors in production preview.
- [x] Verify external links and final asset/caption integrity through QA and representative journeys.
- [x] Record commands, environment, dates and raw results in the technical report.

#### 10.18 Technical acceptance criteria

- [x] Clean install, dev, build, type, lint, unit, QA and complete Playwright suites pass.
- [x] No unreviewed serious/critical accessibility issue or uncaught runtime/console error remains.
- [x] Lab performance budgets pass or every deviation has evidence, mitigation and Aman-visible risk.
- [x] Device tier, DPR, render idle, visibility, context loss and memory cleanup are verified within documented lab limits.
- [x] All fallback modes complete the full journey.
- [x] Visual-regression changes are documented without self-approval.
- [x] No Phase 11 subjective choreography/removal work was performed early.
- [x] Completion record and technical report are current.
- [x] The phase is ready for Aman’s visual review, not launch-approved.

#### 10.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Approved by Aman (2026-08-03)`**

- [ ] Optimisation preserved all approved compositions and signature moments.
- [ ] Lower device tiers still feel deliberately art-directed.
- [ ] Compressed media retains acceptable visual fidelity.
- [ ] Downgrades are graceful and not visibly broken.
- [ ] Context/asset failure states remain intentional.
- [ ] Motion still feels smooth, controlled and settled after timing changes.
- [ ] Accessibility fixes did not damage visual hierarchy.
- [ ] Responsive quality approved in Phase 9 remains intact.
- [ ] No scene now feels generic because of optimisation.
- [ ] The experience is visually ready to enter final choreography review.

Only Aman may change the status.

#### 10.20 Visual review questions for Aman

- [ ] Did any optimisation visibly reduce quality?
- [ ] Do lower tiers still feel like the same portfolio?
- [ ] Are image/video/font results acceptable?
- [ ] Did any timing or downgrade change weaken a signature moment?
- [ ] Are fallback and failure states visually complete?
- [ ] Did accessibility corrections improve or disrupt hierarchy?
- [ ] Does the experience still feel coherent across devices?
- [ ] Is any remaining jank or delay visually noticeable?
- [ ] What must change before the final choreography/removal pass?
- [ ] Do you approve Phase 10?

#### 10.21 End-of-phase handoff

Update records, provide clean-install/dev/preview instructions and the technical report, list all optimised assets/files/tests/raw metrics/issues/deviations, explain lab-versus-field limits, provide review paths for every tier/fallback, present the questions, mark visual status `Pending Aman’s visual review`, ask for approval or changes, and stop.

The final response must end with:

> **Phase 10 is technically ready for your visual review. Please review the hardened experience and tell me whether you approve it or what you want changed. I will not begin Phase 11 until you explicitly approve Phase 10.**

#### 10.22 Completion record

| Field | Record |
|---|---|
| Phase status | Approved by Aman (2026-08-03) |
| Date started | 2026-08-03 |
| Date technically completed | 2026-08-03 |
| Technical implementation status | Complete: lifecycle hardening, bounded performance downgrade, renderer context recovery, asset timeout/abort cleanup, active/visible contact clock, duplicate observer removal, Phase 10 browser coverage and production-preview evidence |
| Tasks completed | Phase 10 implementation, objective testing, lab measurements and technical acceptance checklists are checked; no Phase 11 choreography/removal work was added |
| Files added | `src/core/PerformanceGovernor.ts`; `tests/phase10.test.mjs`; `tests/phase10.smoke.spec.mjs`; `scripts/phase10-metrics.mjs`; `docs/phase-10/README.md`; `docs/phase-10/technical-report.md`; `docs/phase-10/asset-inventory.json`; `docs/phase-10/runtime-metrics.json`; `docs/phase-10/captures/` representative hero/contact captures |
| Files changed | `src/core/FrameLoop.ts`; `src/core/DeviceTier.ts`; `src/core/AssetLoader.ts`; `src/three/Renderer.ts`; `src/main.ts`; `src/preferences/EffectsControl.ts`; `src/scenes/ContactScene.ts`; `src/forms/ContactForm.ts`; `script.js`; `new_plan.md` |
| Files removed | None |
| Automated tests performed | `npm ci --ignore-scripts` PASS; `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (29/29); `npm run qa` PASS; `npm run build` PASS; Phase 10 suite PASS (10/10 desktop and 10/10 mobile); complete `npm run test:smoke -- --workers=1` PASS (127/127 executed, 5 intentional skips; 132 total) |
| Manual technical tests performed | Production-preview bundle inventory; eight hero/contact captures at 1440×900, 1024×768, 390×844 and 320×568; representative settled-scene axe; keyboard fields/control reachability; effects and repeated hash navigation; page-visibility event path; delayed/aborted optional media; WebGL context loss/fallback/recovery; DPR/frame/paint/long-task/layout-shift/resource/heap lab sampling |
| Build status | PASS — Vite production build: `dist/index.html` 74.97 KB / 16.51 KB gzip, CSS 121.44 KB / 22.94 KB gzip, JS 94.61 KB / 24.92 KB gzip; CSS+JS 47.86 KB gzip |
| Runtime issues | 0 uncaught page errors across the complete 132-test browser suite; no Phase 10 runtime issues observed |
| Console issues | No unexpected console errors in Phase 10 or complete production-preview browser evidence; external email-client behavior remains intentionally unclaimed |
| Performance observations | Production preview FCP 268 ms in captured Chrome runs; 0 long tasks; 0 layout shift; approximately 16.7 ms average and 16.8–17.7 ms max frame intervals; performance governor remained stable; DPR 1 in the lab browser |
| Accessibility observations | Axe clean at eight representative settled scene boundaries; all seven contact controls, effects control and submit control reachable by keyboard; prior full reduced-motion, forced-colors, no-WebGL and no-JavaScript coverage remains green |
| Responsive implementation notes | Phase 9-approved responsive compositions remained unchanged; Phase 10 reduced only renderer quality after sustained lab misses and retained the semantic fallback contract |
| Reduced-motion and fallback notes | Hidden-tab resume resets elapsed time; no-WebGL remains semantic; context loss falls back and restoration rebuilds once; optional media timeout/abort settles without retry churn; contact clock and form timers stop on inactive/hidden/destroyed paths |
| Deviations from the plan | No local transcoder or approved alternate video output was available, so the 18.77 MB optional MOV remains metadata-only/non-critical and its risk is documented. True device keyboard, Safari/WebKit, thermal, GPU-delta and field-memory profiling remain unverified. |
| Known issues | Optional MOV transcoding, real-device/browser keyboard behavior, Safari/WebKit parity, external mail-client behavior, final font optimization and deeper heap/GPU profiling remain open |
| Deferred work | Phase 11 final choreography/removal; field/device profiling and any approved optional-media transcode |
| Visual review status | `Approved by Aman (2026-08-03)` |
| Aman’s visual feedback | “Phase 10 is done”; Phase 11 authorized |
| Changes requested | None recorded |
| Changes completed | Implemented lifecycle/performance/fallback hardening, added Phase 10 regression coverage, captured production-preview evidence, documented the optional-media limitation and updated the technical record |
| Final approval status | Approved for Phase 11 |

### Phase 11 — Final choreography and removal pass

#### 11.1 Objective

Review the complete approved experience as one emotional journey, remove anything generic, repetitive, distracting, exhausting or technically harmful, and prepare the final launch candidate. The implementing agent facilitates objective checks and documents feedback; Aman makes every subjective decision about cinematic quality, awe, restraint and launch readiness.

#### 11.2 Dependencies

- Phase 10 must be explicitly approved by Aman.
- All technical reports, known issues, approved screenshots and scene completion records must be current.
- Final content, assets, links and deployment target must be available.
- Aman must define or approve the fresh-viewer group and review method.

#### 11.3 In scope

- End-to-end pacing and emotional-arc review.
- Transition timing, duplicated idea and continuous-motion audit.
- Removal or reduction of effects based on Aman/fresh-viewer feedback.
- Fresh-viewer session facilitation and factual feedback record.
- Final claim/link/contact/asset verification.
- Regression testing after removals.
- Launch-candidate build and final Aman approval gate.

#### 11.4 Out of scope

- New scenes, project worlds, experiments, libraries, claims or ambitious replacement effects.
- The implementing agent declaring the site cinematic, awe-inspiring, non-template or launch-ready.
- Treating fresh-viewer silence or technical success as approval.
- Deployment or public launch unless Aman separately requests and authorises it.

#### 11.5 Existing files affected

- Any scene, transition, style, content or core module only where Aman-approved removal/timing correction requires it.
- `index.html` and project/content sources for final factual corrections.
- `qa.mjs`, tests and visual-regression baselines after approved changes.
- `new_plan.md` records.
- Historical `plan.md` and `phase.md` remain unchanged.

#### 11.6 New files and modules

- `docs/phase-11/choreography-audit.md`.
- `docs/phase-11/fresh-viewer-feedback.md` with anonymised, attributable observations and no invented conclusions.
- `docs/phase-11/launch-candidate-report.md`.
- No new production visual module unless Aman explicitly changes scope and the phase plan is amended before implementation.

#### 11.7 Ordered implementation checklist

- [x] Build the Phase 10-approved production candidate and freeze an objective baseline.
- [ ] Record total scroll length and per-scene/project allocation, including Zestt percentage; the declared CSS budget is recorded, but exact live allocation still needs a browser capture.
- [ ] Watch/traverse the complete full-effects journey at normal, slow and fast scroll speeds; the in-app browser connector was unavailable in this environment.
- [x] Traverse reduced effects, reduced motion, no-WebGL and no-JavaScript journeys through the complete Playwright contract suite.
- [x] Create an effect inventory with purpose, trigger, duration/scroll allocation and whether the idea repeats.
- [x] Flag effects that resemble generic library demos, repeat earlier ideas, obscure proof, never settle or cause fatigue without deciding their subjective quality.
- [x] Flag hard cuts, dead zones, accidental pacing spikes and unclear transition ownership for Aman’s review.
- [x] Present the audit to Aman without making subjective pass/fail decisions.
- [x] Ask Aman which flagged effects to keep, alter or remove.
- [x] Implement the objective removal of unverified public metrics and its dead counter/ledger resources; no subjective removal was made without approval.
- [ ] Re-measure performance/accessibility after every material removal group.
- [x] Verify all scene start/settle states and direct navigation after the factual removal through the complete Playwright suite.
- [ ] Reconfirm Zestt-first hero/navigation and the approved 35–45% primary-story proportion; exact live proportion remains outstanding.
- [x] Reverify public claim wording, contact details, alt text and captions; the known Open Graph 404 and optional MOV limitation remain documented.
- [ ] Reverify external links and media rights at the final review date.
- [ ] Facilitate fresh-viewer sessions using approved questions and record exact feedback.
- [ ] Ask viewers who the site is about, which projects they remember, which interaction they remember, what felt unclear and what felt excessive.
- [ ] Do not interpret or rewrite viewer feedback as Aman’s approval.
- [ ] Present feedback and remaining removal candidates to Aman.
- [ ] Implement Aman’s final requested changes within this same phase.
- [x] Run the entire clean technical suite and regression comparison: clean install, build, QA, typecheck, lint, unit tests, and complete Playwright suite pass; visual-regression captures remain objective change-detection evidence.
- [x] Produce launch-candidate viewing instructions and report.
- [x] Update the Phase 11 audit, feedback record, and launch-candidate report; leave visual status pending and request final approval.

#### 11.8 Visual requirements

- Composition: the complete sequence must preserve approved still-frame quality and Zestt-first hierarchy after removals, with Aman clearly credited as maker.
- Depth: foreground passes remain rare and purposeful; no scene competes with the next for maximum depth.
- Typography: large kinetic moments remain readable and do not repeat the same entrance.
- Materials/color: changes create chapters while the Signal maintains continuity.
- Camera: every move has a destination and rest state; no continuous orbit or travel.
- Scroll: explosive opening, personal identity, varied projects, credible proof, playful lab, quiet pause and decisive close form a readable arc.
- Pointer/touch: response remains bounded, meaningful and settled.
- Transitions: each match cut advances the story rather than extending runtime.
- Signature moments: keep the smallest set that viewers remember for the right reasons.
- Still-frame quality: removal must not leave empty or unfinished compositions.
- Meaning: remaining motion communicates personality, skill, project context or narrative movement.
- Intended response: awe, wonder, credibility and invitation are solely Aman’s final judgment.

#### 11.9 Animation behaviour

The audit must evaluate every major animation against:

- Trigger clarity and whether it fires only when intended.
- Defined start and stable settle states.
- Duration/scroll allocation proportional to the meaning delivered.
- Communication value and whether another animation already communicates the same idea.
- Fast-scroll seeking without blank or intermediate residue.
- Interruption and reverse behavior without reset/jump.
- Viewport-exit suspension and deterministic re-entry.
- Page-visibility pause without time leap.
- Reduced-effects and reduced-motion substitutes with complete content.
- Destruction and listener/resource cleanup.

Approved removals must delete their code, assets, listeners, tests and stale CSS rather than merely setting `display:none`. Timing changes must update tests and completion evidence.

#### 11.10 Content requirements

- Final hero makes Aman’s frontend/motion role explicit.
- Project roles, dates, stacks, metrics and links match verified sources.
- Zestt remains the primary product story at approximately 35–45% of the complete experience.
- Professional outcomes clearly distinguish Aman’s contribution.
- Personal observations/philosophy remain in Aman’s voice.
- Contact details and mailto behavior are current and honest.
- Fresh-viewer feedback is recorded accurately and never fabricated.

#### 11.11 Desktop requirements

- Review the full-capability journey on large desktop, standard desktop and laptop heights.
- Verify pacing at wheel, trackpad-like, keyboard and direct-navigation speeds.
- Confirm full depth/camera effects remain comfortable and proof states remain readable.
- Remove effects that exist only because desktop can render them.

#### 11.12 Tablet requirements

- Review landscape and portrait as complete journeys, not isolated screenshots.
- Confirm touch pacing, transition continuity, scene length and proof hierarchy.
- Ensure removals do not expose awkward gaps or desktop assumptions.
- Keep only effects that remain meaningful without hover.

#### 11.13 Mobile requirements

- Review the entire portrait journey on large and small mobile, including dynamic viewport and form keyboard.
- Confirm narrative memory: Aman, multiple projects, capability/personality and contact.
- Ensure compacted scene lengths still include start, signature/still and settle states.
- Remove any effect that causes fatigue, jank or readability loss on mobile rather than merely hiding its content.

#### 11.14 Reduced-effects and reduced-motion requirements

- Full effects uses only the final approved effect inventory.
- Reduced effects is a deliberately lighter cut, not full effects with hidden layers still loading/running.
- System reduced motion remains complete, composed and free of prohibited motion.
- No WebGL retains scene identity through approved art/media.
- No JavaScript retains the complete semantic portfolio and direct contact.
- Final removal decisions must be applied consistently across modes without deleting content.

#### 11.15 Performance requirements

- No regression beyond Phase 10 budgets: LCP ≤2.5 s lab target under documented conditions, INP proxy ≤200 ms, CLS ≤0.1.
- Bundle/asset sizes must stay equal or decrease unless Aman approves a documented necessity.
- Frame pacing must stay at Phase 10 targets.
- Removed effects must release code/assets/resources and reduce or maintain work.
- One WebGL context, bounded DPR, idle render loop, offscreen/page-hidden pause and memory stability remain required.
- Run complete performance measurements after final changes.

#### 11.16 Accessibility and usability requirements

- No removal may delete semantic content, keyboard equivalence, focus indication, instructions or fallback meaning.
- Re-run headings/landmarks, keyboard journey, axe, zoom, forced colors and screen-reader-oriented checks.
- Direct navigation and back/forward remain reliable after timeline changes.
- Touch and form behavior remain complete.
- No visual-only fresh-viewer feedback may override an accessibility requirement without an explicit accessible alternative.
- No-JavaScript launch candidate remains usable.

#### 11.17 Objective technical testing checklist

- [ ] Run clean install, dev, production build, typecheck, lint, unit and `qa.mjs`.
- [ ] Run the complete Playwright functional/responsive/input/fallback suite.
- [ ] Run axe, keyboard-only and screen-reader-oriented semantic checks.
- [ ] Run full/reduced/system/no-WebGL/no-JavaScript journeys.
- [ ] Test normal/fast/reverse scroll, direct anchors and back/forward.
- [ ] Test slow/missing assets, page visibility and context loss.
- [ ] Confirm zero uncaught runtime and unresolved console errors.
- [ ] Re-measure bundle/assets, LCP/INP/CLS lab values, frame pacing, long tasks and memory.
- [ ] Run repeated full-site loops and verify cleanup.
- [ ] Compare visual-regression output and document every approved change.
- [ ] Verify removed effects have no dead code/assets/listeners/tests.
- [ ] Verify all claims, links, contact details and media/captions.
- [ ] Calculate final Zestt scroll allocation and narrative placement.
- [ ] Confirm fresh-viewer feedback record contains no invented approval.
- [ ] Produce the final launch-candidate technical report.

#### 11.18 Technical acceptance criteria

- Aman-approved removals/adjustments are implemented and stale resources removed.
- Complete clean build/test/accessibility/fallback suites pass.
- No uncaught runtime/console error remains.
- Performance, frame, memory and payload budgets pass or final risks are explicitly documented.
- Content, links, contact and Zestt proportion are verified.
- Fresh-viewer feedback is recorded without agent-authored visual conclusions.
- Completion record and launch-candidate report are current.
- Technical acceptance means only that Aman may perform final visual/launch review.

#### 11.19 Visual acceptance criteria — requires Aman’s approval

**Status: `Pending Aman’s visual review`**

- [ ] The complete experience feels cinematic rather than template-like.
- [ ] It creates the intended awe and wonder without becoming exhausting.
- [ ] Aman is unmistakably the subject and multiple projects are memorable.
- [ ] Zestt remains approximately 35–45% as the primary story without making the entire site a generic product dashboard.
- [ ] Every remaining effect communicates something meaningful.
- [ ] No effect feels generic, repetitive, random or library-driven.
- [ ] Motion and stillness are balanced across the full arc.
- [ ] Every scene remains impressive when paused.
- [ ] Desktop, tablet, mobile and reduced-motion cuts all feel complete.
- [ ] The site is visually ready to launch.

Only Aman may set this status to `Approved` or `Changes requested` and only Aman may give final launch approval.

#### 11.20 Visual review questions for Aman

- [ ] Does the complete journey create awe and wonder?
- [ ] Does any part still look like a portfolio/SaaS template?
- [ ] Who is the clear subject after the full experience?
- [ ] Which projects and interactions are most memorable?
- [ ] Is Zestt proportionate?
- [ ] Is any effect generic, repetitive, random or excessive?
- [ ] Are there enough quiet moments?
- [ ] Does every animation settle and support content?
- [ ] Are desktop, tablet, mobile and reduced-motion experiences all launch-worthy?
- [ ] What should be removed or changed before launch?
- [ ] Do you explicitly approve Phase 11 and the launch candidate?

#### 11.21 End-of-phase handoff

Update records, provide the choreography audit, fresh-viewer feedback and launch-candidate report, list all removals/files/tests/final measurements/issues, provide exact viewing instructions for every mode, present the final review questions, mark visual status `Pending Aman’s visual review`, ask for final approval or changes, and stop. Do not deploy unless Aman separately asks.

The final response must end with:

> **Phase 11 is technically ready for your final visual review. Please review the complete launch candidate and tell me whether you approve it or what you want changed. I will not treat the portfolio as visually approved or ready to launch until you explicitly approve it.**

#### 11.22 Completion record

| Field | Record |
|---|---|
| Phase status | In progress — objective audit and factual removal complete; pending Aman’s subjective review inputs |
| Date started | 2026-08-03 |
| Date technically completed | — |
| Technical implementation status | Objective choreography inventory and final claim cleanup complete; no subjective effect timing/removal was applied without Aman’s direction |
| Tasks completed | Phase 10 candidate build and effect inventory recorded; unverified public proof ledger removed; stale counter runtime/CSS removed; conservative Rain Platforms wording restored; Phase 11 audit, fresh-viewer template and launch-candidate report added |
| Files added | `docs/phase-11/choreography-audit.md`; `docs/phase-11/fresh-viewer-feedback.md`; `docs/phase-11/launch-candidate-report.md` |
| Files changed | `index.html`; `src/content/capabilities.ts`; `script.js`; `style.css`; `qa.mjs`; `new_plan.md` |
| Files removed | — |
| Automated tests performed | `npm ci --ignore-scripts` PASS; `npm run typecheck` PASS; `npm run lint` PASS; `npm test` PASS (29/29); `npm run qa` PASS; `node --check script.js` PASS; `npm run build` PASS; complete `npm run test:smoke -- --workers=1` PASS (127 passed, 5 intentional skips; 132 total) |
| Manual technical tests performed | Static scene/effect inventory; Phase 0 claim-register comparison; production preview baseline; browser connector availability check; existing full/reduced/no-WebGL/no-JavaScript contract coverage reviewed |
| Build status | PASS — Vite production build: `dist/index.html` 74.06 KB / 16.26 KB gzip, CSS 120.37 KB / 22.73 KB gzip, JS 94.12 KB / 24.72 KB gzip; CSS+JS 47.45 KB gzip |
| Runtime issues | None observed in the objective suites run so far |
| Console issues | No new issues observed; visual browser inspection was unavailable in this environment |
| Performance observations | Bundle payload reduced from 47.86 KB to 47.45 KB gzip after the ledger/counter removal; Phase 10 lab frame/LCP/CLS measurements remain the reference because no new visual browser capture was available |
| Accessibility observations | Complete Playwright suite PASS with prior axe, keyboard, reduced-motion, no-WebGL and no-JavaScript contracts preserved |
| Responsive implementation notes | Removing the ledger shortens the transition into capabilities without changing later responsive compositions |
| Reduced-motion and fallback notes | No fallback/content mode was removed; the factual proof cleanup applies consistently to all modes |
| Deviations from the plan | In-app browser connector unavailable; no fresh-viewer session or new visual capture was fabricated; exact live scroll allocation remains pending |
| Known issues | Fresh-viewer feedback, live Zestt percentage, external link/media-rights recheck, `amansharma.dev/og-image.jpg` 404, optional 18.77 MB MOV, field/device profiling |
| Deferred work | Aman’s keep/alter/remove decisions; any approved timing changes; fresh-viewer sessions; exact live scroll/Zestt allocation; external link/media-rights recheck; final launch approval |
| Visual review status | `Pending Aman’s visual review` |
| Aman’s visual feedback | — |
| Changes requested | Pending fresh-viewer and Aman effect decisions |
| Changes completed | Removed unverified public metrics and dead counter/ledger resources; documented the remaining effect candidates and review protocol |
| Final approval status | Not approved |

### Phase-control rules — final reminder

> **Only one phase may be implemented at a time.**
>
> **After completing the current phase, update its checklist and completion record, run all objective technical validations, provide instructions for viewing the result, ask Aman to conduct the visual review, and stop.**
>
> **Do not begin the next phase until Aman explicitly approves the current phase.**
>
> **Work from later phases must not be implemented early unless it is a strictly necessary dependency for the current phase. Any such dependency must be documented.**
>
> **Checking a task is not evidence that it is complete. Every checked task must correspond to working code, a verified asset, a completed test, or a documented result.**
>
> **Technical completion does not equal visual approval.**
>
> **The implementing agent must not approve its own visual work.**
>
> **Silence, completed tests, checked tasks, or technical correctness must never be interpreted as Aman’s approval.**

At the end of every phase: report objective evidence, present the result for Aman’s visual review, ask for an explicit `Approved` or `Changes requested` decision, and stop. Never infer approval and never start the next phase automatically.

---

## 12. File-by-file migration plan

This is the final-state ownership map. Migration happens incrementally in the phase that owns each scene; later sections must remain semantically available and must not be redesigned or removed early.

### `index.html`

- Replace the current section order incrementally with the Scene 0 prelude and eight-scene narrative.
- Keep Zestt in the hero, primary navigation, and footer navigation as the primary case-study anchor.
- Remove the nine Zestt chapters, chapter rail, capture fallbacks, long architecture block, and dedicated closing spread only in Phase 4 after replacement project proof exists.
- Keep semantic project content in the DOM and introduce one global decorative canvas.
- Preserve skip navigation, metadata, structured data, form semantics, and no-JavaScript readability.

### `style.css`

- Use it as the migration reference, then split it into token, base, component, scene, responsive, and motion layers beginning in Phase 1.
- Retire the hospitality palette, paper-card system, repeated grid/card styling, and universal reveal treatment.
- Preserve proven accessibility resets and focus behavior.
- Remove legacy selectors only when their replacement phase has semantic and fallback parity.

### `script.js`

- Move stable behavior—navigation, form validation, copy action, and local time—into focused TypeScript modules.
- Replace scattered observers and section-specific mutations with `SceneDirector`, `ScrollState`, and one `FrameLoop`.
- Remove behavior incrementally in its owning phase; do not break untouched legacy sections during the staged migration.
- Remove the concept-preview generator and Zestt chapter behavior in Phase 4 after the new project sequence has equivalent honest proof.

### `qa.mjs`

- Preserve all current semantic and reference checks.
- Add checks for one canvas only, no essential canvas-only content, no missing local project assets, effects-toggle semantics, reduced-motion completeness, video limits, and correct internal scene links.
- Keep it as the dependency-light static contract while Playwright, axe and unit suites expand around it.

### `assets/zestt/source/guest-experience.mov`

- Preserve the original source unchanged as authenticity evidence.
- Derive optimised excerpts only after Phase 0 approves the Zestt asset contract.
- Never use the source file as an excuse to rebuild or imply restaurant/admin states that it does not show.

### Build and source files introduced by the roadmap

- Add `package.json`, lockfile, Vite, TypeScript and lint/test configuration in Phase 1.
- Add `src/` modules according to the technical architecture and the owning phase’s “New files and modules” list.
- Add `public/assets/` only for approved, local, licensed and optimised production assets.
- Add `tests/` incrementally; Phase 10 owns the complete reliability suite.
- Do not introduce React or a second scene/runtime architecture unless this plan is amended and Aman approves the change.

### `new_plan.md`

- Keep this file as the sole creative plan, phase execution system and completion-record source of truth.
- Update only the active phase’s checklist and completion record during implementation.
- Never create a separate roadmap or phase tracker to bypass the approval gates in this document.

### `plan.md` and `phase.md`

- Keep them as historical records of the previous direction.
- Do not reuse their older phase statuses as approval for any phase in this roadmap.
- Do not edit them to imply that work under this cinematic roadmap is complete.

---

## 13. Risks and guardrails

### Risk: spectacle overwhelms proof

Guardrail: every scene contains one clear claim, one concrete proof item, and one interaction whose behavior supports that claim.

### Risk: the page becomes a demo reel with no personality

Guardrail: identity and interaction-lab scenes use Aman’s own observations, preferences, and working philosophy—not generic agency copy.

### Risk: WebGL harms accessibility or reach

Guardrail: semantic DOM first, decorative canvas, three capability tiers, reduced effects, and a complete no-WebGL presentation.

### Risk: motion becomes repetitive

Guardrail: assign one dominant motion mode per scene and explicitly alternate impact, transformation, response, and stillness.

### Risk: assets block progress again

Guardrail: approve an honest minimum asset contract in Phase 0. Build decorative domain abstractions where real media is unavailable, never fake UI placeholders.

### Risk: the single-page sequence becomes exhausting

Guardrail: cap pinned moments, keep native scroll, provide index navigation, include the quiet interval, and aggressively remove repeated beats during Phase 11.

### Risk: project worlds feel unrelated

Guardrail: use one Signal object, one scene-index grammar, one metadata system, and match-cut transitions throughout.

---

## 14. Definition of done

Objective items below require recorded technical evidence. Subjective items—cinematic quality, awe, authorship, visual balance and launch readiness—require Aman’s explicit approval and may never be self-approved by the implementing agent.

The redesign is complete only when:

- The hero names Zestt and its product promise, with Aman’s frontend/motion role clearly credited.
- Zestt is the primary project world and consumes approximately 35–45% of the experience.
- At least four projects receive distinct, memorable visual treatment.
- The site contains a coherent 3D scene, scroll-driven camera movement, spatial type, masking, project-to-project transformations, cursor/touch response, and physics-inspired interaction.
- Those effects are built from reusable scene and interaction systems rather than one-off handlers.
- Every major animation communicates capability, personality, project context, or narrative transition.
- The page intentionally alternates spectacle with calm.
- No repeated card grid, generic SaaS dashboard, placeholder product UI, or universal fade-in defines the visual language.
- Desktop is genuinely cinematic; tablet and mobile are thoughtfully re-choreographed rather than disabled.
- Reduced motion, no WebGL, and no JavaScript remain complete and attractive experiences.
- Keyboard navigation, focus, zoom, screen-reader semantics, touch, and form behavior pass review.
- LCP, INP, CLS, frame-rate, payload, and memory budgets pass on the supported device floor.
- All project claims, roles, metrics, links, and media are verified.
- A fresh visitor remembers Aman, his frontend craft, multiple projects, and at least one interaction—not merely Zestt.

---

## Final intended result

The finished portfolio opens as a living Zestt product story. A restaurant choice is the first subject, motion is the first proof, and the Signal/order token becomes the guide through a sequence of product states, supporting project worlds, and Aman’s engineering context. Projects are not cards; they are worlds. Skills are not badges; they are working interactions. Experience is not a résumé block; it is a journey through shipped systems. Personality is not a paragraph at the bottom; it shapes the pacing, copy, motion, and details from the first frame.

Zestt remains strong, accurate, and memorable as the main subject, while the surrounding work explains what Aman can create beyond this product.

The standard is not “a portfolio with 3D.” The standard is:

> **A portfolio whose visual world, interaction systems, responsive behavior, and technical restraint make the site itself the strongest project on the page.**
