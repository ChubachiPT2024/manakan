import { describe, expect, test } from 'vitest'
import { Assessment } from './assessment'
import { AssessmentGrade } from './assessmentGrade'
import { AssessmentRank } from './assessmentRank'

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

describe('get score', () => {
  test('Cannot get score if the grade is undefined.', async () => {
    // Arrange
    const assessment = new Assessment(0, 0)

    // Act, Assert
    expect(() => assessment.getScore()).toThrowError()
  })

  test.each([
    { grade: 0, rank: undefined, expected: 0 },
    { grade: 1, rank: '--', expected: 10 },
    { grade: 1, rank: '-', expected: 20 },
    { grade: 1, rank: '+-', expected: 30 },
    { grade: 1, rank: '+', expected: 40 },
    { grade: 1, rank: '++', expected: 50 },
    { grade: 2, rank: '--', expected: 60 },
    { grade: 2, rank: '-', expected: 62 },
    { grade: 2, rank: '+-', expected: 64 },
    { grade: 2, rank: '+', expected: 66 },
    { grade: 2, rank: '++', expected: 68 },
    { grade: 3, rank: '--', expected: 70 },
    { grade: 3, rank: '-', expected: 72 },
    { grade: 3, rank: '+-', expected: 74 },
    { grade: 3, rank: '+', expected: 76 },
    { grade: 3, rank: '++', expected: 78 },
    { grade: 4, rank: '--', expected: 80 },
    { grade: 4, rank: '-', expected: 82 },
    { grade: 4, rank: '+-', expected: 84 },
    { grade: 4, rank: '+', expected: 86 },
    { grade: 4, rank: '++', expected: 88 },
    { grade: 5, rank: '--', expected: 90 },
    { grade: 5, rank: '-', expected: 93 },
    { grade: 5, rank: '+-', expected: 95 },
    { grade: 5, rank: '+', expected: 98 },
    { grade: 5, rank: '++', expected: 100 },
  ] as {
    grade: AssessmentGrade
    rank?: AssessmentRank
    expected: number
  }[])(
    'The score is $expected if the grade is $grade and the rank is $rank.',
    ({ grade, rank, expected }) => {
      // Arrange
      const assessment = new Assessment(0, 0, undefined, undefined, grade, rank)

      // Act
      const score = assessment.getScore()

      // Assert
      expect(score).toBe(expected)
    }
  )
})
