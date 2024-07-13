import { describe, expect, test } from 'vitest'
import { Assessment } from './assessment'

describe('classify', () => {
  test('The grade and rank are set after classification', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act
    const classified = assessment.classify(1, '+-')

    // Assert
    expect(classified.grade).toBe(1)
    expect(classified.rank).toBe('+-')
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

describe('update memo', () => {
  test('The memo is updated.', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act
    const classified = assessment.updateFeedback('memo')

    // Assert
    expect(classified.feedback).toBe('memo')
  })
})

describe('update score', () => {
  test('The score is updated.', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act
    const classified = assessment.updateScore(0)

    // Assert
    expect(classified.score).toBe(0)
  })
})
