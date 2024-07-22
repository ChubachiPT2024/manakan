import { describe, expect, onTestFinished, test } from 'vitest'
import { JsonReportRepository } from './jsonReportRepository'
import { Report } from 'src/domain/models/reports/report'
import { mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { sep } from 'node:path'

describe('save', () => {
  test('The saved report exists.', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonReportRepository(join(tmpDir, 'reports.json'))
    const expected = new Report(1, 2, 'title', 'reportListFolderAbsolutePath')

    // Act
    await repository.saveAsync(expected)

    // Assert
    const actual = await repository.findAsync(expected.id)
    expect(actual.courseId).toBe(expected.courseId)
    expect(actual.id).toBe(expected.id)
    expect(actual.title).toBe(expected.title)
    expect(actual.reportListFolderAbsolutePath).toBe(
      expected.reportListFolderAbsolutePath
    )
  })

  test('should return all reports', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonReportRepository(join(tmpDir, 'reports.json'))
    const expected1 = new Report(
      1,
      1,
      'title1',
      'reportListFolderAbsolutePath1'
    )
    const expected2 = new Report(
      2,
      2,
      'title2',
      'reportListFolderAbsolutePath2'
    )

    await repository.saveAsync(expected1)
    await repository.saveAsync(expected2)

    // Act
    const actual = await repository.findAllAsync()

    // Assert
    expect(actual.length).toBe(2)
  })
})
