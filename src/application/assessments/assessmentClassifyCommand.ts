import { AssessmentGrade } from 'src/domain/models/assessments/assessmentGrade'
import { AssessmentRank } from 'src/domain/models/assessments/assessmentRank'

/**
 * 個別評価分類コマンド
 */
export class AssessmentClassifyCommand {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param grade 評点
   * @param rank 評点内の位置
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly grade: AssessmentGrade,
    public readonly rank?: AssessmentRank
  ) {}
}
