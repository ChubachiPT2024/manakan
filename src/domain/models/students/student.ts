/**
 * 学生
 */
export class Student {
  /**
   * コンストラクタ
   *
   * @param userId ユーザ ID
   * @param numId 学籍番号
   * @param name 氏名
   */
  public constructor(
    public readonly userId: string,
    public readonly numId: number,
    public readonly name: string
  ) {}
}
