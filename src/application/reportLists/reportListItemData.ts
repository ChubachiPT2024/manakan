import { ReportListItemAssessmentData } from './reportListItemAssessmentData'
import { ReportListItemStudentData } from './reportListItemStudentData'
import { ReportListItemSubmissionData } from './reportListItemSubmissionData'

/**
 * レポートリスト項目データ（DTO）
 */
export class ReportListItemData {
  /**
   * コンストラクタ
   *
   * @param student レポートリスト項目の学生データ
   * @param submission レポートリスト項目の提出物データ
   * @param assessment レポートリスト項目の個別評価データ
   */
  public constructor(
    public readonly student: ReportListItemStudentData,
    public readonly submission: ReportListItemSubmissionData,
    public readonly assessment: ReportListItemAssessmentData
  ) {}
}
