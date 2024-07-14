/**
 * レポートリストエクスポート結果
 */
export class ReportListExportResult {
  /**
   * コンストラクタ
   *
   * @param reportList レポートリスト
   */
  public constructor(public readonly reportList: Blob) {}
}
