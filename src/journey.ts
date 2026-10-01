export const STORAGE_KEY = 'northstar.first-mile.v1'
export const sample = { id: 'NS-104', from: 'Avery at Cedar Works', title: 'A second workspace', body: 'Can you help me add a second workspace?', queue: 'Customer care', teammate: 'Mina' } as const
export type Goal = 'routing' | 'other' | null
export type Collaborator = 'pending' | 'skipped' | 'simulated'
export interface Journey { version: 1; revision: number; goal: Goal; setup: boolean; routed: boolean; collaborator: Collaborator }
export type Action = 'template' | 'route' | 'collaborator' | 'undo' | 'reset'
export interface Preview { action: Action; revision: number }
export const initial = (): Journey => ({ version: 1, revision: 0, goal: null, setup: false, routed: false, collaborator: 'pending' })
export const can = (state: Journey, action: Action): boolean => {
  switch (action) {
    case 'template': return state.goal === 'routing' && !state.setup
    case 'route': return state.setup && !state.routed
    case 'collaborator': return state.routed && state.collaborator !== 'simulated'
    case 'undo': return state.routed
    case 'reset': return true
  }
}
export function chooseGoal(state: Journey, goal: Exclude<Goal, null>): Journey {
  if (state.setup || state.goal === goal) return state
  return { ...state, goal, revision: state.revision + 1 }
}
export function confirm(state: Journey, preview: Preview): Journey {
  if (preview.revision !== state.revision || !can(state, preview.action)) return state
  const next = { ...state, revision: state.revision + 1 }
  switch (preview.action) {
    case 'template': return { ...next, setup: true }
    case 'route': return { ...next, routed: true }
    case 'collaborator': return { ...next, collaborator: 'simulated' }
    case 'undo': return { ...next, routed: false, collaborator: 'pending' }
    case 'reset': return { ...initial(), revision: next.revision }
  }
}
export function skip(state: Journey): Journey {
  return state.routed && state.collaborator === 'pending' ? { ...state, collaborator: 'skipped', revision: state.revision + 1 } : state
}
export function parse(raw: string | null): Journey | null {
  if (raw === null) return initial()
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null
    const s = value as Record<string, unknown>
    if (Object.keys(s).sort().join(',') !== 'collaborator,goal,revision,routed,setup,version') return null
    if (s.version !== 1 || !Number.isSafeInteger(s.revision) || (s.revision as number) < 0 || (s.revision as number) >= Number.MAX_SAFE_INTEGER) return null
    if (![null, 'routing', 'other'].includes(s.goal as Goal) || typeof s.setup !== 'boolean' || typeof s.routed !== 'boolean' || !['pending', 'skipped', 'simulated'].includes(s.collaborator as string)) return null
    if ((s.setup && s.goal !== 'routing') || (s.routed && !s.setup) || (!s.routed && s.collaborator !== 'pending')) return null
    return s as unknown as Journey
  } catch { return null }
}
export type Persistence = 'saved' | 'temporary' | 'invalid'
export interface Loaded { state: Journey; persistence: Persistence; returned: boolean }
export function load(storage: Pick<Storage, 'getItem'>): Loaded {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    const state = parse(raw)
    return { state: state ?? initial(), persistence: state ? 'saved' : 'invalid', returned: raw !== null && state !== null }
  } catch { return { state: initial(), persistence: 'temporary', returned: false } }
}
export function save(storage: Pick<Storage, 'setItem'>, state: Journey): boolean {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true } catch { return false }
}
