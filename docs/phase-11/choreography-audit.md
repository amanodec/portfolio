# Phase 11 choreography audit

Date: 2026-08-03  
Status: objective audit complete; subjective removals are awaiting Aman’s
direction and fresh-viewer feedback.

## Review boundary

The audit covers the Phase 10 production candidate, the semantic DOM, the
shared runtime, the reduced-effects/reduced-motion contracts, and the final
claim register. It does not declare the experience cinematic, awe-inspiring,
non-template, or launch-ready. Those are Aman’s visual decisions.

The objective browser regression suite was run against the production preview.
The in-app browser connector was unavailable in this environment
(`agent.browsers.list()` returned no available browsers), so no visual watch,
screenshot judgment, or fresh-viewer conclusion is being fabricated here.
Phase 10 captures remain objective change-detection evidence only.

## Scene and scroll budget inventory

These are the declared CSS scene budgets and deterministic runtime states. The
exact rendered document scroll height and live Zestt percentage still need to
be captured in Aman’s review browser because layout depends on viewport,
content wrapping, and browser UI chrome.

| Scene | Runtime surface | Declared allocation / states | Primary beat |
|---|---|---|---|
| 01 | `#hero` / `phase1-hero` | `180svh` desktop; `150svh` at ≤760px; 650ms non-blocking ignition | Zestt signal wakes and hands off |
| 02 | `#identity` / `phase2-identity` | `178svh` desktop; `165svh` at ≤760px; receive → midpoint → handoff | Aman’s visual instinct / engineering discipline split |
| 03 | `#zestt`, `#trading-leagues`, `#decisionarc`, `#vinayak-bikers` | `285svh` per project world; entry 0–28%, signature 28–70%, proof after 70% | Four project match cuts with one shared token |
— | Proof ledger | Removed in Phase 11; it published unverified metrics and repeated a generic evidence-card pattern | — |
| 04 | `#skills` / capability reactor | Content-driven section; six selectable layers; assemble → inspect → reassemble | Capability evidence replaces a claim table |
— | `#projects` / world index | Content-driven direct index after the four worlds | Semantic project recall and direct navigation |
| 05 | `#experience` / spatial experience | `clamp(1200px, 145vh, 1680px)`; role stops and direct anchors | Professional proof grounds the spectacle |
| 06 | `#playground` | `clamp(1420px, 190vh, 2160px)`; three experiment panels | Reusable interaction proof |
| 07 | `#philosophy` / quiet interval | `clamp(680px, 94svh, 980px)`; still / breathing / exit | Deliberate rest |
| 08 | `#contact` / contact finale | `980px`; `1120px` at ≤600px; entry → ready → complete | Contact transmission and honest mail-client handoff |

The declared project budget makes Zestt one of four equal-length project
worlds. The hero and Zestt world keep it first and visually primary, but the
35–45% narrative target cannot be asserted from CSS declarations alone. The
live scroll allocation is an explicit final-review check.

## Effect inventory

| Effect / source | Trigger and settle state | Purpose | Repetition / fatigue flag |
|---|---|---|---|
| Hero Signal renderer (`HeroScene`, `Renderer`) | Load/scroll/pointer; settles into the hero handoff | Establishes Zestt and the shared Signal | Signature effect; keep pending visual review |
| Global `.reveal` (`style.css`, `script.js`) | Intersection; settles at `opacity: 1`, `translateY(0)` | Reveals capability and index headings | Candidate: the same generic fade-and-rise repeats across non-hero content |
| Identity split, mask, and pointer field (`IdentityScene`) | Scroll and drag/pointer; settles at midpoint or handoff | Explains Aman’s working philosophy | Distinct interaction; keep pending visual review |
| Project portal phases and token (`ProjectPortal`, project worlds) | Scroll/pointer; entry → signature → proof | Gives each world a bounded narrative | Shared grammar is intentional; verify that four repetitions do not exhaust |
| Project match cut (`ProjectMatchCut`) | World progress near entry/exit; incoming/outgoing flags settle to idle | Carries the Signal between projects | Repeats at every world boundary; candidate for reduction if transitions feel queued |
| Capability reactor explosion/connectors | Hover/focus/tap/scroll; selected layer or assembled core | Turns capability claims into evidence | Distinct proof interaction; retain unless viewers find it overlong |
| Experience path/year plane | Scroll and role selection; selected role settles in evidence pane | Maps professional time to a result | One spatial metaphor; no obvious duplicate |
| Playground experiments | Tab/focus/drag/range and bounded curve replay | Demonstrates reusable process | Three demonstrations in one scene; check total duration and recall |
| Quiet Signal breathing (`QuietScene`) | Scene active in full effects; stops on leave/reduced/hidden | Creates stillness after spectacle | Functional stillness beat; keep unless the breath distracts |
| Contact transmission and monogram | Field focus/completion/submit; status and deferred monogram settle | Makes the final action legible | Functional, not decorative-only; preserve accessibility and mailto honesty |
| Receive/exit coordinate rails | Scene boundaries; static labels and lines | Marks chapter handoffs | Candidate: repeated separator language may make the page feel templated |

## Objective removal completed

The former proof ledger was removed because its four public metrics were marked
`Aman confirmation required` in the approved Phase 0 claim register. The
associated counter animation, `data-count` contract, and stale ledger CSS were
removed as well. The performance capability now uses the approved conservative
Rain Platforms wording without a numeric claim.

No other effect was removed or re-timed without Aman’s visual decision.

## Decisions requested from Aman

Please review the candidate flags above and identify each as `keep`, `alter`,
or `remove`. In particular:

1. Should the repeated generic `.reveal` fade-and-rise remain on the capability
   and project-index headings?
2. Should receive/exit coordinate rails be reduced between scenes?
3. Do the four project match cuts remain distinct enough at normal and fast
   scroll speeds?
4. Does the playground earn its scroll allocation, or should one experiment
   be shortened in the same phase?
5. Does the live rendered journey keep Zestt within the intended 35–45%
   narrative share?

