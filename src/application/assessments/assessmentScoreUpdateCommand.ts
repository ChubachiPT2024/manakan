/**
 * 個別評価点数更新コマンド
 */
export class AssessmentScoreUpdateCommand {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param score 点数
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly score: number
  ) {}
}
