import { describe, expect, test } from 'vitest'
import { InMemorySubmissionRepository } from './inMemorySubmissionRepository'
import { Submission } from 'src/domain/models/submissions/submission'

describe('save', () => {
  test('The saved submission exists.', async () => {
    const repository = new InMemorySubmissionRepository()
    const expected = new Submission(1, 2, '23745101@a2301aa')
    await repository.saveAsync(expected)

    const actual = await repository.findByReportIdAsync(expected.reportId)

    expect(actual.length).toBe(1)
    expect(actual[0].reportId).toBe(expected.reportId)
    expect(actual[0].studentNumId).toBe(expected.studentNumId)
    expect(actual[0].folderRelativePath).toBe(expected.folderRelativePath)
  })
})

describe('find', () => {
  test('The saved submission is found.', async () => {
    // Arrange
    const repository = new InMemorySubmissionRepository()
    const expected = new Submission(1, 2, 'folderRelativePath')
    await repository.saveAsync(expected)

    // Act
    const actual = await repository.findAsync(
      expected.reportId,
      expected.studentNumId
    )

    // Assert
    expect(actual.reportId).toBe(expected.reportId)
    expect(actual.studentNumId).toBe(expected.studentNumId)
    expect(actual.folderRelativePath).toBe(expected.folderRelativePath)
  })

  test('The unsaved submission is not found.', async () => {
    // Arrange
    const repository = new InMemorySubmissionRepository()
    const expected = new Submission(1, 2, 'folderRelativePath')
    await repository.saveAsync(expected)

    // Act, Assert
    expect(() => repository.findAsync(3, 4)).rejects.toThrowError()
  })
})
