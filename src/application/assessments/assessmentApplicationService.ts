import { AssessmentRepository } from 'src/domain/models/assessments/assessmentRepository'
import { AssessmentClassifyCommand } from './assessmentClassifyCommand'
import { AssessmentFeedbackUpdateCommand } from './assessmentFeedbackUpdateCommand.'

/**
 * 個別評価アプリケーションサービス
 */
export class AssessmentApplicationService {
  /**
   * コンストラクタ
   *
   * @param assessmentRepository 個別評価リポジトリ
   */
  public constructor(
    private readonly assessmentRepository: AssessmentRepository
  ) {}

  /**
   * 個別評価を分類する
   *
   * @param command 個別評価分類コマンド
   */
  public async classifyAsync(
    command: AssessmentClassifyCommand
  ): Promise<void> {
    const assessment = await this.assessmentRepository.findAsync(
      command.reportId,
      command.studentNumId
    )

    const classified = assessment.classify(command.grade, command.rank)

    await this.assessmentRepository.saveAsync(classified)
  }

  /**
   * フィードバックを更新する
   *
   * @param command 個別評価フィードバック更新コマンド
   */
  public async updateFeedbackAsync(
    command: AssessmentFeedbackUpdateCommand
  ): Promise<void> {
    const assessment = await this.assessmentRepository.findAsync(
      command.reportId,
      command.studentNumId
    )

    const updated = assessment.updateFeedback(command.feedback)

    await this.assessmentRepository.saveAsync(updated)
  }
}
