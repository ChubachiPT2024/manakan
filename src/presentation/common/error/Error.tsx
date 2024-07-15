import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="flex justify-center items-center h-screen"
        aria-label="読み込み中"
      >
        <div className="text-center">
          <h1 className="text-2xl mb-5">エラーが発生しました</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/')}
          >
            ホームへ戻る
          </button>
        </div>
      </div>
    </>
  )
}

export default Error
