import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReportListGetCommand } from "src/application/reportLists/reportListGetCommand";
import { ReportListGetResult } from "src/application/reportLists/reportListGetResult";

// ページ名称については検討の余地あり
const Evaluation = () => {
    const { reportId } = useParams<{ reportId: string }>();

    // レビュー用にインポートができていることを確認するための表示するための変数
    const [reportListGetResult, setReportListGetResult] = useState<ReportListGetResult | null>(null);

    // TODO:
    // レビュー用にインポートができていることを確認するための表示するために、レポートリストを取得する
    // データ取得用のライブラリをいれて改修する必要あり
    useEffect(() => {
        const fetchReportList = async (reportId : string) => {
            try {
                const reportListData = await window.electronAPI.getReportListAsync(
                    new ReportListGetCommand(Number(reportId))
                );
                setReportListGetResult(reportListData);
            } catch (error) {
                console.error("Failed to fetch report list:", error);
            }
        };

        fetchReportList(reportId);
    }, []);

    
    return (
        <>
            <h1>Evaluation Page</h1>
            <p>評価対象のフォルダがインポートされたら、遷移されてくるページ</p>
            {/* レビュー用にインポートができていることを確認するための表示 */}
            {
                reportListGetResult && (
                    <div>
                        <h2>{reportListGetResult.reportListData.reportId}:{reportListGetResult.reportListData.reportTitle}</h2>
                        <p>{reportListGetResult.reportListData.courseId}:{reportListGetResult.reportListData.courseName}</p>
                        <br />
                        <p>学生</p>
                        {reportListGetResult.reportListData.items.map((item) => (
                            <div key={item.student.numId}>{item.student.name}: {item.submission.folderRelativePath}</div>
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default Evaluation;
