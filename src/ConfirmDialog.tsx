import { useEffect, useRef, type ReactNode } from 'react'
export function ConfirmDialog({ title, children, confirmLabel, onConfirm, onCancel }: { title: string; children: ReactNode; confirmLabel: string; onConfirm: () => void; onCancel: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => { dialog?.close() } }, [])
  return <dialog ref={ref} aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); onCancel() }}>
    <p className="eyebrow">Review before confirming</p><h2 id="dialog-title">{title}</h2>{children}
    <div className="actions"><button autoFocus className="secondary" onClick={onCancel}>Cancel</button><button onClick={onConfirm}>{confirmLabel}</button></div>
  </dialog>
}
