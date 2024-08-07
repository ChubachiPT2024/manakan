import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { Report } from 'src/domain/models/reports/report'
import { readFile, writeFile } from 'node:fs/promises'
import { JsonReportObject } from './jsonReportObject'

/**
 * JSON レポートリポジトリ
 */
export class JsonReportRepository implements ReportRepository {
  /**
   * コンストラクタ
   *
   * @param jsonFileAbsolutePath JSON ファイルの絶対パス
   */
  public constructor(private readonly jsonFileAbsolutePath: string) {}

  /**
   * レポートを保存する
   *
   * @param report レポート
   */
  public async saveAsync(report: Report): Promise<void> {
    const reports = await this.readFromJsonFileAsync()

    const index = reports.findIndex((x) => x.id === report.id)
    if (index === -1) {
      reports.push(report)
    } else {
      reports[index] = report
    }

    await this.writeToJsonFileAsync(reports)
  }

  /**
   * レポートを検索する
   *
   * @param id ID
   * @returns レポート
   */
  public async findAsync(id: number): Promise<Report> {
    const reports = await this.readFromJsonFileAsync()

    const report = reports.find((x) => x.id === id)
    if (!report) {
      throw new Error('The report is not found.')
    }
    return report
  }

  /**
   * レポートを全件取得する
   *
   * @returns レポート
   */
  public async findAllAsync(): Promise<Report[]> {
    return await this.readFromJsonFileAsync()
  }

  /**
   * レポートを JSON ファイルから読み込む
   *
   * @returns レポート
   */
  private async readFromJsonFileAsync(): Promise<Report[]> {
    try {
      const objects: Object[] = JSON.parse(
        await readFile(this.jsonFileAbsolutePath, 'utf8')
      )
      // https://www.geeksforgeeks.org/how-to-cast-a-json-object-inside-of-typescript-class/
      return objects.map((x) =>
        Object.assign(new JsonReportObject(), x).ToReport()
      )
    } catch {
      // まだファイルが存在しない場合
      return []
    }
  }

  /**
   * レポートを JSON ファイルに書き込む
   *
   * @param reports レポート
   */
  private async writeToJsonFileAsync(reports: Report[]): Promise<void> {
    await writeFile(this.jsonFileAbsolutePath, JSON.stringify(reports))
  }
}
