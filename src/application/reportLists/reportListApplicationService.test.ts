import { describe, expect, test } from 'vitest'
import { ReportListApplicationService } from './reportListApplicationService'
import { InMemoryCourseRepository } from 'src/infrastructure/inMemory/courses/inMemoryCourseRepository'
import { ReportListImportCommand } from './reportListImportCommand'
import path from 'path'
import { InMemoryReportRepository } from 'src/infrastructure/inMemory/reports/inMemoryReportRepository'
import { InMemoryStudentRepository } from 'src/infrastructure/inMemory/students/inMemoryStudentRepository'
import { InMemorySubmissionRepository } from 'src/infrastructure/inMemory/submissions/inMemorySubmissionRepository'
import { InMemoryAssessmentRepository } from 'src/infrastructure/inMemory/assessments/inMemoryAssessmentRepository'
import { Course } from 'src/domain/models/courses/course'
import { Report } from 'src/domain/models/reports/report'
import { ReportListGetCommand } from './reportListGetCommand'
import { Student } from 'src/domain/models/students/student'
import { Submission } from 'src/domain/models/submissions/submission'
import { Assessment } from 'src/domain/models/assessments/assessment'
import { ReportListExportCommand } from './reportListExportCommand'
import * as Excel from 'exceljs'

describe('import', () => {
  test('The course of the report is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
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
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const report = await reportRepository.findAsync(35677)
    expect(report.courseId).toBe(27048)
    expect(report.id).toBe(35677)
    expect(report.title).toBe('個人レポート課題')
    expect(report.reportListFolderAbsolutePath).toBe(
      path.join(__dirname, 'reportListImportTestFiles')
    )
  })

  test('The first student is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
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
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
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
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const submissions = await submissionRepository.findByReportIdAsync(35677)
    const submission = submissions.find((x) => x.studentNumId === 23745148)
    expect(submission.reportId).toBe(35677)
    expect(submission.studentNumId).toBe(23745148)
    expect(submission.isSubmitted).toBe(true)
    expect(submission.submissionDateTime).toBe('2019-02-14 23:18:43')
    expect(submission.submissionCount).toBe(1)
    expect(submission.folderRelativePath).toBe('23745148@a2348mt')
  })

  test('The unsubmitted submission is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'unsubmitted.xlsx')
    )

    await service.importAsync(command)

    const submissions = await submissionRepository.findByReportIdAsync(35677)
    const submission = submissions.find((x) => x.studentNumId === 23745148)
    expect(submission.reportId).toBe(35677)
    expect(submission.studentNumId).toBe(23745148)
    expect(submission.isSubmitted).toBe(false)
    expect(submission.submissionDateTime).toBeUndefined()
    expect(submission.submissionCount).toBeUndefined()
    expect(submission.folderRelativePath).toBeUndefined()
  })

  test('The first assessment is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
    )
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const assessments = await assessmentRepository.findByReportIdAsync(35677)
    const assessment = assessments.find((x) => x.studentNumId === 23745148)

    expect(assessment.reportId).toBe(35677)
    expect(assessment.studentNumId).toBe(23745148)
    expect(assessment.feedback).toBeUndefined()
    expect(assessment.memo).toBeUndefined()
    expect(assessment.grade).toBeUndefined()
    expect(assessment.rank).toBeUndefined()
    expect(assessment.getScore()).toBeUndefined()
  })
})

describe('get', () => {
  test('Can get report list.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
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
    const student = new Student('a2348mt', 23745148, '田中　真')
    await studentRepository.saveAsync(student)
    const submission = new Submission(
      report.id,
      student.numId,
      true,
      '2019-02-14 23:18:43',
      1,
      '23745148@a2348mt'
    )
    await submissionRepository.saveAsync(submission)
    const assessment = new Assessment(report.id, student.numId)
    await assessmentRepository.saveAsync(assessment)

    const getResult = await service.getAsync(new ReportListGetCommand(35677))

    const data = getResult.reportListData
    expect(data.courseId).toBe(27048)
    expect(data.courseName).toBe('コミュニケーション技術特論2')
    expect(data.reportId).toBe(35677)
    expect(data.reportTitle).toBe('個人レポート課題')
    expect(data.items.length).toBe(1)
    const item = data.items.find((x) => x.student.numId === 23745148)
    expect(item.student.userId).toBe('a2348mt')
    expect(item.student.numId).toBe(23745148)
    expect(item.student.name).toBe('田中　真')
    expect(item.submission.isSubmitted).toBe(true)
    expect(item.submission.folderRelativePath).toBe('23745148@a2348mt')
    expect(item.assessment.feedback).toBeUndefined()
    expect(item.assessment.memo).toBeUndefined()
    expect(item.assessment.grade).toBeUndefined()
    expect(item.assessment.rank).toBeUndefined()
    expect(item.assessment.score).toBeUndefined()
  })
})

describe('export', () => {
  test('The assessment is exported.', async () => {
    // Arrange
    const courseRepository = new InMemoryCourseRepository()
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new ReportListApplicationService(
      courseRepository,
      reportRepository,
      studentRepository,
      submissionRepository,
      assessmentRepository
    )
    const importCommand = new ReportListImportCommand(
      path.join(__dirname, 'reportListExportTestFiles', 'reportlist.xlsx')
    )
    const reportId = await service.importAsync(importCommand)

    const assessment = await assessmentRepository.findAsync(reportId, 23745148)
    const updatedAssessment = assessment
      .classify(5, '+-')
      .updateFeedback('feedback')
    await assessmentRepository.saveAsync(updatedAssessment)

    // Act
    const exportResult = await service.exportAsync(
      new ReportListExportCommand(reportId)
    )

    // Assert
    const workbook = new Excel.Workbook()
    await workbook.xlsx.load(exportResult.content)

    // id によるアクセスは非推奨らしいので、名前でアクセス
    // https://github.com/exceljs/exceljs?tab=readme-ov-file#access-worksheets
    const worksheet = workbook.getWorksheet('Sheet1')
    if (!worksheet) {
      throw new Error('The Worksheet Sheet1 is not found.')
    }

    // 最初の履修生の行を取得
    const row = worksheet.getRow(8)
    expect(row.getCell('G').value).toBe(updatedAssessment.getScore())
    expect(row.getCell('H').value).toBe(updatedAssessment.grade)
    expect(row.getCell('I').value).toBe(updatedAssessment.feedback)
  })
})
