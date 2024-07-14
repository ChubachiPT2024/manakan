/**
 * 個別評価メモ更新コマンド
 */
export class AssessmentMemoUpdateCommand {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param memo メモ
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly memo: string
  ) {}
}
