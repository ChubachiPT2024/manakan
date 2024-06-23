import React, { useRef, useState } from "react";
import * as Excel from 'exceljs'

const Home = () => {
    const inputRef = useRef<HTMLInputElement>(null);


    const showFilesRef = useRef<HTMLUListElement>(null);
    // 採点対象のレポートリスト
    const [inputReportList, setInputReportList] = useState<String[] | null>(null);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const fileList = event.target.files;
        const showFiles = showFilesRef.current;

        console.log(fileList);

        // reportlist.xlsxファイルがあれば読み込む
        // Todo: reportlist.xlsxというファイル名を固定で取得しているのを
        // 別の場合も想定されないか確認する
        // ExcelファイルのC2セルの値を絶対参照しているのも、移植性がないので
        // あとで修正する
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file.name === 'reportlist.xlsx') {
                const arrayBuffer = await file.arrayBuffer()
                const workbook = new Excel.Workbook()
                await workbook.xlsx.load(arrayBuffer)

                workbook.worksheets.forEach((worksheet) => {
                    console.log(worksheet.getCell('C2').value)
                })
            }
        }

        // ファイルリストを取得　あとで削除
        if (showFiles) {
            for (let i = 0; i < fileList.length; i++) {
                const li = document.createElement("li");
                li.textContent = fileList[i].webkitRelativePath;
                showFiles.appendChild(li);
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
            {/* ファイル名を表示 あとで削除 */}
            <ul ref={showFilesRef} id="show-files"></ul>
            <hr />
            {/* レポートリスト */}
            <ul>
                {inputReportList?.map((report, index) => (
                    <li key={index}>{report}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
