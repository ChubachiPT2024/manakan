import { InMemoryReportRepository } from 'src/infrastructure/inMemory/reports/inMemoryReportRepository'
import { describe, expect, test } from 'vitest'
import { Report } from 'src/domain/models/reports/report'
import { ReportApplicationService } from './reportApplicationService'
import { ReportGetCommand } from './reportGetCommand'

describe('get', () => {
  test('The service can get the report saved in the repository.', async () => {
    const repository = new InMemoryReportRepository()
    const report = new Report(1, 2, 'name')
    await repository.saveAsync(report)
    const service = new ReportApplicationService(repository)
    const command = new ReportGetCommand(report.id)

    const result = await service.getAsync(command)

    expect(result.reportData.courseId).toBe(report.courseId)
    expect(result.reportData.id).toBe(report.id)
    expect(result.reportData.title).toBe(report.title)
  })
})
