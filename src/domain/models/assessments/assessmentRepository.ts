import { Assessment } from './assessment'

/**
 * 個別評価リポジトリ
 */
export interface AssessmentRepository {
  /**
   * 個別評価を保存する
   *
   * @param assessment 個別評価
   */
  saveAsync(assessment: Assessment): Promise<void>

  /**
   * 個別評価をレポート ID で検索する
   *
   * @param reportId レポート ID
   * @returns 個別評価
   */
  findByReportIdAsync(reportId: number): Promise<Assessment[]>

  /**
   * 個別評価を検索する
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   */
  findAsync(reportId: number, studentNumId: number): Promise<Assessment>
}
