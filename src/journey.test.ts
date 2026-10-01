import { describe, expect, it } from 'vitest'
import { can, chooseGoal, confirm, initial, load, parse, save, skip, STORAGE_KEY, type Action, type Journey } from './journey'
const act = (s: Journey, action: Action) => confirm(s, { action, revision: s.revision })
const ready = () => act(chooseGoal(initial(), 'routing'), 'template')
const routed = () => act(ready(), 'route')
describe('deliberate practice journey', () => {
  it('requires a supported goal and confirmed template before routing', () => {
    expect(can(initial(), 'route')).toBe(false)
    expect(act(chooseGoal(initial(), 'other'), 'template').setup).toBe(false)
    expect(act(ready(), 'route').routed).toBe(true)
  })
  it('preview is a snapshot and cannot mutate the source state', () => {
    const s = chooseGoal(initial(), 'routing'); const p = { action: 'template' as const, revision: s.revision }
    expect(s.setup).toBe(false); expect(confirm(s, p).setup).toBe(true); expect(s.setup).toBe(false)
  })
  it('rejects stale confirmations after a goal change', () => {
    const s = chooseGoal(initial(), 'routing'); const p = { action: 'template' as const, revision: s.revision }
    const changed = chooseGoal(chooseGoal(s, 'other'), 'routing')
    expect(confirm(changed, p)).toBe(changed)
  })
  it('repeated route confirmations never create a second action', () => {
    const s = ready(); const p = { action: 'route' as const, revision: s.revision }; const done = confirm(s, p)
    expect(confirm(done, p)).toBe(done); expect(act(done, 'route')).toBe(done)
  })
  it('skip is distinct from simulation and can be completed later', () => {
    const s = skip(routed()); expect(s.collaborator).toBe('skipped')
    expect(act(s, 'collaborator').collaborator).toBe('simulated')
    expect(skip(act(s, 'collaborator')).collaborator).toBe('simulated')
  })
  it('optional setup cannot be done before the useful outcome', () => {
    expect(skip(ready())).toEqual(ready()); expect(act(ready(), 'collaborator')).toEqual(ready())
  })
  it('undo removes dependent optional state but keeps template', () => {
    const s = act(act(routed(), 'collaborator'), 'undo')
    expect(s).toMatchObject({ setup: true, routed: false, collaborator: 'pending' })
    expect(act(s, 'route').routed).toBe(true)
  })
  it('reset clears progress and advances revision to invalidate previews', () => {
    const s = routed(); const reset = act(s, 'reset')
    expect(reset).toEqual({ ...initial(), revision: s.revision + 1 }); expect(confirm(reset, { action: 'undo', revision: s.revision })).toBe(reset)
  })
  it('does not allow changing a goal after applying setup', () => { const s = ready(); expect(chooseGoal(s, 'other')).toBe(s) })
})
describe('compatible local persistence', () => {
  it.each([initial(), ready(), routed(), skip(routed()), act(routed(), 'collaborator')])('restores valid progress %#', s => expect(parse(JSON.stringify(s))).toEqual(s))
  it.each(['bad', '{}', 'null', '[]', JSON.stringify({ ...routed(), version: 2 }), JSON.stringify({ ...initial(), routed: true }), JSON.stringify({ ...initial(), collaborator: 'simulated' }), JSON.stringify({ ...routed(), goal: 'other' }), JSON.stringify({ ...initial(), revision: -1 }), JSON.stringify({ ...initial(), revision: 1.1 }), JSON.stringify({ ...initial(), surprise: true })])('rejects incompatible sample %s', raw => expect(parse(raw)).toBe(null))
  it('keeps invalid stored data intact on load', () => { const raw = 'bad'; const s = load({ getItem: () => raw }); expect(s.persistence).toBe('invalid'); expect(raw).toBe('bad') })
  it('labels unavailable reads temporary', () => expect(load({ getItem: () => { throw Error('blocked') } }).persistence).toBe('temporary'))
  it('reports unavailable writes without pretending they saved', () => expect(save({ setItem: () => { throw Error('quota') } }, routed())).toBe(false))
  it('writes the versioned key and exact confirmed state', () => { let key = ''; let value = ''; const s = routed(); expect(save({ setItem: (k, v) => { key = k; value = v } }, s)).toBe(true); expect(key).toBe(STORAGE_KEY); expect(parse(value)).toEqual(s) })
})
