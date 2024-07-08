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
      className="flex bg-gray-100 mb-1.5 min-h-[72px] w-[230px] overflow-y-auto rounded-md"
    >
      <div className="flex items-center justify-center text-sm px-1.5">
        {title}
      </div>
      {children}
    </div>
  )
}
