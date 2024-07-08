import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface RankRowProps {
  id: string
  title: string
  children: ReactNode
}

export function RankRow({ id, title, children }: RankRowProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: '8px',
        margin: '8px 0',
        borderRadius: '4px',
        cursor: 'move',
        minHeight: '30px',
        background: 'grey',
      }}
    >
      <div>{title}</div>
      {children}
    </div>
  )
}
