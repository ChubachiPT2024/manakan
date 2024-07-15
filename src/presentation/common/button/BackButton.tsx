import { useNavigate } from 'react-router-dom'
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md'

interface IPropsButton {
  href: string
}

// 戻るボタンを抽象化したコンポーネント
export const BackButton: React.FC<IPropsButton> = ({ href }) => {
  const navigate = useNavigate()

  // 戻るボタンが押された時の処理
  const handleBack = (href: string) => {
    navigate(href)
  }

  return (
    <>
      <MdKeyboardDoubleArrowLeft
        className="w-12 h-12 cursor-pointer transition duration-200 ease-in-out hover:scale-150"
        color={'#a9a9a9'}
        onClick={() => handleBack(href)}
      />
    </>
  )
}
