import { describe, expect, test } from 'vitest'
import { Assessment } from './assessment'

describe('classify', () => {
  test('The grade and rank are set after classification', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act
    const classified = assessment.classify(1, 2)

    // Assert
    expect(classified.grade).toBe(1)
    expect(classified.rank).toBe(2)
  })
})

describe('update feedback', () => {
  test('The feedback is updated.', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act
    const classified = assessment.updateFeedback('feedback')

    // Assert
    expect(classified.feedback).toBe('feedback')
  })
})
