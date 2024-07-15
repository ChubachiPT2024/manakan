/**
 * 提出物
 */
export class Submission {
  /**
   * コンストラクタ
   *
   * @param reportId レポート ID
   * @param studentNumId 学籍番号
   * @param isSubmitted 提出済かどうか
   * @param submissionDateTime 提出日時
   * @param submissionCount 提出回数
   * @param folderRelativePath 提出物フォルダの相対パス
   */
  public constructor(
    public readonly reportId: number,
    public readonly studentNumId: number,
    public readonly isSubmitted: boolean,
    public readonly submissionDateTime?: string,
    public readonly submissionCount?: number,
    public readonly folderRelativePath?: string
  ) {
    if (isSubmitted) {
      if (submissionDateTime === undefined) {
        throw new TypeError('The submission datetime is necessary.')
      }
      if (submissionCount === undefined) {
        throw new TypeError('The submission count is necessary.')
      }
      if (folderRelativePath === undefined) {
        throw new TypeError('The folder relative path is necessary.')
      }
    }
  }
}
