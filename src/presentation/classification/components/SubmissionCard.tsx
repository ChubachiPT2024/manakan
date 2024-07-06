import { useDraggable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface SubmissionCardProps {
  id: string
  children: ReactNode
  status: string
}

export function SubmissionCard({ id, children, status }: SubmissionCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { status },
  })

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {}

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        padding: '8px',
        margin: '8px 0',
        backgroundColor: 'white',
        borderRadius: '4px',
        cursor: 'move',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}
