import { InMemoryAssessmentRepository } from 'src/infrastructure/inMemory/assessments/inMemoryAssessmentRepository'
import { InMemoryReportRepository } from 'src/infrastructure/inMemory/reports/inMemoryReportRepository'
import { InMemoryStudentRepository } from 'src/infrastructure/inMemory/students/inMemoryStudentRepository'
import { InMemorySubmissionRepository } from 'src/infrastructure/inMemory/submissions/inMemorySubmissionRepository'
import { describe, expect, test } from 'vitest'
import { SubmissionSummaryApplicationService } from './submissionSummaryApplicationService'
import { Report } from 'src/domain/models/reports/report'
import path from 'node:path'
import { Student } from 'src/domain/models/students/student'
import { Submission } from 'src/domain/models/submissions/submission'
import { Assessment } from 'src/domain/models/assessments/assessment'
import { SubmissionSummariesGetCommand } from './submissionSummariesGetCommand'

describe('get submission summaries', () => {
  test('Can get submission summaries.', async () => {
    // Arrange
    const reportRepository = new InMemoryReportRepository()
    const studentRepository = new InMemoryStudentRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const assessmentRepository = new InMemoryAssessmentRepository()
    const service = new SubmissionSummaryApplicationService(
      reportRepository,
      submissionRepository,
      studentRepository,
      assessmentRepository
    )
    const report = new Report(
      0,
      0,
      'report title',
      path.join(__dirname, 'submissionSummaryApplicationServiceTestData')
    )
    await reportRepository.saveAsync(report)
    const students = [
      new Student('a2348mt', 23745148, '田中　真'),
      new Student('a2350mh', 23745150, '本田　真'),
    ]
    const submissions = [
      new Submission(report.id, 23745148, '23745148@a2348mt'),
      new Submission(report.id, 23745150, '23745150@a2350mh'),
    ]
    for (let i = 0; i < 2; i++) {
      await studentRepository.saveAsync(students[i])
      await submissionRepository.saveAsync(submissions[i])
      await assessmentRepository.saveAsync(
        new Assessment(report.id, students[i].numId)
      )
    }

    // Act
    const getResult = await service.getSubmissionSummariesAsync(
      new SubmissionSummariesGetCommand(report.id, [23745148, 23745150])
    )

    // Assert
    expect(getResult.reportId).toBe(report.id)
    for (let i = 0; i < 2; i++) {
      const submissionSummary = getResult.submissionSummaries[i]
      expect(submissionSummary.files).toContain('a.txt')
      expect(submissionSummary.files).toContain('b.txt')
      expect(submissionSummary.student.userId).toBe(students[i].userId)
      expect(submissionSummary.student.numId).toBe(students[i].numId)
      expect(submissionSummary.student.name).toBe(students[i].name)
      expect(submissionSummary.assessment.feedback).toBeUndefined()
      expect(submissionSummary.assessment.memo).toBeUndefined()
      expect(submissionSummary.assessment.grade).toBeUndefined()
      expect(submissionSummary.assessment.rank).toBeUndefined()
      expect(submissionSummary.assessment.score).toBeUndefined()
    }
  })
})
