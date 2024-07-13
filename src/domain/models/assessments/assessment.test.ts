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

  test('Can set the grade to 0 and the rank to undefined.', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act
    const classified = assessment.classify(0, undefined)

    // Assert
    expect(classified.grade).toBe(0)
    expect(classified.rank).toBe(undefined)
  })

  test('Cannot set the grade to 0 and the rank to defined.', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act, Assert
    expect(() => assessment.classify(0, '+-')).toThrowError()
  })

  test('Cannot set the grade to defined and the rank to undefined.', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act, Assert
    expect(() => assessment.classify(1, undefined)).toThrowError()
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
