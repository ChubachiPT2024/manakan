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
   * 個別評価を検索する
   *
   * @param reportId レポート ID
   * @returns 個別評価
   */
  findAsync(reportId: number): Promise<Assessment[]>
}
