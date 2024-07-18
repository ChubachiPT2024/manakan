import { Submission } from 'src/domain/models/submissions/submission'
import { SubmissionRepository } from 'src/domain/models/submissions/submissionRepository'
import { readFile, writeFile } from 'node:fs/promises'
import { JsonSubmissionObject } from './jsonSubmissionObject'

/**
 * JSON 提出物リポジトリ
 */
export class JsonSubmissionRepository implements SubmissionRepository {
  /**
   * コンストラクタ
   *
   * @param jsonFileAbsolutePath JSON ファイルの絶対パス
   */
  public constructor(private readonly jsonFileAbsolutePath: string) {}

  /**
   * 提出物を保存する
   *
   * @param submission 提出物
   */
  public async saveAsync(submission: Submission): Promise<void> {
    const submissions = await this.readFromJsonFileAsync()

    const index = submissions.findIndex(
      (x) =>
        x.reportId === submission.reportId &&
        x.studentNumId === submission.studentNumId
    )
    if (index === -1) {
      submissions.push(submission)
    } else {
      submissions[index] = submission
    }

    await this.writeToJsonFileAsync(submissions)
  }

  /**
   * 提出物をレポート ID で検索する
   *
   * @param reportId レポート ID
   * @returns 提出物
   */
  public async findByReportIdAsync(reportId: number): Promise<Submission[]> {
    const submissions = await this.readFromJsonFileAsync()
    return submissions.filter((x) => x.reportId === reportId)
  }

  /**
   * 提出物を検索する
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @returns 提出物
   */
  public async findAsync(
    reportId: number,
    studentNumId: number
  ): Promise<Submission> {
    const submissions = await this.readFromJsonFileAsync()
    const submission = submissions.find(
      (x) => x.reportId === reportId && x.studentNumId === studentNumId
    )
    if (!submission) {
      throw new Error('The submission is not found.')
    }
    return submission
  }

  /**
   * 提出物を JSON ファイルから読み込む
   *
   * @returns 提出物
   */
  private async readFromJsonFileAsync(): Promise<Submission[]> {
    try {
      const objects: Object[] = JSON.parse(
        await readFile(this.jsonFileAbsolutePath, 'utf8')
      )
      // https://www.geeksforgeeks.org/how-to-cast-a-json-object-inside-of-typescript-class/
      return objects.map((x) =>
        Object.assign(new JsonSubmissionObject(), x).ToSubmission()
      )
    } catch {
      // まだファイルが存在しない場合
      return []
    }
  }

  /**
   * 提出物を JSON ファイルに書き込む
   *
   * @param submissions 提出物
   */
  private async writeToJsonFileAsync(submissions: Submission[]): Promise<void> {
    await writeFile(this.jsonFileAbsolutePath, JSON.stringify(submissions))
  }
}
