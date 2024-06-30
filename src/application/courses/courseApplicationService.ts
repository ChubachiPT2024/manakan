import { CourseRepository } from 'src/domain/models/courses/courseRepository'
import { CourseGetResult } from './courseGetResult'
import { CourseGetCommand } from './courseGetCommand'
import { CourseData } from './courseData'

/**
 * コースアプリケーションサービス
 */
export class CourseApplicationService {
  /**
   * コンストラクタ
   *
   * @param courseRepository コースリポジトリ
   */
  public constructor(private readonly courseRepository: CourseRepository) {}

  /**
   * コースを取得する
   *
   * @param courseGetCommand コース取得コマンド
   * @returns コース取得結果
   */
  public async getAsync(
    courseGetCommand: CourseGetCommand
  ): Promise<CourseGetResult> {
    const course = await this.courseRepository.findAsync(courseGetCommand.id)
    return new CourseGetResult(new CourseData(course))
  }
}
