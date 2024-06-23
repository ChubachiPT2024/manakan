import { useContext } from "react";
import { Student } from "../types";
import { ReportContext } from "../context/ReportContext";

// ページ名称については検討の余地あり
const Evaluation = () => {

    // ここで、ReportContextから取得した値を使う
    const { report } = useContext(ReportContext);

    return (
        <div>
            <h1>Evaluation Page</h1>
            <p>評価対象のフォルダがインポートされたら、遷移されてくるページ</p>

            <h2>コース名: {report.course}</h2>
            <h3>学生:</h3>
            {report.students.map((student: Student) => {
                return (
                    <div key={student.id}>
                        <h4>{student.userId}</h4>
                        <p>学籍番号: {student.numId}</p>
                        <p>提出物:</p>
                        {student.files?.map((file: File) => {
                            return (
                                <div key={file.name}>
                                    <p>{file.name}</p>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Evaluation;