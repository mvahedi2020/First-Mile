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

## Work-package coverage and pending release

- **S002:** original sample, state/cancellation/error/recovery contract and visual direction complete as product recommendations.
- **S003:** static entry/navigation, guarded build and CI foundation locally verified. Remote name collision check passed on September 30; public deployment verification is in progress.
- **S004:** complete goal/template/one-inquiry routing behavior and regression evidence.
- **S005:** optional simulation, honest deferral, return summary and duplicate-action prevention.
- **S006:** stale confirmation prevention, cancellation, compatible refresh, invalid/unavailable storage, bounded undo and confirmed reset.
- **S007:** local software, focus/keyboard/mobile and visual checks, coherent PM case and proposed evaluation measures. No human validation claimed.
- **S008:** local release preparation complete; independent final review, public source/demo parity, profile route and Mo's personal product review are not included in the local test results above. Do not mark the full publication work package complete from local tests alone.

Browser persistence is not transactional across simultaneous tabs, and no synchronization beyond compatible last stored state is promised. Human comprehension, actual time to first value, fit, optional-step understanding, and recovery usability remain proposed evaluation questions. No real invitations or routing can be inferred from simulation.

## Independent release review

The primary reviewer inspected the state rules, recovery implementation and desktop/mobile output, then replayed routing, collaborator deferral, return and bounded undo in a separate production browser session. The 320px outcome layout had no horizontal overflow, and the browser reported no page errors. Private-source and relative-link preflight passed across 30 tracked files and 14 local links before release. Personal comprehension and human validation remain unobserved. Public Actions/Pages and artifact/live parity are the remaining publication checks.
