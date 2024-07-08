import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface GradeColumnProps {
  id: number
  title: string
  children: ReactNode
}

export function GradeColumn({ id, title, children }: GradeColumnProps) {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{
        width: '30%',
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>{title}</h2>
      <div
        style={{
          minHeight: '100px',
          marginTop: '8px',
          backgroundColor: '#fff',
          borderRadius: '4px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
