import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { ReportGetCommand } from './reportGetCommand'
import { ReportGetResult } from './reportGetResult'
import { ReportData } from './reportData'

/**
 * レポートアプリケーションサービス
 */
export class ReportApplicationService {
  /**
   * コンストラクタ
   *
   * @param reportRepository レポートリポジトリ
   */
  public constructor(private readonly reportRepository: ReportRepository) {}

  /**
   * レポートを取得する
   *
   * @param reportGetCommand レポート取得コマンド
   * @returns レポート取得結果
   */
  public async getAsync(
    reportGetCommand: ReportGetCommand
  ): Promise<ReportGetResult> {
    const report = await this.reportRepository.findAsync(reportGetCommand.id)
    return new ReportGetResult(new ReportData(report))
  }
}
