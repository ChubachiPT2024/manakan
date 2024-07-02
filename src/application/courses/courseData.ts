import { Course } from 'src/domain/models/courses/course'

/**
 * コースデータ（DTO）
 */
export class CourseData {
  /**
   * ID
   */
  public readonly id: number

  /**
   * 名前
   */
  public readonly name: string

  /**
   * コンストラクタ
   *
   * @param course コース
   */
  public constructor(course: Course) {
    this.id = course.id
    this.name = course.name
  }
}
