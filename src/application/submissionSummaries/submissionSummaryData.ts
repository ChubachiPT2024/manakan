import { SubmissionSummaryAssessmentData } from './submissionSummaryAssessmentData'
import { SubmissionSummaryStudentData } from './submissionSummaryStudentData'

/**
 * 提出物サマリデータ（DTO）
 */
export class SubmissionSummaryData {
  /**
   * コンストラクタ
   *
   * @param files 提出ファイル名リスト
   * @param student 提出物サマリの学生データ
   * @param assessment 提出物サマリの個別評価データ
   */
  public constructor(
    public readonly files: string[],
    public readonly student: SubmissionSummaryStudentData,
    public readonly assessment: SubmissionSummaryAssessmentData
  ) {}
}
