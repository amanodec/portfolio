# Aman Sharma Portfolio — Visual Direction Plan

## A product-led portfolio with editorial hospitality and operational precision

This is a visual-direction update for the existing portfolio. It does not change the portfolio’s content structure, rewrite Zestt, add product features, or recreate any Zestt screen from scratch.

The visual source of truth is the real product:

- The guest experience is warm, editorial, tactile, image-led, and distinctly restaurant-focused.
- The restaurant experience is calm, spacious, structured, and built for quick operational decisions.
- Cream, paper, espresso, terracotta, taupe, fine dividers, restrained green, serif display type, and disciplined sans-serif UI text create the shared identity.

The portfolio should feel like the person who designed and engineered Zestt also designed the portfolio—not like Zestt was dropped into an unrelated effects showcase.

---

## 1. North star

The visitor should understand three things within the first ten seconds:

1. Aman builds unusually polished frontend experiences.
2. Aman understands the systems and workflows behind those interfaces.
3. Zestt is a real, complete two-sided product—not a concept mockup.

The desired reaction is:

> “This feels beautifully considered, and every detail is showing me something real.”

The portfolio’s visual idea is **From table to system**.

It begins with the warmth of the guest menu, crosses the order handoff, and expands into the clarity of the restaurant workspace. That contrast becomes the proof of range: emotion on one side, operations on the other, one coherent product underneath.

The work—not an abstract 3D world—is the spectacle.

---

## 2. Non-negotiable visual principles

### 2.1 Show the real product

- Use real screenshots and screen recordings captured from the frontend repository.
- Do not rebuild Zestt screens as portfolio-only HTML or canvas mockups.
- Do not invent dashboard metrics, menu content, statuses, or product capabilities.
- Small annotations, masks, frames, crop windows, and transition layers may be created around real media.
- The repository remains the primary source of truth because standalone design files are not packaged separately.

### 2.2 Hospitality first, technology second

The guest menu should feel desirable before it feels technical. Food photography, expressive serif type, whitespace, and pacing establish appetite and atmosphere. Architecture, stack, and system diagrams arrive only after the visitor understands the human journey.

### 2.3 Calm confidence over visual noise

The portfolio should be memorable because of composition, typography, art direction, pacing, and one or two exceptional transitions. It should not depend on particles, random 3D objects, permanent distortion, or an effect on every element.

### 2.4 Two interfaces, one family

The guest and restaurant sides have different jobs but visibly belong together:

- Guest: editorial, photographic, intimate, mobile, leisurely.
- Restaurant: structured, wide, operational, efficient, glanceable.
- Shared: cream grounds, paper panels, espresso type, terracotta actions, taupe labels, restrained status color, and rounded geometry.

### 2.5 Every motion communicates

Motion may show browsing, selection, customization, an order being created, the handoff to the restaurant, a status change, or the relationship between product modules. Motion that explains nothing should be removed.

### 2.6 The page remains a real website

Preserve:

- Native scrolling and normal links.
- Semantic document order.
- Keyboard and screen-reader access.
- Fast first paint.
- Legible text at every breakpoint.
- Reduced-motion support.
- Direct navigation to each portfolio section.

---

## 3. Visual language

### 3.1 Palette

Keep the current portfolio palette and tune its use to match the product.

- **Canvas cream — `#faf4ec`:** primary page background.
- **Soft parchment — `#f4eadf`:** section bands, rails, and quiet controls.
- **Warm paper — `#fffaf4`:** screenshots, cards, captions, and floating surfaces.
- **Terracotta — `#b85430`:** primary actions, active states, progress, and the order handoff.
- **Light terracotta — `#d8734e`:** restrained hover wash and image tint.
- **Espresso — `#2f211a`:** primary type, dark interludes, and device frames.
- **Deep espresso — `#201611`:** rare high-contrast section backgrounds.
- **Brown — `#6f5b4e`:** body copy and supporting information.
- **Taupe — `#8c796d`:** metadata, timestamps, inactive controls, and dividers.
- **Live green — `#516f54`:** live, ready, success, and healthy states only.
- **Exception red:** rejected or destructive states only; never decorative.

Color distribution should be roughly 70% cream and paper, 20% espresso and brown, 8% terracotta, and 2% status colors. Terracotta feels premium when it is decisive rather than constant.

### 3.2 Typography

Use typography to join the editorial guest experience with the precise restaurant UI.

- **Outfit:** portfolio headlines, case-study statements, and bold results.
- **Manrope:** body copy, controls, navigation, and explanatory text.
- **DM Mono:** section numbers, timestamps, status metadata, technical labels, and captions.
- **One high-contrast serif italic:** use only in the Zestt case study, selected section phrases, and chapter titles to echo the guest menu’s “Signature Main” and dish-name treatment. Instrument Serif is the preferred direction; if a new font is not introduced, use a carefully selected system serif fallback only inside the Zestt visual world.

Typography rules:

- Headlines are large but never allowed to crush screenshots or body content.
- Serif italic is a seasoning, not the default typeface.
- Uppercase labels use generous tracking and stay short.
- Prices, order numbers, table numbers, and timestamps should feel like real product data, not decorative typography.
- Avoid animated letter scrambling, illegible text splitting, and effects that temporarily damage reading.

### 3.3 Layout

The portfolio uses an editorial grid with operational discipline:

- A maximum content width of approximately 1320–1440 px.
- Strong left alignment for narrative sections.
- Thin horizontal rules that organize content without boxing everything.
- Large quiet margins around real product media.
- Occasional full-bleed product moments to create scale contrast.
- Numbered chapters and running captions inspired by a printed hospitality journal.
- Dense information appears only inside the product screenshots, never in the surrounding layout.

The recurring composition is **headline + proof + annotation**. Each major claim sits beside the product evidence that proves it.

### 3.4 Surfaces and geometry

- Use warm paper panels, subtle one-pixel borders, and extremely soft shadows.
- Keep rounded corners refined: roughly 18–28 px for large product frames and pill geometry for filters or statuses.
- Avoid glossy glassmorphism, neon glows, chrome, and oversized floating blobs.
- Device frames should be minimal and should never make the product look like a generic template.
- Browser frames use a quiet top bar only when it helps distinguish the restaurant desktop surface.
- Mobile captures should often appear without a full hardware mockup; a slim espresso edge or masked crop is enough.

### 3.5 Texture and imagery

- Food imagery stays natural, rich, and warm. Do not apply trendy duotone filters.
- A very subtle paper grain can unify the portfolio background and media frames.
- Product screenshots remain color-accurate.
- Use a soft cream vignette only where screenshots need to dissolve into the page.
- Never place decorative stock imagery beside Zestt.

### 3.6 Iconography

- Use thin, simple line icons consistent with the product’s search, filter, cart, category, and board controls.
- Keep icon containers circular or softly rounded.
- Do not mix emoji, filled 3D icons, and outline icons.
- Directional arrows should use one consistent arrow construction throughout the portfolio.

---

## 4. Motion direction

### 4.1 Motion character

Motion should feel like attentive service: quiet, timely, smooth, and never in the way.

- Micro interaction: 140–220 ms.
- Control or card transition: 260–420 ms.
- Section reveal: 500–800 ms.
- Major product handoff: 900–1,300 ms.
- Use one expressive ease and one direct operational ease.
- Scroll-linked effects must be reversible and lightly applied.

### 4.2 The signature transition: the order relay

The portfolio’s defining moment is a single terracotta order line moving from the guest experience into the restaurant dashboard.

1. A guest adds the customized dish to the cart in a real recording.
2. The order-success number is isolated with a simple mask.
3. A terracotta line leaves that number and crosses the page.
4. The line becomes the left accent on the new order card in the real incoming-orders screen.
5. The restaurant accepts the order.
6. The card moves through Received → Preparing → Ready → Served using real captured states.

This is the hero interaction of the case study. It explains the product in seconds and visually connects both audiences without recreating either interface.

### 4.3 Reusable motion patterns

- **Reveal:** a short masked rise with opacity; use on section introductions only.
- **Media focus:** surrounding content softens slightly while the active screenshot comes forward by 1–2% scale.
- **Board movement:** an order card glides horizontally between status columns with no bounce.
- **Image crop:** food photography moves subtly inside a fixed crop as the page scrolls.
- **Rule draw:** thin dividers draw from left to right to introduce a new chapter.
- **Caption update:** chapter metadata changes with a clean crossfade.
- **Hover:** border, color, or small translate response; avoid large tilt effects.

### 4.4 What not to use

- No cinematic loader.
- No mandatory WebGL runtime.
- No particle universe.
- No 3D tunnel, orbiting technology constellation, or fake architecture city.
- No custom cursor that hides or replaces the native pointer.
- No long pinned sequence measured in hundreds of viewport heights.
- No sound system.
- No fake terminal, fake analytics, or decorative code rain.
- No transition that delays access to content.

---

## 5. The complete visitor journey

## Act 1 — Hero: one product, two sides

### Composition

The first view is cream, spacious, and immediate.

- Left: the existing positioning statement and primary actions.
- Right: one confident product composition using real media.
- A tall guest-menu crop sits in front, showing the editorial dish card and warm food photography.
- A wide incoming-orders crop sits behind it, showing the structured restaurant board.
- The overlap visually states “guest experience + restaurant operations” before the visitor reads the case study.
- A small mono caption identifies both surfaces: `GUEST / MOBILE` and `RESTAURANT / DESKTOP`.

The media should resemble an art-directed case-study cover, not a pile of browser mockups. Use shallow depth, restrained shadow, and no continuous floating animation.

### Opening motion

1. The headline resolves line by line.
2. The guest menu crop reveals upward through a soft mask.
3. The restaurant board reveals horizontally, echoing its column structure.
4. One terracotta trace briefly connects the two and settles.

The full hero should resolve in under one second and be immediately interactive.

### Hero details

- Retain the current cream, terracotta, and espresso identity.
- Replace generic dashboard mockups with real Zestt imagery.
- Keep a single availability indicator if it is current and meaningful.
- Use the serif italic only on one key phrase, such as “products people remember.”
- The primary CTA remains visually solid terracotta; the secondary CTA remains a clear text action.

---

## Act 2 — Proof strip: quiet evidence

The proof strip should feel like a restaurant service ledger rather than animated counters in separate boxes.

- Use one uninterrupted horizontal rule.
- Each metric has a mono index, a large result, and one concise line of context.
- Animate values once when visible, without overshoot.
- Hover or focus may reveal a short source note beneath the metric.
- Do not visualize unverified data or make operational product metrics part of the portfolio proof.

On mobile, the proof becomes a two-column grid or horizontal snap row with native scrolling.

---

## Act 3 — Services: a composed capability index

Keep the existing four service categories and tab behavior. Restyle the section as an editorial index rather than four separate animated universes.

### Desktop

- Left column: numbered service list with large type and fine separators.
- Right column: one changing visual plate.
- Each plate uses abstracted layout geometry or a tightly cropped real project detail, not a fake app screen.
- The active service receives a terracotta rule, while inactive items remain taupe.
- The visual plate changes through crop, scale, and alignment—not a complete physics transformation.

### Visual treatment by service

- **Web and mobile products:** one responsive composition shifting between a mobile and desktop crop.
- **SaaS and white-label systems:** a repeated set of branded surface crops organized around one shared grid.
- **Payment and API flows:** a precise route diagram using labeled states and real experience from the relevant project, never Zestt.
- **Performance and technical SEO:** a before/after trace using verified measurements or recognizable page anatomy.

### Mobile

Use an accessible accordion. The visual appears directly beneath the active service, with no horizontal scroll interception.

---

## Act 4 — Zestt: the centerpiece case study

Zestt should be the most memorable section because the product is shown with unusual clarity, not because the portfolio rebuilds it.

### Opening spread

Use a deep espresso section for one short transition into the case study. Place a warm food image or guest-menu crop on one side and the incoming-orders board on the other. The section title sits between them:

> **One order. Two experiences. One operating system.**

Return to cream immediately after the opening spread. Dark backgrounds should frame the case study, not dominate it.

### Case-study navigation

- A slim sticky chapter rail on desktop.
- Chapter number, short title, and progress line only.
- On mobile, a compact `01 / 09` indicator above each chapter.
- Normal document flow remains intact; no forced scroll-jacking.

### Chapter 1 — Guest menu

Show the real branded, QR-accessed menu at near-native mobile proportions.

- Lead with the category tabs, search, filter control, “Plates made for the table” title, item count, editorial section heading, and food card.
- Let the real food photography carry the frame.
- Use annotations sparingly to identify category navigation, dietary filters, mood-based discovery, and menu hierarchy.
- A gentle vertical crop may follow the actual menu scroll.

Visual character: intimate, appetizing, typographic, and generous.

### Chapter 2 — Item detail and customization

Use a short real recording or three sequential captures:

1. Open the dish.
2. Review image, description, price, dietary information, modifiers, and add-ons.
3. Confirm the customized item.

Present the sequence like contact sheets from an editorial shoot: one dominant frame and two smaller supporting frames. Modifier choices should remain readable; do not decorate over them.

### Chapter 3 — Cart and order review

Show the real cart with selected dishes, quantities, customizations, table details, and total.

- Use a clean side-by-side progression from item customization to cart review.
- A thin terracotta line can connect the selected modifier to its cart line item.
- The “Place order” action receives visual focus through composition, not a fake glowing button.
- Do not show payment, card, wallet, gateway, settlement, or paid states.

### Chapter 4 — Order success

Give the confirmation screen a quiet, celebratory full-height moment.

- Isolate the order number, summary, estimated progress, and live tracking link.
- Use restrained green for successful creation.
- Avoid confetti and generic celebration graphics.
- The order number becomes the anchor for the signature order-relay transition.

### Chapter 5 — Restaurant incoming orders

The order relay lands on the real restaurant dashboard.

- Use a wide, edge-to-edge capture of the three-column operational board.
- Preserve the abundant whitespace; it communicates control, not emptiness.
- Keep `Live service`, grouping controls, timestamps, table number, item customization, total, and Accept action legible.
- A subtle highlight may direct attention to the newly arrived order card.
- Do not fill empty columns with invented orders for visual balance.

Visual character: calm, fast, authoritative, and useful under pressure.

### Chapter 6 — Order statuses

Show the same real order moving through its actual lifecycle:

`Received → Preparing → Ready → Served`

Use `Rejected` only as a clearly labeled exception state.

- Keep the board fixed while the order card moves between columns.
- Update the chapter caption and status color in sync with the recorded interface.
- Movement is direct and operational, with no playful bounce.
- The same table number and order number should persist so the journey reads as one continuous event.

### Chapter 7 — Menu management

Shift from service operations to content control using real repository screens.

Show:

- Creating and editing dishes.
- Category organization.
- Modifier and add-on management.
- Availability changes.
- Menu-data import.
- Guest-facing menu organization.

Use one large primary screen and a restrained row of detail crops. The visual hierarchy should make the relationship between an admin change and the guest menu obvious.

### Chapter 8 — Branding, analytics, and marketing

Present the three modules as a connected editorial triptych.

- **Branding:** restaurant identity, theme, and menu style.
- **Analytics:** real guest behavior and order insights only.
- **Marketing:** QR codes, tables, and promotional assets.

Use consistent crop ratios and captions. Do not turn the section into a generic dashboard collage. The strongest screen receives scale; the other two provide context.

### Chapter 9 — Complete product recording

End the case study with a concise real walkthrough:

1. Guest scans or opens the menu.
2. Guest browses and filters.
3. Guest opens and customizes a dish.
4. Guest reviews the cart and places the order.
5. Restaurant receives and accepts it.
6. Restaurant moves it through preparing and ready.
7. Restaurant marks it served.

The recording should be 30–60 seconds, tightly edited, captioned, muted by default, and manually controllable. Pair it with a simple timeline so visitors can jump directly to `Browse`, `Customize`, `Place`, `Accept`, `Ready`, or `Served`.

### Technical proof after the product story

Only after the full journey is understood, show the engineering layer.

- A flat, readable diagram: `Guest menu → Cart → Order creation → Restaurant orders → Admin operations → Node API → MySQL`.
- Branches for menu management, branding, analytics, and marketing.
- A clear tenant boundary around restaurant-specific data and branding.
- Real stack labels and verified metrics only.
- No decorative 3D node cloud.

Pair the architecture diagram with the repository note:

> The frontend repository contains the actual product components and flows. Standalone design files are not currently packaged separately, so the repository is the primary source of truth.

### Zestt close

Finish with a cream spread containing one guest screenshot, one restaurant screenshot, the live-product link, and the statement:

> **Not a concept. A complete product I designed, engineered, and shipped.**

---

## Act 5 — Selected projects: editorial index

The remaining projects should feel important without competing with Zestt.

- Use an asymmetrical two-column grid with one featured project and smaller supporting entries.
- Each project gets one strong real visual, a short result, role, year, and stack.
- Use hover to reveal a secondary crop or brief loop inside the existing frame.
- Do not transform cards into 3D portals.
- External links retain normal browser behavior and explicit labels.
- If case-study pages are added later, use a restrained shared-element transition as progressive enhancement.

Project-specific art direction may vary, but the portfolio frame—cream, paper, espresso, terracotta rules, consistent captions—keeps the collection coherent.

---

## Act 6 — Experience: service timeline

Style the professional journey like a precise kitchen service timeline.

- A single terracotta rule advances vertically through the roles.
- Each role opens as a clean paper entry with year, company, responsibility, and outcome.
- Technologies appear as quiet mono metadata, not floating badges.
- The current role receives the strongest contrast.
- Earlier roles remain visible and calm; nothing needs to orbit or recede into a tunnel.

On mobile, use a simple vertical sequence with sticky year labels only where they do not obscure content.

---

## Act 7 — Skills: evidence table

Replace the abstract capability constellation with an evidence-led matrix.

### Layout

- Rows are capabilities: interface engineering, frontend architecture, backend systems, multi-tenancy, payments, performance, and SEO.
- Columns are selected projects or roles.
- A terracotta mark shows where each capability was used.
- Selecting a capability filters the visible proof and reveals one concise supporting statement.
- The matrix may collapse into grouped cards on small screens.

This format is more credible, more legible, and visually consistent with the restaurant operations interface.

---

## Act 8 — Philosophy: the quiet course

After the evidence-heavy sections, slow the page down.

- Use a full-width cream field with two large statements separated by a fine rule.
- Introduce one subtle serif italic phrase in each statement.
- Use generous vertical spacing and almost no motion.
- No orbit graphics are needed.
- The section should feel like a pause between courses: considered, warm, and confident.

---

## Act 9 — Contact: reservation card

The contact section should borrow the hospitality logic without becoming themed decoration.

- Treat the form like a refined reservation or project brief card.
- Use a warm paper panel, strong label hierarchy, generous fields, and one decisive terracotta submit action.
- Keep project type, timeline, stage, budget, and message fields unchanged unless content work is separately requested.
- Validation is local and calm: a border and concise message, never a shaking field.
- Keep the existing honest email-based submission behavior unless a backend is intentionally added later.
- Contact details sit outside the card like service information on a menu.

The final visual should feel inviting and serious, not like another special-effects finale.

---

## Act 10 — Footer: the check

End with a compact, beautifully typeset footer.

- Left: identity and one-line positioning.
- Center: navigation and contact channels.
- Right: a circular back-to-top action matching the product’s round utility controls.
- A final mono line shows location, local time, and build year if accurate.
- Back to top uses a smooth native scroll and a brief terracotta rule animation—no full-page recap sequence.

---

## 6. Global components

### 6.1 Navigation

- Keep the rounded header shell, but reduce blur and shadow.
- Active sections receive a terracotta underline or soft parchment fill.
- The header should disappear on downward scroll and return promptly on upward scroll.
- Mobile navigation stays full-screen, typographic, and keyboard-safe.

### 6.2 Section headings

Every section heading uses the same grammar:

- Mono section number.
- Short uppercase eyebrow.
- Large Outfit statement.
- Optional serif italic phrase.
- One supporting paragraph.
- Fine rule aligned to the content grid.

### 6.3 Product-media frames

Create three reusable presentation frames around real assets:

1. **Mobile editorial frame:** narrow portrait crop with minimal edge and a soft paper shadow.
2. **Desktop operations frame:** wide crop with an optional quiet browser bar.
3. **Detail crop:** borderless close-up used for modifiers, status labels, table numbers, and controls.

Frames may mask, crop, and annotate media. They must not alter or reconstruct the underlying UI.

### 6.4 Captions and annotations

- Captions use DM Mono, 10–11 px, uppercase, and taupe.
- Annotation lines are one pixel and terracotta.
- Limit annotations to two or three per scene.
- Annotations explain product decisions or workflow, not obvious labels already visible in the screenshot.
- On mobile, move annotations below media rather than drawing across the screen.

### 6.5 Status language

Use product statuses consistently everywhere:

- Received: terracotta or espresso emphasis.
- Preparing: warm amber-brown if the product uses it; otherwise terracotta.
- Ready: live green.
- Served: quiet taupe or green confirmation.
- Rejected: exception red.

Never reuse these colors decoratively in ways that could confuse state.

---

## 7. Real asset plan

Capture assets from the product at consistent, representative data states.

### Guest assets

- Menu landing and category browsing.
- Search state.
- Dietary and mood-filter states.
- Signature dish card with full food image.
- Item detail.
- Modifier and add-on selection.
- Cart with quantities and customizations.
- Table and order review.
- Order success.
- Live order tracking.

### Restaurant assets

- Incoming order in Received/New.
- Accepted order in Preparing.
- Ready state.
- Served completion.
- Rejected exception, only if a real capture is available and useful.
- Order detail with table, items, customizations, total, and timestamp.
- Menu list and category management.
- Dish create/edit form.
- Modifier management.
- Availability state.
- Import flow.
- Branding controls.
- Analytics overview with real data.
- QR and table management.
- Marketing or promotional asset tools.

### Recording standards

- Capture at native device dimensions.
- Use one coherent demo restaurant and one continuous test order.
- Keep table number, order number, dish, and customization consistent across the journey.
- Hide private customer or restaurant data.
- Record with a clean pointer and no browser extensions or notifications.
- Export a high-quality master, then responsive WebM/MP4 variants and poster frames.
- Provide captions or text descriptions for every meaningful recording.

---

## 8. Responsive direction

### Desktop

- Use the full editorial grid and generous negative space.
- Allow guest and restaurant media to overlap only in hero and major handoff moments.
- Use sticky chapter navigation for Zestt, not a pinned full-page film.
- Keep screenshots large enough for real interface text to remain legible.

### Tablet

- Reduce overlap and favor clear two-column arrangements.
- Chapter rail becomes a compact horizontal progress indicator.
- Product media stays close to its explanation.

### Mobile

- Use one column and native scrolling.
- Show product screens near their natural mobile ratio.
- Desktop dashboard captures may use a labeled horizontal pan only when necessary; a series of readable crops is preferred.
- Do not make users pinch-zoom to understand the restaurant interface.
- Remove sticky behavior that consumes meaningful viewport height.
- Keep the complete guest-to-restaurant story, not a shortened decorative version.

### Reduced motion

- Replace media scrubbing with poster frames or a tap-controlled gallery.
- Replace the order relay with a simple cut from success screen to incoming-order card, supported by a visible matching order number.
- Use opacity and color transitions only.
- Preserve the same content, hierarchy, and visual polish.

---

## 9. Performance and accessibility budgets

### Performance

- LCP at or below 2.5 seconds at the 75th percentile.
- INP at or below 200 ms.
- CLS at or below 0.1.
- No heavy WebGL dependency is required for the core direction.
- Lazy-load recordings and below-the-fold screenshots.
- Use responsive AVIF/WebP images with correct dimensions.
- Use short WebM/MP4 loops with poster images; never autoplay several videos at once.
- Pause offscreen video and animation when the page is hidden.
- Prefer CSS transforms and opacity for transitions.
- Keep one coordinated scroll update loop.

### Accessibility

- Preserve the skip link and logical document order.
- Every product image gets useful alternative text or an adjacent transcript.
- Videos are muted by default, controllable, captioned, and never required to understand the story.
- Sticky or animated sections must preserve focus and reading order.
- Keyboard focus remains visible above all media layers.
- Hover details are also available through focus or static text.
- Color is never the only indicator of an order status.
- Test at 200% zoom and with reduced motion.
- Do not animate focused controls away from the user.

---

## 10. Implementation roadmap

This roadmap changes presentation only. Product screens and behavior are captured from the existing frontend rather than rebuilt inside the portfolio.

## Phase 1 — Art direction and asset capture

- Audit real guest and restaurant screens against the asset list.
- Choose the demo restaurant, dish, customization, table number, and order used throughout the case study.
- Capture the full end-to-end journey.
- Select the exact serif italic and finalize type scale.
- Build one hero composition and one restaurant-board composition as visual tests.

**Exit criterion:** Still frames from the hero and Zestt section already feel like the same authored world as the product.

## Phase 2 — Global visual system

- Refine tokens, typography, spacing, rules, shadows, and media frames.
- Restyle navigation, section headings, buttons, captions, and status treatments.
- Remove decorative elements that compete with product media.
- Establish responsive and reduced-motion behavior before section-specific animation.

**Exit criterion:** The page feels premium and coherent with motion disabled.

## Phase 3 — Hero, proof, and services

- Replace generic hero mockups with real Zestt media.
- Build the simple opening reveal.
- Restyle the proof strip as an evidence ledger.
- Restyle services as an editorial capability index.
- Verify keyboard and touch behavior.

**Exit criterion:** The first three sections communicate taste and capability without spectacle debt.

## Phase 4 — Zestt case study

- Build the nine chapter layouts around real media.
- Add the sticky chapter rail and responsive chapter indicators.
- Implement the order relay using masks and real captures.
- Add the complete recording with timeline controls and captions.
- Add the flat architecture diagram and repository source-of-truth note.
- Verify every capability and order state against the product.

**Exit criterion:** A visitor can accurately describe the complete guest-to-restaurant loop and the restaurant tools without seeing a recreated or invented screen.

## Phase 5 — Remaining portfolio sections

- Restyle projects as an editorial index.
- Convert experience to the service timeline.
- Convert skills to the evidence matrix.
- Simplify philosophy, contact, and footer.
- Remove obsolete 3D, orbit, particle, sound, and custom-cursor plans.

**Exit criterion:** Every section feels related to Zestt’s visual world while retaining its own purpose.

## Phase 6 — Polish and launch hardening

- Tune pacing, crops, type wrapping, and annotations across breakpoints.
- Compress images and recordings.
- Test keyboard, screen reader, reduced motion, slow connections, and real devices.
- Validate all links, metrics, status names, and product claims.
- Remove any motion or decoration that does not improve understanding.

**Exit criterion:** The portfolio remains fast, legible, and distinctive on an ordinary phone—not only on a high-end desktop.

---

## 11. Build priority

### Must ship

1. A visually resolved cream, paper, espresso, and terracotta system.
2. Real Zestt guest and restaurant media in the hero.
3. The complete Zestt case study using real captures.
4. The guest-to-restaurant order relay.
5. The full product recording.
6. Strong responsive and reduced-motion versions.
7. Performance and accessibility hardening.

### Should ship

1. Editorial service index.
2. Evidence-led project grid.
3. Experience service timeline.
4. Skills evidence matrix.
5. Product annotations and chapter navigation.

### Optional polish

1. Subtle paper grain.
2. A controlled screenshot scrub on capable desktop devices.
3. A short hover loop for selected project cards.
4. Shared-element transitions for future local case-study pages.

---

## 12. Definition of done

The visual update is complete only when:

- The portfolio and Zestt visibly belong to the same design mind.
- The hero immediately communicates both the guest and restaurant sides.
- The guest experience feels warm, desirable, and editorial.
- The restaurant experience feels calm, legible, and operational.
- Real product media is the dominant proof.
- No product interface was recreated solely for the portfolio.
- The order journey preserves one consistent dish, customization, table, and order identity.
- Received, Preparing, Ready, Served, and Rejected are represented accurately.
- Menu management, branding, analytics, marketing, QR, and table tools are shown accurately.
- No payment capability is implied.
- The full product recording is usable, captioned, and optional to play.
- Mobile feels intentionally composed.
- Reduced motion feels complete rather than stripped down.
- The page is excellent as a set of still frames and becomes better through motion.
- Decorative effects never compete with food, interface, copy, or proof.

---

## 13. Final intended result

The finished portfolio should feel like an editorial restaurant journal designed by a product engineer.

It opens with a clear portrait of Zestt’s two-sided world. It lets guests browse a beautifully branded menu, inspect and customize a dish, review a cart, place an order, and receive confirmation. That same order then crosses the page into the restaurant’s live board, moves through its real service states, and opens into the broader operating platform: menus, categories, modifiers, availability, branding, analytics, QR codes, tables, and marketing.

The engineering layer arrives as the explanation beneath the experience, not as abstract decoration above it.

The defining creative decision is:

> **Do not recreate the product. Art-direct the truth of the product so beautifully that the real work becomes impossible to ignore.**
