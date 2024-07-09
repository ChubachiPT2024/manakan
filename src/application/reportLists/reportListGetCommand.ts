/**
 * レポートリスト取得コマンド
 */
export class ReportListGetCommand {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   */
  public constructor(public readonly reportId: number) {}
}
