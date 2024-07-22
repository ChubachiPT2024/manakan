import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { CourseRepository } from 'src/domain/models/courses/courseRepository'
import { ReportCourseData } from './reportCourseData'
import { ReportCourseGetResult } from './reportCourseGetResult'

/**
 * レポートコースアプリケーションサービス
 */
export class ReportCourseApplicationService {
  /**
   * コンストラクタ
   *
   * @param courseRepository コースリポジトリ
   * @param reportRepository レポートリポジトリ
   */
  public constructor(
    private readonly courseRepository: CourseRepository,
    private readonly reportRepository: ReportRepository
  ) {}

  /**
   * レポートとコースのデータを取得する
   *
   * @returns レポートとコースのデータ
   */
  public async getReportCourseAsync(): Promise<ReportCourseGetResult> {
    const reports = await this.reportRepository.findAllAsync()
    const courses = await this.courseRepository.findAllAsync()

    const reportCourseDataList: ReportCourseData[] = []
    for (const report of reports) {
      const course = courses.find((course) => course.id === report.courseId)
      reportCourseDataList.push(
        new ReportCourseData(course.id, course.name, report.id, report.title)
      )
    }

    return new ReportCourseGetResult(reportCourseDataList)
  }
}
