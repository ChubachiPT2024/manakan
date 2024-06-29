import { describe, expect, test } from 'vitest'
import { ReportListApplicationService } from './reportListApplicationService'
import { InMemoryCourseRepository } from 'src/infrastructure/inMemory/courses/inMemoryCourseRepository'
import { ReportListImportCommand } from './reportListImportCommand'
import path from 'path'
import { InMemoryReportRepository } from 'src/infrastructure/inMemory/reports/inMemoryReportRepository'

describe('import', () => {
  test('The course of the report is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const course = await courseRepository.findAsync(27048)
    expect(course.id).toBe(27048)
    expect(course.name).toBe('コミュニケーション技術特論2')
  })

  test('The report is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const report = await reportRepository.findAsync(35677)
    expect(report.courseId).toBe(27048)
    expect(report.id).toBe(35677)
    expect(report.title).toBe('個人レポート課題')
  })
})
