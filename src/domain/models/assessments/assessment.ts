import { AssessmentGrade } from './assessmentGrade'
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
    public readonly grade?: AssessmentGrade,
    public readonly rank?: AssessmentRank,
    public readonly score?: number
  ) {
    if (grade === 0 && rank !== undefined) {
      throw new TypeError('The rank must be undefined if the grade is 0.')
    }
    if ([1, 2, 3, 4, 5].includes(grade) && rank === undefined) {
      throw new TypeError(
        'The rank must be defined if the grade is defined and not 0.'
      )
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
  public classify(grade: AssessmentGrade, rank?: AssessmentRank) {
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

  /**
   * フィードバックを更新する
   *
   * @param feedback フィードバック
   * @returns フィードバック更新後の個別評価
   */
  public updateFeedback(feedback: string) {
    return new Assessment(
      this.reportId,
      this.studentNumId,
      feedback,
      this.memo,
      this.grade,
      this.rank,
      this.score
    )
  }

  /**
   * メモを更新する
   *
   * @param memo メモ
   * @returns メモ更新後の個別評価
   */
  public updateMemo(memo: string) {
    return new Assessment(
      this.reportId,
      this.studentNumId,
      this.feedback,
      memo,
      this.grade,
      this.rank,
      this.score
    )
  }

  /**
   * 点数を更新する
   *
   * @param score 点数
   * @returns 点数更新後の個別評価
   */
  public updateScore(score: number) {
    return new Assessment(
      this.reportId,
      this.studentNumId,
      this.feedback,
      this.memo,
      this.grade,
      this.rank,
      score
    )
  }

  /**
   * 点数を取得する
   *
   * @returns 点数
   */
  public getScore(): number {
    if (this.grade === undefined) {
      throw new Error('The grade must be defined.')
    }

    if (this.grade === 0) {
      return 0
    }

    const rankIndex = ['--', '-', '+-', '+', '++'].indexOf(this.rank)
    if (rankIndex === -1) {
      throw new Error(
        'The rank must be defined if the grade is defined and not 0.'
      )
    }

    switch (this.grade) {
      case 1:
        return 10 + 10 * rankIndex
      case 2:
        return 60 + 2 * rankIndex
      case 3:
        return 70 + 2 * rankIndex
      case 4:
        return 80 + 2 * rankIndex
      case 5:
        // '++' のとき 100 点になるようにする
        // 小数は入力できない可能性があるので四捨五入する（要確認）
        return Math.round(90 + 2.5 * rankIndex)
    }
  }
}
