import { AssessmentRank } from './assessmentRank'

/**
 * 個別評価
 */
export class Assessment {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param feedback フィードバック
   * @param memo メモ
   * @param grade 評点
   * @param rank 評点内の位置
   * @param score 点数
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly feedback?: string,
    public readonly memo?: string,
    public readonly grade?: number,
    public readonly rank?: AssessmentRank,
    public readonly score?: number
  ) {
    if (!grade && (grade < 0 || grade > 5)) {
      throw new TypeError('The grade must be in [0, 5].')
    }

    if (!score && (score < 0 || score > 100)) {
      throw new TypeError('The score must be in [0, 100].')
    }
  }

  /**
   * 分類する
   *
   * @param grade 評点
   * @param rank 評点内の位置
   * @returns 分類後の個別評価
   */
  public classify(grade: number, rank: AssessmentRank) {
    return new Assessment(
      this.reportId,
      this.studentNumId,
      this.feedback,
      this.memo,
      grade,
      rank,
      this.score
    )
  }
}
