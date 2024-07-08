import { Submission } from 'src/domain/models/submissions/submission'
import { SubmissionRepository } from 'src/domain/models/submissions/submissionRepository'

/**
 * インメモリ提出物リポジトリ
 */
export class InMemorySubmissionRepository implements SubmissionRepository {
  /**
   * 提出物
   * 1 つ目の Key がレポート ID, 2 つ目の Key が学籍番号
   */
  private readonly submissions = new Map<number, Map<number, Submission>>()

  /**
   * 提出物を保存する
   *
   * @param submission 提出物
   */
  async saveAsync(submission: Submission): Promise<void> {
    let map = this.submissions.get(submission.reportId)
    if (!map) {
      map = new Map<number, Submission>()
      this.submissions.set(submission.reportId, map)
    }
    map.set(submission.studentNumId, submission)
  }

  /**
   * 提出物を検索する
   *
   * @param reportId レポート ID
   * @returns 提出物
   */
  async findAsync(reportId: number): Promise<Submission[]> {
    const map = this.submissions.get(reportId) ?? new Map<number, Submission>()
    return [...map.values()]
  }
}
