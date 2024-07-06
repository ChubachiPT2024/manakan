/**
 * 提出物
 */
export class Submission {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param folderRelativePath 提出物フォルダの相対パス
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly folderRelativePath: string
  ) {}
}
