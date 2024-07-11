/**
 * 個別評価フィードバック更新コマンド
 */
export class AssessmentFeedbackUpdateCommand {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param feedback フィードバック
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly feedback: string
  ) {}
}
