import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface RankRowProps {
  id: string
  title: string
  status: string
  children: ReactNode
}

export function RankRow({ id, status, children }: RankRowProps) {
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
        backgroundColor: status === 'notStarted' ? 'white' : 'lightgrey',
      }}
    >
      {children}
    </div>
  )
}
