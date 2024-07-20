import { Assessment } from 'src/domain/models/assessments/assessment'
import { AssessmentRepository } from 'src/domain/models/assessments/assessmentRepository'
import { readFile, writeFile } from 'node:fs/promises'
import { JsonAssessmentObject } from './jsonAssessmentObject'

/**
 * JSON 個別評価リポジトリ
 */
export class JsonAssessmentRepository implements AssessmentRepository {
  /**
   * コンストラクタ
   *
   * @param jsonFileAbsolutePath JSON ファイルの絶対パス
   */
  public constructor(private readonly jsonFileAbsolutePath: string) {}

  /**
   * 個別評価を保存する
   *
   * @param assessment 個別評価
   */
  public async saveAsync(assessment: Assessment): Promise<void> {
    const assessments = await this.readFromJsonFileAsync()

    const index = assessments.findIndex(
      (x) =>
        x.reportId === assessment.reportId &&
        x.studentNumId === assessment.studentNumId
    )
    if (index === -1) {
      assessments.push(assessment)
    } else {
      assessments[index] = assessment
    }

    await this.writeToJsonFileAsync(assessments)
  }

  /**
   * 個別評価をレポート ID で検索する
   *
   * @param reportId レポート ID
   * @returns 個別評価
   */
  public async findByReportIdAsync(reportId: number): Promise<Assessment[]> {
    const assessments = await this.readFromJsonFileAsync()
    return assessments.filter((x) => x.reportId === reportId)
  }

  /**
   * 個別評価を検索する
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @returns 個別評価
   */
  public async findAsync(
    reportId: number,
    studentNumId: number
  ): Promise<Assessment> {
    const assessments = await this.readFromJsonFileAsync()
    const assessment = assessments.find(
      (x) => x.reportId === reportId && x.studentNumId === studentNumId
    )
    if (!assessment) {
      throw new Error('The assessment is not found.')
    }
    return assessment
  }

  /**
   * 個別評価を JSON ファイルから読み込む
   *
   * @returns 個別評価
   */
  private async readFromJsonFileAsync(): Promise<Assessment[]> {
    try {
      const objects: Object[] = JSON.parse(
        await readFile(this.jsonFileAbsolutePath, 'utf8')
      )
      // https://www.geeksforgeeks.org/how-to-cast-a-json-object-inside-of-typescript-class/
      return objects.map((x) =>
        Object.assign(new JsonAssessmentObject(), x).ToAssessment()
      )
    } catch {
      // まだファイルが存在しない場合
      return []
    }
  }

  /**
   * 個別評価を JSON ファイルに書き込む
   *
   * @param assessments 個別評価
   */
  private async writeToJsonFileAsync(assessments: Assessment[]): Promise<void> {
    await writeFile(this.jsonFileAbsolutePath, JSON.stringify(assessments))
  }
}
