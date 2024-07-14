/**
 * レポートリストエクスポート結果
 */
export class ReportListExportResult {
  /**
   * コンストラクタ
   *
   * @param content 内容
   */
  public constructor(public readonly content: Uint8Array) {}
}
