import { MouseEventHandler } from 'react'

interface SelectedButtonProps {
  title: string
  isDisabled: boolean
  styles: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function SelectedButton({
  title,
  isDisabled,
  styles,
  onClick,
}: SelectedButtonProps) {
  return (
    <button
      className={`text-sm text-white mr-2 w-24 h-9 rounded-lg ${styles} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : undefined
      }`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
