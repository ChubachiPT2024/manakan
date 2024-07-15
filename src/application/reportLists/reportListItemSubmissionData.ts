import { Submission } from 'src/domain/models/submissions/submission'

/**
 * レポートリスト項目の提出物データ（DTO）
 */
export class ReportListItemSubmissionData {
  /**
   * 提出済かどうか
   */
  public readonly isSubmitted: boolean

  /**
   * 提出物フォルダの相対パス
   */
  public readonly folderRelativePath?: string

  /**
   * コンストラクタ
   *
   * @param submission 提出物
   */
  public constructor(submission: Submission) {
    this.isSubmitted = submission.isSubmitted
    this.folderRelativePath = submission.folderRelativePath
  }
}
