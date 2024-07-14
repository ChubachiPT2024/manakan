/**
 * 提出物サマリ一覧取得コマンド
 */
export class SubmissionSummariesGetCommand {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumIds 学籍番号リスト
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumIds: number[]
  ) {}
}
