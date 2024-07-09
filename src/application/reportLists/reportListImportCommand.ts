/**
 * レポートリストインポートコマンド
 */
export class ReportListImportCommand {
  /**
   * コンストラクタ
   *
   * @param reportListFileAbsolutePath レポートリストファイルの絶対パス
   */
  public constructor(public readonly reportListFileAbsolutePath: string) {}
}
