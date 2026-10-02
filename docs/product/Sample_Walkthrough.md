# First Mile reviewer walkthrough

Use the app at `/First-Mile/`. The primary outcome and recovery below use only bundled fictional records; no account or external service is involved.

## Primary journey

1. Start fresh if prior practice exists: **Reset practice → Reset local practice**. Reset has no undo.
2. Choose **Route a customer inquiry**. The supported goal is now selected; the workspace still says **Not applied** and **Waiting in Intake**.
3. Choose **Preview template**. Review Small team, Intake → Customer care and the workspace-help rule. Opening the dialog applies nothing. Choose **Cancel** or Escape to prove that.
4. Open the template preview again and choose **Use practice template**. The template is applied; NS-104 remains in Intake.
5. Read NS-104: fictional Avery at Cedar Works asks for help adding a second workspace. Choose **Preview sample route** and review the intended Customer care destination and practice boundary.
6. Choose **Confirm sample route**. The outcome states NS-104 reached Customer care, practice only. The workspace agrees; a second route button is absent.
7. Choose **Skip for now**. Collaborator setup shows **Deferred**, not completed. Refresh. The outcome and deferral return, and completed routing cannot replay.
8. Choose **Preview collaborator simulation → Confirm collaborator simulation**. Mina appears as a sample collaborator with **Simulated only**; no invitation or real access is created.

## Recovery and boundaries

- **Cancel routing:** reset and complete steps 2–4; preview the route and cancel. NS-104 stays in Intake and can be previewed again.
- **Refresh a preview:** open a template or route preview, then refresh. Only the last confirmed progress returns; the preview is closed.
- **Undo routing:** after an outcome, choose **Undo practice route → Undo sample route**. NS-104 returns to Intake, the Small team template remains applied, and collaborator state returns to Not completed. Route again deliberately if useful.
- **Cancel reset:** choose Reset practice, then Cancel. Confirmed progress stays intact. Confirming reset starts fresh and cannot be undone.
- **Unsupported goal:** start fresh and select forecasting/billing/another goal. Read the explicit limit; choose the routing option to continue with the supported example.
- **Another tab:** with a route preview open, reset this same app in a second tab on the same origin. The first preview closes and announces the change; an old confirmation cannot proceed.
- **Invalid saved data:** the browser recovery test places malformed JSON under `northstar.first-mile.v1`; separate domain checks cover incompatible versions and impossible state combinations. Recovery explains the problem and keeps the rejected value until an explicitly confirmed reset. Normal users do not need browser tools for the ordinary flow.
- **Unavailable storage:** browser tests block the storage getter, block reads alone while writes still work, and block reads after applying the template. The app explains temporary practice and keeps active work; refresh may lose it. Existing saved bytes stay untouched through goal selection, confirmation, deferral and reset while reads fail. After reads recover, temporary work does not autosave over older progress: an explicit reset replaces the readable saved practice and restores normal persistence.

## Access and interpretation

The first Tab exposes **Skip to practice**. Use Tab/Shift+Tab and Enter/Space for buttons; Escape cancels dialogs. Focus moves to the new journey heading after confirmation. Status changes are announced politely. At 390px width, the workspace follows the journey with no horizontal scrolling. Reduced motion preferences remove transitions.

Explain these in your own words: where the inquiry went, what was practice, and what remains deferred. This walkthrough supplies tasks; it does not assert that Mo or any participant performed or understood them.
