import { useEffect, useRef, useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog'
import { can, chooseGoal, confirm, initial, load, parse, sample, save, skip, STORAGE_KEY, type Action, type Journey, type Preview, type Persistence } from './journey'
function readBrowser() { try { return load(window.localStorage) } catch { return { state: initial(), persistence: 'temporary' as const, returned: false } } }
const copy: Record<Action, { title: string; confirm: string; description: string }> = {
  template: { title: 'Use this practice template?', confirm: 'Use practice template', description: 'Apply the Small team template to this browser’s fictional Northstar workspace. It adds an Intake queue and a Customer care destination. No inquiry moves yet.' },
  route: { title: 'Route the sample inquiry?', confirm: 'Confirm sample route', description: 'Move NS-104 from Intake to Customer care in this local practice workspace. Nothing is sent to a real person or service.' },
  collaborator: { title: 'Simulate adding Mina?', confirm: 'Confirm collaborator simulation', description: 'Mark Mina, our fictional customer care lead, as a simulated collaborator. No invitation, email, access permission, or real teammate is created.' },
  undo: { title: 'Undo this practice route?', confirm: 'Undo sample route', description: 'Return NS-104 to Intake and clear collaborator simulation or deferral. The practice template stays applied. This is one bounded reversal, not a history of prior actions.' },
  reset: { title: 'Start a fresh practice?', confirm: 'Reset local practice', description: 'Clear the goal, template, routed inquiry, and optional collaborator state in this browser. There is no undo for reset. Invalid saved data, if present, will be replaced.' },
}
export function App() {
  const [boot] = useState(readBrowser)
  const [state, setState] = useState(boot.state)
  const stateRef = useRef(state)
  const [persistence, setPersistence] = useState<Persistence>(boot.persistence)
  const persistenceRef = useRef(persistence)
  const [preview, setPreview] = useState<Preview | null>(null)
  const [notice, setNotice] = useState(boot.returned ? 'Welcome back. Your last confirmed practice is restored.' : 'Your practice starts here. Nothing has been routed.')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const focusHeading = () => requestAnimationFrame(() => titleRef.current?.focus())
  const write = (next: Journey, message: string) => {
    stateRef.current = next; setState(next)
    let saved = false
    try { saved = save(window.localStorage, next) } catch { /* Browser privacy mode may prevent even accessing storage. */ }
    const mode = saved ? 'saved' : 'temporary'
    persistenceRef.current = mode; setPersistence(mode); setNotice(message); setPreview(null); focusHeading()
  }
  useEffect(() => {
    const receive = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return
      const next = parse(event.key === null ? null : event.newValue)
      stateRef.current = next ?? initial(); setState(stateRef.current)
      const mode = next ? 'saved' : 'invalid'; persistenceRef.current = mode; setPersistence(mode)
      setPreview(null); setNotice('Saved practice changed in another tab. Open a fresh preview before confirming.'); focusHeading()
    }
    window.addEventListener('storage', receive)
    return () => window.removeEventListener('storage', receive)
  }, [])
  const open = (action: Action) => { if (can(stateRef.current, action)) { openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setPreview({ action, revision: stateRef.current.revision }) } }
  const commit = () => {
    if (!preview) return
    let current = stateRef.current
    // Re-read immediately before confirmation; another tab may have changed storage before its event arrives.
    if (persistenceRef.current === 'saved') {
      const latest = readBrowser()
      if (latest.persistence === 'temporary') {
        persistenceRef.current = 'temporary'; setPersistence('temporary')
      } else if (latest.persistence === 'invalid' || JSON.stringify(latest.state) !== JSON.stringify(current)) {
        current = latest.state; stateRef.current = current; setState(current)
        persistenceRef.current = latest.persistence; setPersistence(latest.persistence); setPreview(null)
        setNotice('This preview is out of date. Review the current practice and open a new preview.'); focusHeading(); return
      }
    }
    const next = confirm(current, preview)
    if (next === current) { setPreview(null); setNotice('This preview is out of date. No action was taken.'); focusHeading(); return }
    const messages: Record<Action, string> = { template: 'Practice template applied. NS-104 remains in Intake.', route: 'NS-104 routed to Customer care. Practice only; nothing was sent externally.', collaborator: 'Mina added in simulation only. No invitation sent.', undo: 'Route undone. NS-104 is back in Intake; optional collaborator state cleared.', reset: 'Local practice reset. Choose a goal to begin again.' }
    write(next, messages[preview.action])
  }
  const select = (goal: 'routing' | 'other') => write(chooseGoal(stateRef.current, goal), goal === 'routing' ? 'Inquiry routing selected. Preview the small-team template next.' : 'This prototype cannot evaluate forecasting or billing. Choose inquiry routing to explore the supported sample.')
  const cancel = () => { setPreview(null); setNotice('Preview cancelled. Confirmed practice is unchanged.'); requestAnimationFrame(() => openerRef.current?.focus()) }
  const step = state.routed ? 3 : state.setup ? 2 : state.goal === 'routing' ? 1 : 0
  const heading = persistence === 'invalid' ? 'Let’s recover your practice.' : state.routed ? 'A useful first outcome.' : state.setup ? 'Try one real decision.' : state.goal === 'routing' ? 'A small team. A clear route.' : state.goal === 'other' ? 'Your goal deserves a different example.' : 'Find value before finishing setup.'
  return <>
    <a className="skip-link" href="#journey">Skip to practice</a>
    <header className="topbar"><a href={import.meta.env.BASE_URL} className="brand" aria-label="First Mile home"><span className="brand-mark" aria-hidden="true">F</span>First Mile<span className="brand-sub">by Northstar</span></a><span className="practice-tag">Fictional practice · No external actions</span></header>
    <main>
      <div className="intro"><p className="eyebrow">A little setup. One useful outcome.</p><span className="storage-indicator">{persistence === 'saved' ? state.revision === 0 ? 'Browser storage ready' : 'Saved in this browser' : persistence === 'temporary' ? 'Temporary practice' : 'Recovery needed'}</span></div>
      <div className="layout">
        <section id="journey" className="journey" aria-labelledby="journey-title">
          <nav aria-label="Practice progress"><ol className="steps">{['Choose a goal', 'Preview setup', 'Try the route', 'Your outcome'].map((label, i) => <li key={label} aria-current={step === i ? 'step' : undefined} className={i < step ? 'done' : i === step ? 'current' : ''}><span aria-hidden="true">{i < step ? '✓' : i + 1}</span>{label}</li>)}</ol></nav>
          <p className="eyebrow step-label">{state.routed ? 'Practice outcome' : `Step ${step + 1} of 4`}</p>
          <h1 ref={titleRef} id="journey-title" tabIndex={-1}>{heading}</h1>
          {persistence === 'temporary' && <div className="warning" role="status">Browser storage is unavailable. You can keep practicing here, but refresh or closing this tab may lose progress.</div>}
          {persistence === 'invalid' ? <><p>Your saved practice is unreadable or incompatible. It has not been silently replaced. Start fresh to replace it with a clean sample.</p><button onClick={() => open('reset')}>Start fresh practice</button></> : <>
          {!state.setup && state.goal !== 'routing' && <>
            <p className="lede">Try routing one fictional inquiry before you bring in your team. See where it goes, then decide what to do next.</p>
            <fieldset className="goal-options"><legend>What would you like to evaluate?</legend><button className="goal-card" onClick={() => select('routing')}><span className="goal-icon" aria-hidden="true">↗</span><span><strong>Route a customer inquiry</strong><small>Try a prepared workflow for a small team.</small></span><span aria-hidden="true">→</span></button><button className="goal-card secondary" onClick={() => select('other')}><span className="goal-icon muted" aria-hidden="true">⋯</span><span><strong>Forecasting, billing, or another goal</strong><small>See the limits of this example.</small></span></button></fieldset>
            {state.goal === 'other' && <div className="warning">Only inquiry routing is supported. This sample cannot show whether Northstar fits your other workflow; completing it would not establish fit.</div>}
            <p className="helper">No account, workspace name, or real inbox required.</p>
          </>}
          {!state.setup && state.goal === 'routing' && <><p className="lede">The Small team template gives your inquiry somewhere understandable to go. Review it before applying anything.</p><div className="template-card"><span className="mini-label">Prepared practice template</span><h2>Small team</h2><p>One starting queue. One destination. A clear reason for the route.</p><div className="route-strip"><span>Intake</span><span aria-hidden="true">→</span><strong>Customer care</strong></div><p className="helper">Rule: workspace help goes to Customer care.</p></div><div className="actions"><button onClick={() => open('template')}>Preview template <span aria-hidden="true">→</span></button><button className="text-button" onClick={() => select('other')}>Choose another goal</button></div><p className="helper">Previewing leaves your workspace unchanged.</p></>}
          {state.setup && !state.routed && <><p className="lede">Your practice template is ready. Read the sample, check its destination, and make the routing choice.</p><div className="inquiry"><span className="mini-label">{sample.id} · Bundled fictional inquiry</span><h2>{sample.title}</h2><p>“{sample.body}”</p><p className="helper">From {sample.from} · Topic: workspace help</p></div><button onClick={() => open('route')}>Preview sample route <span aria-hidden="true">→</span></button><p className="helper">No external message will be sent. Confirming moves only this sample.</p></>}
          {state.routed && <><p className="lede">You deliberately routed <strong>NS-104 to Customer care</strong>. You can inspect the destination without completing the rest of setup.</p><div className="outcome"><span className="outcome-check" aria-hidden="true">✓</span><div><strong>Practice route completed</strong><p>One sample inquiry, in its intended queue. Nothing sent externally.</p></div></div><section className="optional" aria-labelledby="optional-title"><div className="section-heading"><h2 id="optional-title">Bring in a teammate?</h2><span className="pill">Optional</span></div><p>{state.collaborator === 'pending' ? 'You can simulate adding Mina, the fictional customer care lead, or leave this for later.' : state.collaborator === 'skipped' ? 'Deferred, not completed. You skipped collaborator setup for now and can still try the simulation.' : 'Simulation complete. Mina is shown as a sample collaborator; no invitation or access was created.'}</p>{state.collaborator !== 'simulated' && <div className="actions"><button className="secondary" onClick={() => open('collaborator')}>Preview collaborator simulation</button>{state.collaborator === 'pending' && <button className="text-button" onClick={() => write(skip(stateRef.current), 'Collaborator setup deferred, not completed. Your practice route is kept.')}>Skip for now</button>}</div>}</section><details><summary>What does this outcome tell me?</summary><p>It shows where one prepared inquiry went. It does not test your real inbox, team participation, other routing rules, or customer adoption. In a future evaluation, explain the destination and practice boundary in your own words.</p></details><div className="return-note"><strong>Come back when you’re ready.</strong><p>{persistence === 'saved' ? 'This browser keeps your confirmed progress. Returning shows this outcome and cannot route the same completed inquiry again.' : 'This temporary practice stays only while this tab is open.'}</p></div><button className="text-button" onClick={() => open('undo')}>Undo practice route</button></>}
          </>}
          <p className="announcement" role="status" aria-live="polite" aria-atomic="true">{notice}</p>
        </section>
        <aside className="workspace" aria-labelledby="workspace-title"><div className="workspace-top"><span className="northstar-mark" aria-hidden="true">✳</span><div><h2 id="workspace-title">Northstar workspace</h2><p>Fictional small-team sample</p></div><span className="pill">Practice</span></div><div className="workspace-inner"><div className="section-heading"><h3>{state.routed ? 'Customer care' : 'Intake'}</h3><span className="queue-state">{state.routed ? 'Routed sample' : 'Starting queue'}</span></div><div className={`sample-card ${state.routed ? 'routed' : ''}`}><div className="section-heading"><span className="ticket-id">{sample.id}</span><span className="dot-label">{state.routed ? 'In Customer care' : 'Waiting in Intake'}</span></div><h3>{sample.title}</h3><p>{sample.body}</p><div className="sender"><span aria-hidden="true">A</span><div>{sample.from}<small>Fictional requester</small></div></div></div><div className="workspace-status"><div><span>Template</span><strong>{state.setup ? 'Small team · applied' : 'Not applied'}</strong></div><div><span>Practice route</span><strong>{state.routed ? 'Completed' : 'Not completed'}</strong></div><div><span>Collaborator setup</span><strong>{state.collaborator === 'skipped' ? 'Deferred' : state.collaborator === 'simulated' ? 'Simulated only' : 'Not completed'}</strong></div></div>{state.collaborator === 'simulated' && <p className="simulated-person">Mina · customer care lead <small>Simulated collaborator</small></p>}<div className="workspace-boundary"><span aria-hidden="true">◇</span><p>This preview uses bundled sample data. No real workspace, messages, or integrations.</p></div></div><div className="workspace-footer"><span>Local practice only</span><button className="text-button" onClick={() => open('reset')}>Reset practice</button></div></aside>
      </div>
      <section className="principle"><span className="mini-label">The product decision</span><p>Ask for what helps you understand the first outcome.<br /><strong>Let the rest of setup wait.</strong></p><a href="docs/product/Case_Study.md">Read the product case →</a></section>
    </main>
    <footer><span>Original Northstar sample · Product direction: Mo Vahedi · AI-assisted implementation & verification</span><a href="docs/product/Sample_Walkthrough.md">Reviewer walkthrough</a></footer>
    {preview && <ConfirmDialog title={copy[preview.action].title} confirmLabel={copy[preview.action].confirm} onConfirm={commit} onCancel={cancel}><p>{copy[preview.action].description}</p>{(preview.action === 'route' || preview.action === 'template') && <div className="route-strip"><span>Intake</span><span aria-hidden="true">→</span><strong>Customer care</strong></div>}{preview.action === 'route' && <p className="helper">Reason: the bundled inquiry’s topic is workspace help.</p>}</ConfirmDialog>}
  </>
}
