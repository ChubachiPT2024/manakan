import { Report } from './report'

/**
 * レポートリポジトリ
 */
export interface ReportRepository {
  /**
   * レポートを保存する
   *
   * @param report レポート
   */
  saveAsync(report: Report): Promise<void>

  /**
   * レポートを検索する
   *
   * @param id ID
   */
  findAsync(id: number): Promise<Report>
}
