import { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'

interface SideMenuProps {
  children: ReactNode
  isDisabled: boolean
}

export function SideMenu({ children, isDisabled }: SideMenuProps) {
  const { setNodeRef } = useDroppable({ id: 'has-not-grade' })

  return (
    <div className="bg-white w-60 flex flex-col shadow-md">
      <header className="pt-3 pl-3 pb-7 flex">
        <div className="h-7 w-7 bg-pink-500 rounded-2xl"></div>
        <h1 className="text-3xl font-semibold ml-1">Manakan</h1>
      </header>
      <h2 className="text-xl mb-1 ml-3">未分類</h2>
      <div
        id="has-not-grade"
        className="overflow-y-auto ml-3 pt-3 flex-grow"
        ref={setNodeRef}
      >
        {children}
      </div>
      <div className="p-3">
        <button
          type="button"
          className={`text-white bg-black hover:bg-black-800 font-medium rounded-md text-md w-full py-2.5 ${
            isDisabled ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={isDisabled}
        >
          エクスポートする
        </button>
      </div>
    </div>
  )
}
