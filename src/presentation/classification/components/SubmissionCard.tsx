import { useDraggable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface SubmissionCardProps {
  id: number
  submission: Submission
}

export function SubmissionCard({ id, submission }: SubmissionCardProps) {
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
      className="h-14 w-52 border rounded-lg mt-2 bg-white"
      style={{
        ...style,
        backgroundColor: 'white',
        borderRadius: '4px',
        cursor: 'move',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
      {...listeners}
      {...attributes}
    >
      <div className="flex pl-2">
        <div className="flex mt-3">
          <input type="checkbox" className="" />
          <div className="ml-2 pl-2">
            <p className="text-xs">学修番号：{submission.id}</p>
            <p className="text-xs">{submission.studentName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
