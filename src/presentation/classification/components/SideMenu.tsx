import { ReactNode, useEffect, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { PiFlowerDuotone } from 'react-icons/pi'
import { ExportButton } from './ReportListExport'

interface SideMenuProps {
  children: ReactNode
  enabled: boolean
  reportId: string
}

export function SideMenu({ children, enabled, reportId }: SideMenuProps) {
  const { setNodeRef } = useDroppable({ id: 'has-not-grade' })

  return (
    <div className="bg-white h-screen w-56 flex flex-col shadow-md">
      <header className="pt-3 pl-3 pb-7 flex">
        <PiFlowerDuotone color="pink" size={35} />
        <h1 className="text-3xl font-semibold ml-1">manakan</h1>
      </header>
      <h2 className="text-xl mb-1">未分類</h2>
      <div
        id="has-not-grade"
        className="overflow-y-auto pt-3 flex-grow"
        style={{ scrollbarWidth: 'none' }}
        ref={setNodeRef}
      >
        {children}
      </div>
      <div className="p-3">
        <ExportButton reportId={reportId} enabled={enabled} />
      </div>
    </div>
  )
}
