import React, { useState } from 'react';
import ExcelJS from 'exceljs';


const Home = () => {
    const [excelData, setExcelData] = useState<any[]>([]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = event.target.files?.[0];
        if (file) {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(file.name);
            const worksheet = workbook.worksheets[0];
            const data: any[] = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) { // Skip header row
                    const rowData: any = {};
                    row.eachCell((cell, colNumber) => {
                        rowData[`column${colNumber}`] = cell.value;
                    });
                    data.push(rowData);
                }
            });
            setExcelData(data);
        }
    };

    return (
        <>
            <input type="file" onChange={handleFileUpload} />
            {excelData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(excelData[0]).map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Home;