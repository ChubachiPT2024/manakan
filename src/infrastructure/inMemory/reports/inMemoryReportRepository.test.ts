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
})
