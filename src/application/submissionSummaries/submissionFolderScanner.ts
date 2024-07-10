import { readdir } from 'node:fs/promises'
import path from 'node:path'

/**
 * 提出物フォルダスキャナ
 */
export class SubmissionFolderScanner {
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
   * 提出物フォルダをスキャンする
   *
   * @returns 提出物フォルダ内のファイル名リスト
   */
  public async scanAsync(): Promise<string[]> {
    return await readdir(this.submissionFolderAbsolutePath)
  }
}
