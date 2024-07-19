import { describe, expect, test } from 'vitest'
import { InMemoryCourseRepository } from 'src/infrastructure/inMemory/courses/inMemoryCourseRepository'
import { InMemoryReportRepository } from 'src/infrastructure/inMemory/reports/inMemoryReportRepository'
import { ReportCourseApplicationService } from './reportCourseApplicationService'
import { Course } from 'src/domain/models/courses/course'
import { Report } from 'src/domain/models/reports/report'

describe('get', () => {
  test('Can get report course', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const service = new ReportCourseApplicationService(
      courseRepository,
      reportRepository
    )
    const course = new Course(27048, 'コミュニケーション技術特論2')
    await courseRepository.saveAsync(course)
    const report = new Report(
      course.id,
      35677,
      '個人レポート課題',
      'folderAbsolutePath'
    )
    await reportRepository.saveAsync(report)

    const getResult = await service.getReportCourseAsync()

    const data = getResult.reportCourseDataList
    expect(data.length).toBe(1)
    expect(data[0].courseId).toBe(27048)
    expect(data[0].courseName).toBe('コミュニケーション技術特論2')
    expect(data[0].reportId).toBe(35677)
    expect(data[0].reportTitle).toBe('個人レポート課題')
  })
})
