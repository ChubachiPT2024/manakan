import { ReactNode } from 'react'

interface GradeColumnProps {
  title: string
  children: ReactNode
  submissionNum: number
}

export function GradeColumn({
  title,
  children,
  submissionNum,
}: GradeColumnProps) {
  return (
    <div className="flex flex-col min-w-[270px] h-full bg-white rounded-md mr-2 p-2">
      <div className="flex justify-between border-b border-b-gray-200 mb-2">
        <h2 className="text-3xl">{title}</h2>
        <p className="text-xs self-end mb-1">合計:{submissionNum}</p>
      </div>
      <div className="grow min-w-[260px] overflow-y-scroll">{children}</div>
    </div>
  )
}
