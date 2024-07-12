import { Submission } from './submission'

/**
 * 提出物リポジトリ
 */
export interface SubmissionRepository {
  /**
   * 提出物を保存する
   *
   * @param submission 提出物
   */
  saveAsync(submission: Submission): Promise<void>

  /**
   * 提出物をレポート ID で検索する
   *
   * @param reportId レポート ID
   * @returns 提出物
   */
  findByReportIdAsync(reportId: number): Promise<Submission[]>

  /**
   * 提出物を検索する
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @returns 提出物
   */
  findAsync(reportId: number, studentNumId: number): Promise<Submission>
}
