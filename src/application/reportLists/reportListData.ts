import { ReportListItemData } from './reportListItemData'

/**
 * レポートリストデータ（DTO）
 */
export class ReportListData {
  /**
   * コンストラクタ
   *
   * @param courseId コース ID
   * @param courseName コース名
   * @param reportId レポート ID
   * @param reportTitle レポートタイトル
   * @param items レポートリスト項目
   */
  public constructor(
    public readonly courseId: number,
    public readonly courseName: string,
    public readonly reportId: number,
    public readonly reportTitle: string,
    public readonly items: ReportListItemData[]
  ) {}
}
