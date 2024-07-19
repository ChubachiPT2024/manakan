import { Report } from 'src/domain/models/reports/report'
import { ReportRepository } from 'src/domain/models/reports/reportRepository'

/**
 * インメモリレポートリポジトリ
 */
export class InMemoryReportRepository implements ReportRepository {
  /**
   * レポート
   */
  private readonly reports = new Map<number, Report>()

  /**
   * レポートを保存する
   *
   * @param report レポート
   */
  public async saveAsync(report: Report): Promise<void> {
    this.reports.set(report.id, report)
  }

  /**
   * レポートを検索する
   *
   * @param id ID
   * @returns レポート
   */
  public async findAsync(id: number): Promise<Report> {
    const report = this.reports.get(id)
    if (!report) {
      throw new Error('The report is not found.')
    }
    return report
  }

  /**
   * レポートを全件取得する
   *
   * @returns レポート
   */
  public async findAllAsync(): Promise<Report[]> {
    return Array.from(this.reports.values())
  }
}
