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
   * @param reportListFolderAbsolutePath レポートリストフォルダの絶対パス
   */
  public constructor(
    public readonly courseId: number,
    public readonly id: number,
    public readonly title: string,
    public readonly reportListFolderAbsolutePath: string
  ) {}
}
