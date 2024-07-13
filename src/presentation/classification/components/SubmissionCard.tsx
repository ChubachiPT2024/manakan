import { useDraggable } from '@dnd-kit/core'
import { FaRegFolder } from 'react-icons/fa'
import { Item } from 'src/presentation/types/report'

interface SubmissionCardProps {
  id: number
  item: Item
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export function SubmissionCard({ id, item, onChange }: SubmissionCardProps) {
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
      className="h-14 w-[200px] rounded-lg my-2 bg-white shadow-2xl mouse-pointer"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex mt-3 pl-2 pt-2">
        <input type="checkbox" onChange={onChange} checked={item.isChecked} />
        <FaRegFolder className="ml-3 mt-1 w-6 h-6" />
        <div className="ml-2 pl-2">
          <p className="text-xs">学修番号：{item.student.numId}</p>
          <p className="text-xs">{item.student.name}</p>
        </div>
      </div>
    </div>
  )
}
