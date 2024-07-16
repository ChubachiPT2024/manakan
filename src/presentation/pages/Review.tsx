import { useLocation } from 'react-router-dom'
import PdfView from '../review/components/PdfView'
import Sidebar from '../review/components/Sidebar'
import { useSubmissionSummaries } from '../review/hooks/useSubmissionSummaries'
import { BackButton } from '../common/button/BackButton'
import Loading from '../common/isLoading/Loading'
import Error from '../common/error/Error'

// ルーティング時に渡される情報の型
type LocationState = {
  reportId: string
  studentNumIds: number[]
}

const Review = () => {
  // ルーティング時に渡された情報を取得
  const location = useLocation()
  const { reportId, studentNumIds } = location.state as LocationState

  // 提出物サマリーを取得
  const { submissionSummaries, error, isLoading } = useSubmissionSummaries(
    reportId,
    studentNumIds
  )

  if (isLoading) return <Loading />
  if (error) return <Error />

  return (
    <>
      <div className="h-full overflow-hidden">
        {/* navbar */}
        <div className="z-50 bg-white fixed top-0 flex items-center w-full p-2 border-b shadow-sm">
          {/* 戻るボタン */}
          <BackButton href={`/classification/${reportId}`} />
        </div>

        {/* メインコンテンツ */}
        <div className='flex mt-14' style={{ height: 'calc(100vh - 4rem)' }}>

          {/* PDF表示 */}
          <div className="w-10/12 pl-8 pt-5 overflow-x-auto whitespace-nowrap flex overflow-y-hidden">
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生1</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 4rem)' }}>
                <div
                  className='mb-5 bg-red-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 1-1
                </div>
                <div
                  className='mb-5 bg-red-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 1-2
                </div>
                <div
                  className='bg-red-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 1-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生2</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-blue-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 2-1
                </div>
                <div
                  className='mb-5 bg-blue-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 2-2
                </div>
                <div
                  className='bg-blue-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 2-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生3</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-green-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 3-1
                </div>
                <div
                  className='mb-5 bg-green-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 3-2
                </div>
                <div
                  className='bg-green-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 3-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生4</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-pink-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 4-1
                </div>
                <div
                  className='mb-5 bg-pink-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 4-2
                </div>
                <div
                  className='bg-pink-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 4-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生5</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-purple-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 5-1
                </div>
                <div
                  className='mb-5 bg-purple-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 5-2
                </div>
                <div
                  className='bg-purple-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 5-3
                </div>
              </div>
            </div>
          </div>

          <Sidebar
            reportId={reportId}
            submissionSummaries={submissionSummaries}
          />
        </div>
      </div>
    </>
  )
};

export default Review;
