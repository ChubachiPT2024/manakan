import { Report } from 'src/domain/models/reports/report'

/**
 * レポートデータ（DTO）
 */
export class ReportData {
  /**
   * コース ID
   */
  public readonly courseId: number

  /**
   * ID
   */
  public readonly id: number

  /**
   * タイトル
   */
  public readonly title: string

  /**
   * コンストラクタ
   *
   * @param report レポート
   */
  public constructor(report: Report) {
    this.courseId = report.courseId
    this.id = report.id
    this.title = report.title
  }
}
