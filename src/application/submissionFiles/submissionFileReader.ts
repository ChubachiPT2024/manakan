import path from 'node:path'
import { readFile } from 'node:fs/promises'

/**
 * 提出物ファイルリーダー
 */
export class SubmissionFileReader {
  /**
   * 提出物フォルダの絶対パス
   */
  private readonly submissionFolderAbsolutePath: string

  /**
   * コンストラクタ
   *
   * @param reportListFolderAbsolutePath レポートリストフォルダの絶対パス
   * @param submissionFolderRelativePath 提出物フォルダの相対パス
   */
  public constructor(
    reportListFolderAbsolutePath: string,
    submissionFolderRelativePath: string
  ) {
    this.submissionFolderAbsolutePath = path.join(
      reportListFolderAbsolutePath,
      submissionFolderRelativePath
    )
  }

  /**
   * ファイルを読み込む
   *
   * @param fileName ファイル名
   * @returns ファイル内容
   */
  public async readAsync(fileName: string): Promise<Uint8Array> {
    // readFile の戻り値の型は Buffer だが、
    // Buffer は Uint8Array の派生クラスなのでキャストできる
    // https://nodejs.org/api/buffer.html#buffer
    return await readFile(
      path.join(this.submissionFolderAbsolutePath, fileName)
    )
  }
}
