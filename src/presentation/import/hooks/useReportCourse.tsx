import { ReportCourseGetResult } from 'src/application/reportCourse/reportCourseGetResult'
import useSWR from 'swr'

async function getReportCourse(): Promise<ReportCourseGetResult> {
  return window.electronAPI.getReportCourseAsync()
}

export const useReportCourse = () => {
  const { data, error, isLoading } = useSWR<ReportCourseGetResult>(
    'ReportCourse',
    () => getReportCourse(),
    { suspense: true }
  )

  return {
    data,
    error,
    isLoading,
  }
}
