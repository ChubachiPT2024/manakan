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
      className="flex bg-gray-100 mb-2 min-h-[72px] w-[230px] overflow-y-auto "
    >
      <div className="flex items-center justify-center text-sm  w-8">
        {title}
      </div>
      <div className="">{children}</div>
    </div>
  )
}
