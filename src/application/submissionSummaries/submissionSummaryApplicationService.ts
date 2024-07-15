import { SubmissionRepository } from 'src/domain/models/submissions/submissionRepository'
import { SubmissionSummariesGetCommand } from './submissionSummariesGetCommand'
import { SubmissionSummariesGetResult } from './submissionSummariesGetResult'
import { SubmissionSummaryData } from './submissionSummaryData'
import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { StudentRepository } from 'src/domain/models/students/studentRepository'
import { AssessmentRepository } from 'src/domain/models/assessments/assessmentRepository'
import { SubmissionFolderScanner } from './submissionFolderScanner'
import { SubmissionSummaryStudentData } from './submissionSummaryStudentData'
import { SubmissionSummaryAssessmentData } from './submissionSummaryAssessmentData'
import { SubmissionSummarySubmissionData } from './submissionSummarySubmissionData'

/**
 * 提出物サマリアプリケーションサービス
 */
export class SubmissionSummaryApplicationService {
  /**
   * コンストラクタ
   *
   * @param reportRepository レポートリポジトリ
   * @param submissionRepository 提出物リポジトリ
   * @param studentRepository 学生リポジトリ
   * @param assessmentRepository 個別評価リポジトリ
   */
  public constructor(
    private readonly reportRepository: ReportRepository,
    private readonly submissionRepository: SubmissionRepository,
    private readonly studentRepository: StudentRepository,
    private readonly assessmentRepository: AssessmentRepository
  ) {}

  /**
   * 提出物サマリ一覧を取得する
   *
   * @param command 提出物サマリ一覧取得コマンド
   * @returns 提出物サマリ一覧取得結果
   */
  public async getSubmissionSummariesAsync(
    command: SubmissionSummariesGetCommand
  ): Promise<SubmissionSummariesGetResult> {
    const report = await this.reportRepository.findAsync(command.reportId)

    const submissionSummaries = await Promise.all(
      command.studentNumIds.map(
        async (studentNumId) =>
          await this.getSubmissionSummaryAsync(
            report.id,
            report.reportListFolderAbsolutePath,
            studentNumId
          )
      )
    )

    return new SubmissionSummariesGetResult(
      command.reportId,
      submissionSummaries
    )
  }

  /**
   * 提出物サマリを取得する
   *
   * @param reportId レポート ID
   * @param reportListFolderAbsolutePath レポートリストフォルダの絶対パス
   * @param studentNumId 学籍番号
   * @returns 提出物サマリ
   */
  private async getSubmissionSummaryAsync(
    reportId: number,
    reportListFolderAbsolutePath: string,
    studentNumId: number
  ): Promise<SubmissionSummaryData> {
    const submission = await this.submissionRepository.findAsync(
      reportId,
      studentNumId
    )
    const student = await this.studentRepository.findAsync(studentNumId)
    const assessment = await this.assessmentRepository.findAsync(
      reportId,
      studentNumId
    )

    if (!submission.isSubmitted) {
      return new SubmissionSummaryData(
        [],
        new SubmissionSummarySubmissionData(submission),
        new SubmissionSummaryStudentData(student),
        new SubmissionSummaryAssessmentData(assessment)
      )
    }

    const scanner = new SubmissionFolderScanner(
      reportListFolderAbsolutePath,
      submission.folderRelativePath
    )
    const files = await scanner.scanAsync()

    return new SubmissionSummaryData(
      files,
      new SubmissionSummarySubmissionData(submission),
      new SubmissionSummaryStudentData(student),
      new SubmissionSummaryAssessmentData(assessment)
    )
  }
}
