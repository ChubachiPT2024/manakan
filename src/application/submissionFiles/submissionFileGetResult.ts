/**
 * 提出物ファイル取得結果
 */
export class SubmissionFileGetResult {
  /**
   * コンストラクタ
   *
   * @param content ファイルの内容
   */
  public constructor(public readonly content: Uint8Array) {}
}
