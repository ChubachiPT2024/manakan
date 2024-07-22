/**
 * レポートとコースのデータ
 */
export class ReportCourseData {
  /**
   * コンストラクタ
   *
   * @param courseId コース ID
   * @param courseName コース名
   * @param reportId レポート ID
   * @param reportTitle レポートタイトル
   */
  public constructor(
    public readonly courseId: number,
    public readonly courseName: string,
    public readonly reportId: number,
    public readonly reportTitle: string
  ) {}
}
