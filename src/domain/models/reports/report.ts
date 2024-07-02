/**
 * レポート
 */
export class Report {
  /**
   * コンストラクタ
   *
   * @param courseId コース ID
   * @param id ID
   * @param title タイトル
   */
  public constructor(
    public readonly courseId: number,
    public readonly id: number,
    public readonly title: string
  ) {}
}
