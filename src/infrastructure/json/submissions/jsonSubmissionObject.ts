import { Submission } from 'src/domain/models/submissions/submission'

/**
 * JSON 提出物オブジェクト
 */
export class JsonSubmissionObject {
  /**
   * レポート ID
   */
  public reportId: number

  /**
   * 学籍番号
   */
  public studentNumId: number

  /**
   * 提出済かどうか
   */
  public isSubmitted: boolean

  /**
   * 提出日時
   */
  public submissionDateTime?: string

  /**
   * 提出回数
   */
  public submissionCount?: number

  /**
   * 提出物フォルダの相対パス
   */
  public folderRelativePath?: string

  /**
   * 提出物に変換する
   *
   * @returns 提出物
   */
  public ToSubmission(): Submission {
    return new Submission(
      this.reportId,
      this.studentNumId,
      this.isSubmitted,
      this.submissionDateTime,
      this.submissionCount,
      this.folderRelativePath
    )
  }
}
