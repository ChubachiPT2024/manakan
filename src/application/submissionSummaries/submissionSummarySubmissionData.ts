import { Submission } from 'src/domain/models/submissions/submission'

/**
 * 提出物サマリ提出物データ
 */
export class SubmissionSummarySubmissionData {
  /**
   * 提出済かどうか
   */
  public readonly isSubmitted: boolean

  /**
   *　提出日時
   */
  public readonly submissionDateTime?: string

  /**
   * 提出回数
   */
  public readonly submissionCount?: number

  /**
   * コンストラクタ
   *
   * @param submission 提出物
   */
  public constructor(submission: Submission) {
    this.isSubmitted = submission.isSubmitted
    this.submissionDateTime = submission.submissionDateTime
    this.submissionCount = submission.submissionCount
  }
}
