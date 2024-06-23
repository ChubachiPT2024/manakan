import React, { useRef } from "react";
import * as Excel from 'exceljs';

const Home = () => {
    const inputRef = useRef<HTMLInputElement>(null); // ファイル選択用のinput要素の参照
    const reportListRef = useRef<HTMLUListElement>(null); // 評価対象のレポートリストの参照

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files; // アップロードされたファイルリストを取得
        if (files) {
            const reportListFile = Array.from(files).find(file => file.name === 'reportlist.xlsx'); // reportlist.xlsxファイルを探す

            const otherFiles = Array.from(files).filter(file => file.name !== 'reportlist.xlsx'); // その他のファイルを取得

            if (reportListFile) {
                const arrayBuffer = await reportListFile.arrayBuffer();
                const workbook = new Excel.Workbook();
                await workbook.xlsx.load(arrayBuffer); // reportlist.xlsxファイルを読み込む

                const worksheet = workbook.getWorksheet(1); // 1番目のシートを取得
                const reportName = worksheet.getCell('C2').value; // C2セルの値を取得（レポート名）

                if (reportListRef.current) { // reportListRefがnullでないことを確認
                    const li = document.createElement("li");
                    li.textContent = reportName as string;
                    reportListRef.current.appendChild(li); // currentプロパティを通してappendChildを呼び出す
                }
            } else {
                console.error('reportlist.xlsxファイルが見つかりません');
            }

            if (otherFiles.length > 0) {
                // その他のファイルに対する処理をここに追加
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={handleChange}
                ref={inputRef}
                // @ts-ignore
                webkitdirectory="true"
            />
            <ul ref={reportListRef} id="show-files"></ul>
        </div>
    );
};

export default Home;
