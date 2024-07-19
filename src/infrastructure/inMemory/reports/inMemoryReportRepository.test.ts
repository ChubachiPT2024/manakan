import { describe, expect, test } from 'vitest'
import { InMemoryReportRepository } from './inMemoryReportRepository'
import { Report } from 'src/domain/models/reports/report'

describe('save', () => {
  test('The saved report exists.', async () => {
    const repository = new InMemoryReportRepository()
    const expected = new Report(1, 2, 'title', 'reportListFolderAbsolutePath')

    await repository.saveAsync(expected)

    const actual = await repository.findAsync(expected.id)
    expect(actual.courseId).toBe(expected.courseId)
    expect(actual.id).toBe(expected.id)
    expect(actual.title).toBe(expected.title)
    expect(actual.reportListFolderAbsolutePath).toBe(
      expected.reportListFolderAbsolutePath
    )
  })

  test('should return all reports', async () => {
    const repository = new InMemoryReportRepository()
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

    const actual = await repository.findAllAsync()
    expect(actual.length).toBe(2)
  })
})
