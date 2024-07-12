import { SubmissionSummaryData } from './submissionSummaryData'

/**
 * 提出物サマリ一覧取得結果
 */
export class SubmissionSummariesGetResult {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param submissionSummaries 提出物サマリ一覧
   */
  public constructor(
    public readonly reportId: number,
    public readonly submissionSummaries: SubmissionSummaryData[]
  ) {}
}
