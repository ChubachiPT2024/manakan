import { Link } from 'react-router-dom'
import { useReportCourse } from '../hooks/useReportCourse'
import Loading from '../../common/isLoading/Loading'
import { ReportCourseData } from 'src/application/reportCourse/reportCourseData'
import { Suspense } from 'react'

const RecentReports = () => {
  // レポートとコースの情報を取得
  const { data, error } = useReportCourse()

  if (error) console.log(error)
  return (
    <>
      <div className="w-screen max-w-lg rounded-lg p-4 pt-8">
        <h3 className="text-lg font-semibold mb-1">最近使用したデータ</h3>
        <Suspense fallback={<Loading />}>
          <ul>
            {/* より最近にインポートされたのものが上に来るようにしています */}
            {data.reportCourseDataList
              .slice()
              .reverse()
              .map((reportCourseData: ReportCourseData) => (
                <li
                  key={reportCourseData.reportId}
                  className="py-2 flex justify-between items-center w-full"
                >
                  <Link
                    to={`/classification/${reportCourseData.reportId}`}
                    className="flex justify-between text-black hover:text-blue-600 bg-white hover:bg-gray-100 rounded-lg p-4 transition-colors duration-300 w-full border border-gray-500"
                  >
                    <div className="flex flex-col">
                      <p>{reportCourseData.courseName}</p>
                      <p>{reportCourseData.reportTitle}</p>
                    </div>
                    {/* ToDo: 最終編集日の取得 */}
                    {/* <span className="text-gray-500 text-sm block">2024-06-30</span> */}
                  </Link>
                </li>
              ))}
          </ul>
        </Suspense>
      </div>
    </>
  )
}

export default RecentReports
