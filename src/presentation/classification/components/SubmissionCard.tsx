import { useDraggable } from '@dnd-kit/core'
import { FaRegFolder } from 'react-icons/fa'

interface SubmissionCardProps {
  id: number
  submission: Submission
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export function SubmissionCard({
  id,
  submission,
  onChange,
}: SubmissionCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {}

  return (
    <div
      ref={setNodeRef}
      className="h-14 w-[200px] rounded-lg mt-2 bg-white shadow-2xl"
      {...attributes}
      {...listeners}
    >
      <div className="flex pl-2">
        <div className="flex mt-3">
          {/* BUG:https://github.com/clauderic/dnd-kit/issues/591 */}
          <input
            type="checkbox"
            onChange={onChange}
            checked={submission.isChecked}
          />
          <FaRegFolder className="ml-3 mt-1 w-6 h-6" />
          <div className="ml-2 pl-2">
            <p className="text-xs">学修番号：{submission.id}</p>
            <p className="text-xs">{submission.studentName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
