import { ReactNode, useEffect, useState } from 'react'
import { SubmissionCard } from './SubmissionCard'
import { useDroppable } from '@dnd-kit/core'
import { ExportButton } from './ReportListExport'

interface SideMenuProps {
  children: ReactNode
  isDisabled: boolean
  reportId: number
}

export function SideMenu({ children, isDisabled, reportId }: SideMenuProps) {
  const { setNodeRef } = useDroppable({ id: 'has-not-grade' })

  return (
    <div className="bg-white h-screen w-56 flex flex-col shadow-md">
      <header className="pt-3 pl-3 pb-7 flex">
        <div className="h-7 w-7 bg-pink-500 rounded-2xl"></div>
        <h1 className="text-3xl font-semibold ml-1">Manakan</h1>
      </header>
      <div
        id="has-not-grade"
        className="overflow-y-auto ml-3 pt-3 flex-grow"
        ref={setNodeRef}
      >
        <h2 className="text-xl mb-4">未分類</h2>
        {children}
      </div>
      <div className="p-3">
        {/* TODO：もともとの書式に合わせる */}
        <ExportButton reportId={reportId} isDisabled={isDisabled} />
      </div>
    </div>
  )
}
