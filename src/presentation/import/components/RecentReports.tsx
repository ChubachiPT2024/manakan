import { Link } from 'react-router-dom'
import { useReportCourse } from '../hooks/useReportCourse'
import Loading from '../../common/isLoading/Spinner'
import Error from '../../common/error/Error'
import { ReportCourseData } from 'src/application/reportCourse/reportCourseData'
import HomeSkeleton from 'src/presentation/common/isLoading/HomeSkeleton'

const RecentReports = () => {
  // レポートとコースの情報を取得
  const { data, error, isLoading } = useReportCourse()

  if (error) return <></>
  if (isLoading) return <HomeSkeleton />

  return (
    <>
      <ul>
        {data.reportCourseDataList.map((reportCourseData: ReportCourseData) => (
          <li
            key={reportCourseData.reportId}
            className="py-5 flex justify-between items-center w-full"
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
    </>
  )
}

export default RecentReports
