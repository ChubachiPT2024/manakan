/**
 * レポートリストインポートコマンド
 */
export class ReportListImportCommand {
  /**
   * コンストラクタ
   *
   * @param reportListFilePath レポートリストファイルパス
   */
  public constructor(public readonly reportListFilePath: string) {}
}
