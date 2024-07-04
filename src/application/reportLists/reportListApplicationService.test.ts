import { describe, expect, test } from 'vitest'
import { ReportListApplicationService } from './reportListApplicationService'
import { InMemoryCourseRepository } from 'src/infrastructure/inMemory/courses/inMemoryCourseRepository'
import { ReportListImportCommand } from './reportListImportCommand'
import path from 'path'
import { InMemoryReportRepository } from 'src/infrastructure/inMemory/reports/inMemoryReportRepository'
import { InMemoryStudentRepository } from 'src/infrastructure/inMemory/students/inMemoryStudentRepository'
import { InMemorySubmissionRepository } from 'src/infrastructure/inMemory/submissions/inMemorySubmissionRepository'

describe('import', () => {
  test('The course of the report is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository
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
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository
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

  test('The first student is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const student = await studentRepository.findAsync(23745148)
    expect(student.userId).toBe('a2348mt')
    expect(student.numId).toBe(23745148)
    expect(student.name).toBe('田中　真')
  })

  test('The last student is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const student = await studentRepository.findAsync(23745197)
    expect(student.userId).toBe('a2397ka')
    expect(student.numId).toBe(23745197)
    expect(student.name).toBe('安藤　健')
  })

  test('The first submission is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const submission = await submissionRepository.findAsync(35677)
    expect(submission[0].reportId).toBe(35677)
    expect(submission[0].studentNumId).toBe(23745148)
    expect(submission[0].folderRelativePath).toBe('23745148@a2348mt')
  })
})
