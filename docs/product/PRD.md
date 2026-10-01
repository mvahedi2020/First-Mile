# First Mile product requirements

September 30, 2026 · Current complete bounded prototype. S001's September 28 brief is retained as historical framing.

## Decision and user

For a first-time administrator evaluating a small B2B team's inquiry workflow, require only decisions that make a useful first outcome understandable. Let unrelated setup wait. The hypothesis is that a prepared practice can help evaluate fit before asking colleagues to join; no research confirms this hypothesis yet.

The smallest outcome is deliberate routing of NS-104 to Customer care, with visible destination and an explicit practice boundary. Choosing a template alone is not first value. Successful software execution is separate from a person's comprehension or adoption.

## Functional acceptance

| Requirement | Acceptance |
|---|---|
| Relevance | Choose inquiry routing; other goals show limitations and allow choosing the supported sample. |
| Minimum setup | Northstar and Small team are prepared. No branding, account, inbox, or teammate is required. |
| Template preview | Names Intake, Customer care and the workspace-help rule. Preview and cancellation do not apply it. Explicit confirmation applies it without routing. |
| Inquiry action | Shows original fictional sample, intended destination and reason. Preview is reversible; confirmation performs exactly one local route. |
| Optional setup | After routing, preview and confirm a fictional collaborator simulation or Skip for now. Deferred remains distinct from simulated. |
| Return | Restore compatible confirmed browser progress; show result and optional state without enabling duplicate route. Open previews are discarded on refresh. |
| Recovery | Reject stale previews, explain invalid or unavailable storage, confirm reset and bounded route undo. Undo clears dependent optional state and retains template. |
| Access | Use native buttons, landmark structure, dialog focus containment, Escape cancellation, focus after transitions, live announcements, narrow layout and reduced motion. |
| Review | Expose product case, sample contract, exact walkthrough, actual software checks and unperformed evaluation. |

## Delivery and exclusions

Static React/TypeScript application deployed under `/First-Mile/`, with bundled records and local browser persistence. Production browser tests run against built output. The app needs no runtime credentials or external network services. Development and preview use port 4186.

No real invitations, messages, sign-in, live routing, broad help desk, paid APIs, analytics tracking, AI inference, integrations, or links between unrelated demos. Persistence is confined to one browser origin; privacy settings and quota can prevent it. Cross-tab changes replace confirmed state rather than merge independent work. Concurrent writes are not a transactional backend.

## Proposed evaluation and investment criteria

Observe eligible first-time administrators in a separately authorized formative study. First-attempt completion denominator includes every eligible starter; report assistance, abandonment and retries separately. Start time at the first actionable goal screen and stop when the routing result is visible. Record reading/pauses without penalizing them. Ask the destination and whether anything was sent externally. On return, ask what remains deferred. Ask a deliberate cancellation/recovery task.

Continue if the relevant prepared task and destination are understood. Simplify to an illustrated explanation if interaction adds effort without helping evaluation. Reconsider user or outcome if collaboration or another first task is essential. These are decision rules and proposed measures, not measured results or targets.

## Ownership

Mo Vahedi owns product direction, prioritization, scope and evaluation decisions. AI assists implementation and software verification. Material implementation choices are recommendations within the authorized scope; Mo's personal review, comprehension, and human validation are not claimed. Public publication and live parity remain release gates until actually performed.
