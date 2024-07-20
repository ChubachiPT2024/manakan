import { Course } from 'src/domain/models/courses/course'

/**
 * JSON コースオブジェクト
 */
export class JsonCourseObject {
  /**
   * ID
   */
  public id: number

  /**
   * コース名
   */
  public name: string

  /**
   * コースに変換する
   */
  public ToCourse(): Course {
    return new Course(this.id, this.name)
  }
}
