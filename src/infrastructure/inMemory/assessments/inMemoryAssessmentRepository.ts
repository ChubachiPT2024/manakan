import { Assessment } from 'src/domain/models/assessments/assessment'
import { AssessmentRepository } from 'src/domain/models/assessments/assessmentRepository'

export class InMemoryAssessmentRepository implements AssessmentRepository {
  /**
   * 提出物
   * 1 つ目の Key がレポート ID, 2 つ目の Key が学籍番号
   */
  private readonly assessments = new Map<number, Map<number, Assessment>>()

  /**
   * 個別評価を保存する
   *
   * @param assessment 個別評価
   */
  async saveAsync(assessment: Assessment): Promise<void> {
    let map = this.assessments.get(assessment.reportId)
    if (!map) {
      map = new Map<number, Assessment>()
      this.assessments.set(assessment.reportId, map)
    }
    map.set(assessment.studentNumId, assessment)
  }

  /**
   * 個別評価を検索する
   *
   * @param reportId レポート ID
   * @returns 個別評価
   */
  async findAsync(reportId: number): Promise<Assessment[]> {
    const map = this.assessments.get(reportId) ?? new Map<number, Assessment>()
    return [...map.values()]
  }
}
