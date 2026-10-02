# First Mile sample and interaction contract

September 30, 2026. Product recommendation within the authorized prototype; human validation remains open. The September 28 brief remains historical.

## Original sample

Northstar is a fictional small B2B team. The one supported goal is to try routing a customer inquiry. The small-team template has an **Intake** queue and **Customer care** destination. Inquiry **NS-104**, from fictional **Avery at Cedar Works**, asks “Can you help me add a second workspace?” Its topic is workspace help, so the intended destination is Customer care. These bundled records contain no customer data. No network, sign-in, messaging, invitation, or AI service is used.

Only goal selection is required input. Workspace naming, branding, channel configuration, and collaborators cannot improve this specific practice decision and are deferred. Unsupported goals (forecasting or billing) are explicitly outside scope.

## State and action contract

- Goal selection establishes relevance. Opening a template preview changes no durable state. Confirming applies the small-team template; cancel returns without applying it.
- Routing requires the confirmed template. Its preview identifies NS-104 and Customer care. Only confirmation moves the bundled inquiry. A completed route cannot execute again, including after refresh or repeated clicks.
- Collaborator setup is optional and becomes available after routing. Simulate shows the fictional teammate **Mina, customer care lead** in a preview. Confirmation records simulation only. Skip is recorded as deferred, never completed; it remains available later.
- Preview carries the current state revision. Any intervening change, including another tab, invalidates it. Old confirmations cannot write. Refresh closes previews and returns to the last confirmed state.
- Compatible browser storage restores confirmed progress. Invalid JSON, wrong schema/version, impossible combinations, or unexpected fields are rejected with explanation; the saved value remains untouched until explicit reset. Unavailable reads or writes use temporary in-memory practice and warn that refresh may lose it. October 2 clarification: unreadable storage is never written, even if writes still work. Temporary actions, including reset, retain any existing saved bytes. When reads recover, temporary work remains in memory until an explicit reset replaces the now-readable saved practice.
- Undo routing is a deliberate confirmed action: it returns NS-104 to Intake and clears dependent collaborator simulation/deferral, retaining the confirmed template. It is not an external recall and is not a multi-action history. Reset is separately confirmed and clears the current practice; it replaces saved progress only when storage can be read, otherwise it resets temporary memory alone. Neither can reverse a real-world action because none occurs.
- Cross-tab updates replace compatible confirmed state, close previews, clear focus safely, and announce the change. No merging or multiuser collaboration is promised.

Success means exactly one local route to the intended queue. Completion does not establish comprehension, relevance, adoption, or readiness for real customers. Proposed human evaluation belongs in the case study.
