import { AssessmentRepository } from 'src/domain/models/assessments/assessmentRepository'
import { AssessmentClassifyCommand } from './assessmentClassifyCommand'

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
}
