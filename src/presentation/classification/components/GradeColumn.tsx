import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface GradeColumnProps {
  id: number
  title: string
  children: ReactNode
  submissionNum: number
}

export function GradeColumn({
  id,
  title,
  children,
  submissionNum,
}: GradeColumnProps) {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className="min-w-100 mr-2 h-screen flex flex-col  bg-white rounded-md p-2"
    >
      <div className="flex justify-between border-b-2 border-b-gray-200 mb-2">
        <h2 className="text-lg mb-2">{title}</h2>
        <p className="text-sm">合計数:{submissionNum}</p>
      </div>
      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  )
}
