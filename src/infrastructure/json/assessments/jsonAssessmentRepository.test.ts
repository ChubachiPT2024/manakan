import { describe, expect, onTestFinished, test } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { sep } from 'node:path'
import { JsonAssessmentRepository } from './jsonAssessmentRepository'
import { Assessment } from 'src/domain/models/assessments/assessment'

describe('save', () => {
  test('The saved assessment exists.', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonAssessmentRepository(
      join(tmpDir, 'assessments.json')
    )
    const expected = new Assessment(1, 2)
    await repository.saveAsync(expected)

    // Act
    const actual = await repository.findByReportIdAsync(expected.reportId)

    // Assert
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
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonAssessmentRepository(
      join(tmpDir, 'assessments.json')
    )
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
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonAssessmentRepository(
      join(tmpDir, 'assessments.json')
    )
    const expected = new Assessment(1, 2)
    await repository.saveAsync(expected)

    // Act, Assert
    expect(() => repository.findAsync(3, 4)).rejects.toThrowError()
  })
})
