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

export type ReportContextType = {
    report: Report | null;
    setReport: (foler: Report) => void;
};

export type ReportAction =
    | { type: 'SET_REPORT'; report: Report };
