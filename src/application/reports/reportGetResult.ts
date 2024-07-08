import { ReportData } from './reportData'

/**
 * レポート取得結果
 */
export class ReportGetResult {
  /**
   * コンストラクタ
   *
   * @param reportData レポートデータ
   */
  public constructor(public readonly reportData: ReportData) {}
}
