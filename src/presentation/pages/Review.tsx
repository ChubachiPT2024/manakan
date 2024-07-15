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
        <div className="flex mt-14" style={{ height: 'calc(100vh - 4rem)' }}>
          {/* PDF表示 */}
          <div className="w-10/12 pl-8 pt-5 overflow-x-auto whitespace-nowrap flex overflow-y-hidden">
            {submissionSummaries.map((summary, index) => (
              <PdfView
                key={index}
                reportId={Number(reportId)}
                student={summary.student}
                files={summary.files}
                height="calc(100vh - 4rem)"
                width={900}
                pageHeight={1000}
              />
            ))}
          </div>

          <Sidebar
            reportId={reportId}
            submissionSummaries={submissionSummaries}
          />
        </div>
      </div>
    </>
  )
}

export default Review
