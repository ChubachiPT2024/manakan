/**
 * 提出物ファイル取得コマンド
 */
export class SubmissionFileGetCommand {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param fileName ファイル名
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly fileName: string
  ) {}
}
