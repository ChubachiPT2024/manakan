import { Assessment } from 'src/domain/models/assessments/assessment'
import { InMemoryAssessmentRepository } from 'src/infrastructure/inMemory/assessments/inMemoryAssessmentRepository'
import { describe, expect, test } from 'vitest'
import { AssessmentApplicationService } from './assessmentApplicationService'
import { AssessmentClassifyCommand } from './assessmentClassifyCommand'
import { AssessmentFeedbackUpdateCommand } from './assessmentFeedbackUpdateCommand.'
import { AssessmentMemoUpdateCommand } from './assessmentMemoUpdateCommand'
import { AssessmentScoreUpdateCommand } from './assessmentScoreUpdateCommand'

describe('classify', () => {
  test('The grade and rank are set after classification.', async () => {
    // Arrange
    const repository = new InMemoryAssessmentRepository()
    const assessment = new Assessment(0, 0)
    await repository.saveAsync(assessment)
    const service = new AssessmentApplicationService(repository)
    const command = new AssessmentClassifyCommand(
      assessment.reportId,
      assessment.studentNumId,
      1,
      '+-'
    )

    // Act
    await service.classifyAsync(command)

    // Assert
    const classified = await repository.findAsync(
      assessment.reportId,
      assessment.studentNumId
    )
    expect(classified.grade).toBe(1)
    expect(classified.rank).toBe('+-')
  })
})

describe('update feedback', () => {
  test('The feedback is updated.', async () => {
    // Arrange
    const repository = new InMemoryAssessmentRepository()
    const assessment = new Assessment(0, 0)
    await repository.saveAsync(assessment)
    const service = new AssessmentApplicationService(repository)
    const command = new AssessmentFeedbackUpdateCommand(
      assessment.reportId,
      assessment.studentNumId,
      'feedback'
    )

    // Act
    await service.updateFeedbackAsync(command)

    // Assert
    const updated = await repository.findAsync(
      assessment.reportId,
      assessment.studentNumId
    )
    expect(updated.feedback).toBe('feedback')
  })
})

describe('update memo', () => {
  test('The memo is updated.', async () => {
    // Arrange
    const repository = new InMemoryAssessmentRepository()
    const assessment = new Assessment(0, 0)
    await repository.saveAsync(assessment)
    const service = new AssessmentApplicationService(repository)
    const command = new AssessmentMemoUpdateCommand(
      assessment.reportId,
      assessment.studentNumId,
      'memo'
    )

    // Act
    await service.updateMemoAsync(command)

    // Assert
    const updated = await repository.findAsync(
      assessment.reportId,
      assessment.studentNumId
    )
    expect(updated.feedback).toBe('memo')
  })
})

describe('update score', () => {
  test('The score is updated.', async () => {
    // Arrange
    const repository = new InMemoryAssessmentRepository()
    const assessment = new Assessment(0, 0)
    await repository.saveAsync(assessment)
    const service = new AssessmentApplicationService(repository)
    const command = new AssessmentScoreUpdateCommand(
      assessment.reportId,
      assessment.studentNumId,
      0
    )

    // Act
    await service.updateScoreAsync(command)

    // Assert
    const updated = await repository.findAsync(
      assessment.reportId,
      assessment.studentNumId
    )
    expect(updated.score).toBe(0)
  })
})
