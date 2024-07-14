import { describe, expect, test } from 'vitest'
import { InMemoryAssessmentRepository } from './inMemoryAssessmentRepository'
import { Assessment } from 'src/domain/models/assessments/assessment'

describe('save', () => {
  test('The saved assessment exists.', async () => {
    const repository = new InMemoryAssessmentRepository()
    const expected = new Assessment(1, 2)
    await repository.saveAsync(expected)

    const actual = await repository.findByReportIdAsync(expected.reportId)

    expect(actual.length).toBe(1)
    expect(actual[0].reportId).toBe(expected.reportId)
    expect(actual[0].studentNumId).toBe(expected.studentNumId)
    expect(actual[0].feedback).toBe(expected.feedback)
    expect(actual[0].memo).toBe(expected.memo)
    expect(actual[0].grade).toBe(expected.grade)
    expect(actual[0].rank).toBe(expected.rank)
    expect(actual[0].getScore()).toBe(expected.getScore())
  })
})

describe('find', () => {
  test('The saved assessment is found.', async () => {
    // Arrange
    const repository = new InMemoryAssessmentRepository()
    const expected = new Assessment(1, 2)
    await repository.saveAsync(expected)

    // Act
    const actual = await repository.findAsync(
      expected.reportId,
      expected.studentNumId
    )

    // Assert
    expect(actual.reportId).toBe(expected.reportId)
    expect(actual.studentNumId).toBe(expected.studentNumId)
    expect(actual.feedback).toBe(expected.feedback)
    expect(actual.memo).toBe(expected.memo)
    expect(actual.grade).toBe(expected.grade)
    expect(actual.rank).toBe(expected.rank)
    expect(actual.getScore()).toBe(expected.getScore())
  })

  test('The unsaved assessment is not found.', async () => {
    // Arrange
    const repository = new InMemoryAssessmentRepository()
    const expected = new Assessment(1, 2)
    await repository.saveAsync(expected)

    // Act, Assert
    expect(() => repository.findAsync(3, 4)).rejects.toThrowError()
  })
})
