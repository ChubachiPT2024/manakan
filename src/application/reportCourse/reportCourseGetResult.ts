import { ReportCourseData } from './reportCourseData'

/**
 * レポートとコース取得結果
 */
export class ReportCourseGetResult {
  /**
   * コンストラクタ
   *
   * @param reportListData レポートコースデータ
   */
  public constructor(
    public readonly reportCourseDataList: ReportCourseData[]
  ) {}
}
