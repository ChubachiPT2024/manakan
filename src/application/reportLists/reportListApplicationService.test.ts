import { describe, expect, test } from 'vitest'
import { ReportListApplicationService } from './reportListApplicationService'
import { InMemoryCourseRepository } from 'src/infrastructure/inMemory/courses/inMemoryCourseRepository'
import { ReportListImportCommand } from './reportListImportCommand'
import path from 'path'

describe('import', () => {
  test('The course of the report is saved.', async () => {
    const courseRepository = new InMemoryCourseRepository()
    const service = new ReportListApplicationService(courseRepository)
    const command = new ReportListImportCommand(
      path.join(__dirname, 'reportListImportTestFiles', 'reportlist.xlsx')
    )

    await service.importAsync(command)

    const course = await courseRepository.findAsync(27048)
    expect(course.id).toBe(27048)
    expect(course.name).toBe('コミュニケーション技術特論2')
  })
})
