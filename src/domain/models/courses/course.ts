/**
 * コース
 */
export class Course {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param name コース名
   */
  public constructor(
    public readonly id: number,
    public readonly name: string
  ) {}
}
