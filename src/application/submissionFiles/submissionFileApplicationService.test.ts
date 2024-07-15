import { InMemoryReportRepository } from 'src/infrastructure/inMemory/reports/inMemoryReportRepository'
import { InMemorySubmissionRepository } from 'src/infrastructure/inMemory/submissions/inMemorySubmissionRepository'
import { describe, expect, test } from 'vitest'
import { SubmissionFileApplicationService } from './submissionFileApplicationService'
import { Report } from 'src/domain/models/reports/report'
import path from 'node:path'
import { Submission } from 'src/domain/models/submissions/submission'
import { SubmissionFileGetCommand } from './submissionFileGetCommand'

describe('get', () => {
  test('Can get the file content.', async () => {
    const reportRepository = new InMemoryReportRepository()
    const submissionRepository = new InMemorySubmissionRepository()
    const service = new SubmissionFileApplicationService(
      reportRepository,
      submissionRepository
    )
    const report = new Report(
      0,
      0,
      'report title',
      path.join(__dirname, 'submissionFileApplicationServiceTestData')
    )
    await reportRepository.saveAsync(report)
    const submission = new Submission(
      report.id,
      23745148,
      true,
      '2019-02-14 23:18:43',
      1,
      '23745148@a2348mt'
    )
    await submissionRepository.saveAsync(submission)

    // Act
    const getResult = await service.getAsync(
      new SubmissionFileGetCommand(
        report.id,
        submission.studentNumId,
        'hello.txt'
      )
    )

    // Assert
    expect(new TextDecoder().decode(getResult.content)).toBe('hello')
  })
})
