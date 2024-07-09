import { ReportListData } from './reportListData'

/**
 * レポートリスト取得結果
 */
export class ReportListGetResult {
  /**
   * コンストラクタ
   *
   * @param reportListData レポートリストデータ
   */
  public constructor(public readonly reportListData: ReportListData) {}
}
