import { Assessment } from 'src/domain/models/assessments/assessment'
import { AssessmentGrade } from 'src/domain/models/assessments/assessmentGrade'
import { AssessmentRank } from 'src/domain/models/assessments/assessmentRank'

/**
 * JSON 個別評価オブジェクト
 */
export class JsonAssessmentObject {
  /**
   * レポート ID
   */
  public reportId: number

  /**
   * 学籍番号
   */
  public studentNumId: number

  /**
   * フィードバック
   */
  public feedback?: string

  /**
   * メモ
   */
  public memo?: string

  /**
   * 評点
   */
  public grade?: AssessmentGrade

  /**
   * 評点内の位置
   */
  public rank?: AssessmentRank

  /**
   * 個別評価に変換する
   */
  public ToAssessment(): Assessment {
    return new Assessment(
      this.reportId,
      this.studentNumId,
      this.feedback,
      this.memo,
      this.grade,
      this.rank
    )
  }
}
