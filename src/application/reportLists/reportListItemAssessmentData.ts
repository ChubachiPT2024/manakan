import { Assessment } from 'src/domain/models/assessments/assessment'
import { AssessmentGrade } from 'src/domain/models/assessments/assessmentGrade'
import { AssessmentRank } from 'src/domain/models/assessments/assessmentRank'

/**
 * レポートリスト項目の個別評価データ（DTO）
 */
export class ReportListItemAssessmentData {
  /**
   * フィードバック
   */
  public readonly feedback?: string

  /**
   * メモ
   */
  public readonly memo?: string

  /**
   * 評点
   */
  public readonly grade?: AssessmentGrade

  /**
   * 評点内の位置
   */
  public readonly rank?: AssessmentRank
  /**
   * 点数
   */
  public readonly score?: number

  /**
   * コンストラクタ
   *
   * @param assessment 個別評価
   */
  public constructor(assessment: Assessment) {
    this.feedback = assessment.feedback
    this.memo = assessment.memo
    this.grade = assessment.grade
    this.rank = assessment.rank
    this.score = assessment.score
  }
}
