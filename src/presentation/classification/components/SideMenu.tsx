import { useState } from 'react'
import { SubmissionCard } from './SubmissionCard'

interface SideMenuProps {
  submissions: Submission[]
}

export function SideMenu({ submissions }: SideMenuProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(
    submissions.length === 0
  )
  return (
    <div className="h-screen w-56 flex flex-col">
      <header className="pt-3 pl-3 pb-7 flex">
        <div className="h-8 w-8 bg-pink-500 "></div>
        <h1 className="text-3xl font-semibold">Manakan</h1>
      </header>
      <div className="overflow-y-auto pl-1.5 pt-3 flex-grow">
        <h2 className="text-xl">未分類</h2>
        {submissions.map((submission) => {
          return (
            <SubmissionCard
              key={submission.id}
              id={submission.id}
              submission={submission}
            />
          )
        })}
      </div>
      <div className="p-3">
        <button
          type="button"
          className={`text-white bg-black hover:bg-black-800 font-medium rounded-lg text-sm w-full py-2.5 ${
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
