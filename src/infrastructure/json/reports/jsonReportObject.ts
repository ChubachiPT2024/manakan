import { Report } from 'src/domain/models/reports/report'

/**
 * JSON レポートオブジェクト
 */
export class JsonReportObject {
  /**
   * コース ID
   */
  public courseId: number

  /**
   * ID
   */
  public id: number

  /**
   * タイトル
   */
  public title: string

  /**
   * レポートリストフォルダの絶対パス
   */
  public reportListFolderAbsolutePath: string

  /**
   * レポートに変換する
   */
  public ToReport(): Report {
    return new Report(
      this.courseId,
      this.id,
      this.title,
      this.reportListFolderAbsolutePath
    )
  }
}
