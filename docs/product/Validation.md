# First Mile validation evidence

September 30, 2026 · AI-assisted software verification on the local bounded prototype. These checks are not human research, Mo's personal review, adoption evidence, or live deployment verification.

## Actual checks

| Check | Result / scope |
|---|---|
| Lint and tracked/local environment guard | Passed; static sample requires no credentials, generated runtime folders are ignored. |
| Strict TypeScript check | Passed. |
| Domain regressions | 29 passed in 1 file. Includes prerequisite rules, preview immutability, stale revision, duplicate action, optional deferral/simulation, undo/reset, compatible persistence, malformed/impossible/versioned state and failed reads/writes. |
| Production build | Passed with `/First-Mile/` asset base, CSP/no-referrer metadata and product documents copied to output. |
| Dependency audit | 0 vulnerabilities across the installed lockfile; high/critical gate passed. |
| Production Chromium browser flows | 14 passed. Playwright owns a production preview on port 4186 and stops it after the run. |
| Visual inspection | Desktop entry and mobile entry/outcome screenshots inspected with image viewing. No clipped primary/recovery controls or horizontal overflow at 390px. Unsupported-goal text alignment corrected after desktop inspection. |
| Browser runtime boundary | Main flow recorded no page errors. Optional simulation flow recorded no external requests. Production security metadata and case/contract/walkthrough URLs were checked. |

The 14 browser flows cover primary route/defer/return/undo/reset; template preview immutability and Escape/focus restoration; simulation after deferral; unsupported goals; invalid storage retained through cancellation until confirmed reset; storage getter failure; getter becoming blocked after applied setup; same-revision divergent saved-state rejection; second-tab invalidation; keyboard journey and focus/live announcements; 390px narrow layout; production metadata/docs; route/reset cancellation; and quota write failure with retained in-memory outcome.

Initial execution required installing the matching Chromium build. Subsequent tests exposed an ambiguous test text selector and cancellation focus not returning to the trigger. The selector now targets optional setup; explicit trigger restoration corrected the product focus behavior. All listed final browser flows passed after repair. Newly unavailable reads retain the active state before switching to temporary mode; independent source review caught that boundary before final verification.

## Reproduce

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
npx playwright install chromium
npm run test:e2e
```

`test:e2e` verifies built production output and requires port 4186 free. CI repeats these gates before Pages deployment. Screenshots are generated under ignored `test-results/`; selected review evidence is in `docs/media/`. Keyboard verification uses native controls/dialogs and checks focus and a polite status region; it is not a full screen-reader or accessibility certification.

## Work-package coverage

- **S002:** original sample, state/cancellation/error/recovery contract and visual direction complete as product recommendations.
- **S003:** static entry/navigation, guarded build and CI foundation locally verified. Remote name collision check and public deployment verification passed on September 30.
- **S004:** complete goal/template/one-inquiry routing behavior and regression evidence.
- **S005:** optional simulation, honest deferral, return summary and duplicate-action prevention.
- **S006:** stale confirmation prevention, cancellation, compatible refresh, invalid/unavailable storage, bounded undo and confirmed reset.
- **S007:** local software, focus/keyboard/mobile and visual checks, coherent PM case and proposed evaluation measures. No human validation claimed.
- **S008:** independent source/browser review and public source/demo verification passed, as recorded below. Mo's personal product review and human comprehension remain unobserved; software checks cannot establish either.

Browser persistence is not transactional across simultaneous tabs, and no synchronization beyond compatible last stored state is promised. Human comprehension, actual time to first value, fit, optional-step understanding, and recovery usability remain proposed evaluation questions. No real invitations or routing can be inferred from simulation.

## Independent release review

The primary reviewer inspected the state rules, recovery implementation and desktop/mobile output, then replayed routing, collaborator deferral, return and bounded undo in a separate production browser session. The 320px outcome layout had no horizontal overflow, and the browser reported no page errors. Private-source and relative-link preflight passed across 30 tracked files and 14 local links before release. Personal comprehension and human validation remain unobserved. Public Actions/Pages and artifact/live parity subsequently passed, as recorded below.

## Public release verification

The initial public release at `4a59b4dfbad66d877d1ef8604dc95e4bea666874` passed [GitHub verification and Pages deployment](https://github.com/mvahedi2020/First-Mile/actions/runs/36826832987). Local HEAD matched GitHub main, the worktree was clean, and all 14 published files matched the local production build and the deployment artifact byte for byte. CSP and no-referrer metadata were present. The live reviewer route is [First Mile](https://mvahedi2020.github.io/First-Mile/). These are point-in-time software/publication observations from September 30, 2026, not uptime, production adoption or human-study claims.


## October 2 maintenance — unreadable storage write boundary

The September 30 results and release observations above remain historical. This narrow repair was verified locally on October 2, 2026; its publication and live parity remain pending the primary delivery chat. No new human validation is claimed.

**Reproduction:** starting from public-release baseline `ef80785585f703c7d655117cc4fc056f48aed0b6`, an isolated production Playwright fixture seeded `{unseen-invalid`, retained a callable original storage reader, and made `getItem` throw while `setItem` still worked. Selecting the inquiry-routing goal changed the unseen saved bytes to revision-1 routing JSON. This violated the temporary in-memory promise and could erase data that had never been read. The new regression failed on that exact byte-preservation assertion before repair.

**Repair:** every durable mutation now checks current readability. A failed read keeps the action in memory without attempting a write, including explicit reset. Temporary work does not silently replace an older saved journey when reads recover. An explicitly confirmed reset may replace readable saved data and resume persistence. The temporary warning and reset preview explain this boundary. Normal invalid-data reset, revision/content stale guards, and return behavior remain covered by the existing suite. Direct mutations also reject newly invalid or divergent readable saved state.

**Actual October 2 checks:**

- Lint/environment guard, strict types, and production build passed.
- 29 domain tests passed in 1 file; no domain behavior was broadened.
- 17 full production Chromium browser flows passed: the previous 14 plus 3 regressions for unreadable-from-entry bytes across goal/template/route/reset; read failure after setup, deferral, temporary reset and explicit readable reset; and reads becoming blocked during direct goal selection.
- Dependency audit reported 0 vulnerabilities.
- Named `agent-browser` session `first-mile-oct2-maintenance` loaded production output, showed meaningful controls without a browser error, and repeated a read-only-failure fixture. Original `{manual-unseen` bytes remained unchanged after selecting the goal; the temporary warning remained visible. Its screenshot was inspected. This was AI-assisted browser verification, not a human usability session.

Production browser checks used port 4186. The Playwright preview, named browser session, and separate manual preview were stopped after verification. No remote, push, profile, plan, or unrelated repository was changed by this maintenance agent. Publication and independent final review belong to the primary delivery chat.


### October 2 prepublication follow-up — bind reset review to storage

Primary source review found that a reset opened in temporary or invalid mode could bypass normal saved-state comparison, allowing a different readable record or recovered readability to be accepted after the user had already reviewed the reset. The maintenance had not been published.

Reset opening now captures current raw saved bytes and readability. Confirmation compares both before any reset mutation, and uses that checked snapshot to decide whether the reset can persist. A changed record or changed readability rejects the reset, leaves current practice and bytes untouched, and requests a fresh preview. A fresh reset after readability recovers remains allowed. No other journey or styling behavior was added.

**Final local checks after this follow-up:** lint/environment guard, strict types, 29 domain tests, production build and dependency audit (0 vulnerabilities) passed. All **20 production Chromium browser flows** passed: the preceding 17 plus invalid-recovery reset with a different readable record during review; temporary reset with readability recovered during review (reject, then fresh preview succeeds); and saved reset with reads becoming unavailable during review (reject without clearing active practice or stored bytes). These fixtures change storage in the same tab without a storage event to exercise the missed-event boundary. Playwright owned and stopped the port-4186 preview. Final independent review, publication and live parity remain the primary delivery chat's work.
