import { Assessment } from 'src/domain/models/assessments/assessment'
import { InMemoryAssessmentRepository } from 'src/infrastructure/inMemory/assessments/inMemoryAssessmentRepository'
import { describe, expect, test } from 'vitest'
import { AssessmentApplicationService } from './assessmentApplicationService'
import { AssessmentClassifyCommand } from './assessmentClassifyCommand'

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
      2
    )

    // Act
    await service.classifyAsync(command)

    // Assert
    const classified = await repository.findAsync(
      assessment.reportId,
      assessment.studentNumId
    )
    expect(classified.grade).toBe(1)
    expect(classified.rank).toBe(2)
  })
})
