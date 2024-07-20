import { describe, expect, onTestFinished, test } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { sep } from 'node:path'
import { Submission } from 'src/domain/models/submissions/submission'
import { JsonSubmissionRepository } from './jsonSubmissionRepository'

describe('save', () => {
  test('The saved submission exists.', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonSubmissionRepository(
      join(tmpDir, 'submissions.json')
    )
    const expected = new Submission(
      1,
      2,
      true,
      '2024-01-01 00:00:00',
      1,
      'folderRelativePath'
    )
    await repository.saveAsync(expected)

    // Act
    const actual = await repository.findByReportIdAsync(expected.reportId)

    // Assert
    expect(actual.length).toBe(1)
    expect(actual[0].reportId).toBe(expected.reportId)
    expect(actual[0].studentNumId).toBe(expected.studentNumId)
    expect(actual[0].isSubmitted).toBe(expected.isSubmitted)
    expect(actual[0].submissionDateTime).toBe(expected.submissionDateTime)
    expect(actual[0].submissionCount).toBe(expected.submissionCount)
    expect(actual[0].folderRelativePath).toBe(expected.folderRelativePath)
  })
})

describe('find', () => {
  test('The saved submission is found.', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonSubmissionRepository(
      join(tmpDir, 'submissions.json')
    )
    const expected = new Submission(
      1,
      2,
      true,
      '2024-01-01 00:00:00',
      1,
      'folderRelativePath'
    )
    await repository.saveAsync(expected)

    // Act
    const actual = await repository.findAsync(
      expected.reportId,
      expected.studentNumId
    )

    // Assert
    expect(actual.reportId).toBe(expected.reportId)
    expect(actual.studentNumId).toBe(expected.studentNumId)
    expect(actual.isSubmitted).toBe(expected.isSubmitted)
    expect(actual.submissionDateTime).toBe(expected.submissionDateTime)
    expect(actual.submissionCount).toBe(expected.submissionCount)
    expect(actual.folderRelativePath).toBe(expected.folderRelativePath)
  })

  test('The unsaved submission is not found.', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonSubmissionRepository(
      join(tmpDir, 'submissions.json')
    )
    const expected = new Submission(
      1,
      2,
      true,
      '2024-01-01 00:00:00',
      1,
      'folderRelativePath'
    )
    await repository.saveAsync(expected)

    // Act, Assert
    expect(() => repository.findAsync(3, 4)).rejects.toThrowError()
  })
})
