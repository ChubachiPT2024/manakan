import { CourseData } from './courseData'

/**
 * コース取得結果
 */
export class CourseGetResult {
  /**
   * コンストラクタ
   *
   * @param courseData コースデータ
   */
  public constructor(public readonly courseData: CourseData) {}
}
