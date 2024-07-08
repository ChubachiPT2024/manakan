import { useDroppable } from '@dnd-kit/core'
import { ReactNode, MouseEventHandler } from 'react'

interface SelectedButtonProps {
  styles: string
  title: string
  isDisabled: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function SelectedButton({
  styles,
  title,
  isDisabled,
  onClick,
}: SelectedButtonProps) {
  return (
    <button
      className={`text-sm text-white mr-4 w-24 h-9 rounded-lg ${styles} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : undefined
      }`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
