import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { SubmissionRepository } from 'src/domain/models/submissions/submissionRepository'
import { SubmissionFileGetCommand } from './submissionFileGetCommand'
import { SubmissionFileGetResult } from './submissionFileGetResult'
import { SubmissionFileReader } from './submissionFileReader'

/**
 * 提出物ファイルアプリケーションサービス
 */
export class SubmissionFileApplicationService {
  /**
   * コンストラクタ
   *
   * @param reportRepository レポートリポジトリ
   * @param submissionRepository 提出物リポジトリ
   */
  public constructor(
    private readonly reportRepository: ReportRepository,
    private readonly submissionRepository: SubmissionRepository
  ) {}

  /**
   * 提出物ファイルを取得する
   *
   * @param command 提出物ファイル取得コマンド
   * @returns 提出物ファイル取得結果
   */
  public async getAsync(
    command: SubmissionFileGetCommand
  ): Promise<SubmissionFileGetResult> {
    const report = await this.reportRepository.findAsync(command.reportId)
    const submission = await this.submissionRepository.findAsync(
      command.reportId,
      command.studentNumId
    )

    const reader = new SubmissionFileReader(
      report.reportListFolderAbsoultePath,
      submission.folderRelativePath
    )
    const content = await reader.readAsync(command.fileName)

    return new SubmissionFileGetResult(content)
  }
}
