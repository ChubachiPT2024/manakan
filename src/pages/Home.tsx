import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Excel from 'exceljs';

export interface Report {
    id: number;
    course: string;
    students: Student[];
}

// reportlist.xlsxの内容をもとに型定義
// Excelファイルを参照しなくていいものだけを型定義している
// 提出の状態(未提出、提出済み)や提出日時を追加することも考えられる
export interface Student {
    id: number;
    userId: string;
    numId: number;
    grade: number;
    symgrade: number;
    comment: string;
    files: File[];
}

const Home = () => {
    const inputRef = useRef<HTMLInputElement>(null); // ファイル選択用のinput要素の参照
    const navigate = useNavigate(); // ルーティング用の関数

    // モデル
    const [report, setReport] = useState<Report>(null);

    const importReport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const fileList = event.target.files;

        // reportlist.xlsxが含まれているか確認
        // 含まれていない場合は処理を中断
        if (!Array.from(fileList).some((file) => file.name === 'reportlist.xlsx')) {
            alert('reportlist.xlsxが含まれていません');
            return;
        }

        // 提出物だけを取得
        const submissionList = Array.from(fileList).filter((file) => file.name !== 'reportlist.xlsx');
        if (!submissionList) return;

        // コース名を取得
        const arrayBuffer = await fileList[0].arrayBuffer();
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(arrayBuffer); // reportlist.xlsxファイルを読み込む
        const worksheet = workbook.getWorksheet(1); // 1番目のシートを取得
        const course = worksheet.getCell('C2').value as string; // C2セルの値を取得（レポート名）

        // 提出物を学生ごとに分類 
        // 複数のファイルが提出されることを考慮
        const studentMap = new Map<string, File[] | null>();
        submissionList
            .forEach((file) => {
                const studentFilePath = file.webkitRelativePath.split('/')[1];
                if (!studentMap.has(studentFilePath)) {
                    studentMap.set(studentFilePath, [file]);
                } else {
                    studentMap.get(studentFilePath).push(file);
                }
            });


        // 学生情報を取得
        const newReport: Report = {
            id: 1,
            course: course,
            students: Array.from(studentMap.entries()).map(([key, value], index) => {
                const atIndex = key.indexOf('@');
                const numId = parseInt(key.substring(0, atIndex));
                const userId = key.substring(atIndex + 1);
                return {
                    id: index + 1,
                    userId: userId,
                    numId: numId,
                    grade: null,
                    symgrade: null,
                    comment: null,
                    files: value,
                };
            }),
        };

        setReport(newReport);
    };

    useEffect(() => {
        if (report) {
            navigate('/evaluation', { state: report });
        }
    }, [report, navigate]);

    return (
        <>
            <h1>Home Page</h1>
            <p>Homeページです</p>
            <input
                type="file"
                multiple
                onChange={importReport}
                ref={inputRef}
                // @ts-ignore
                webkitdirectory="true"
            />
        </>
    );
};

export default Home;