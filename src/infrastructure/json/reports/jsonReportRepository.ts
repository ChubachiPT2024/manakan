import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { Report } from 'src/domain/models/reports/report'
import { readFile, writeFile } from 'node:fs/promises'

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

    const reportMap = new Map<number, Report>(reports.map((x) => [x.id, x]))
    reportMap.set(report.id, report)

    await this.writeToJsonFileAsync(Array.from(reportMap.values()))
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
      return JSON.parse(await readFile(this.jsonFileAbsolutePath, 'utf8'))
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
