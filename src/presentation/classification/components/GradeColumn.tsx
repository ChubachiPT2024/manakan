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
  return (
    <div className="min-w-100 mr-2   bg-white rounded-md p-2">
      <div className="flex justify-between border-b border-b-gray-200 mb-2">
        <h2 className="text-3xl">{title}</h2>
        <p className="text-xs self-end mb-1">合計:{submissionNum}</p>
      </div>
      <div className="h-auto overflow-y-scroll">{children}</div>
    </div>
  )
}
