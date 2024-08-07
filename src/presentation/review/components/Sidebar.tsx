import { useEffect, useState } from 'react'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'
import StudentSelectionRadioGroup from 'src/presentation/review/components/StudentSelectionRadioGroup'
import ClassificationSelect from 'src/presentation/review/components/ClassificationSelect'
import MemoTextarea from 'src/presentation/review/components/MemoTextarea'
import FeedbackTextarea from 'src/presentation/review/components/FeedbackTextarea'
import TextField from '@mui/material/TextField'

// サイドバーのProps
interface IPropsSidebar {
  reportId: string
  submissionSummaries: SubmissionSummaryData[]
  initialStudent: SubmissionSummaryStudentData
}

// reviewページサイドバーコンポーネント
const Sidebar: React.FC<IPropsSidebar> = ({
  reportId,
  submissionSummaries,
  initialStudent,
}) => {
  // 選択された学生
  const [selectedStudent, setSelectedStudent] =
    useState<SubmissionSummaryStudentData>(initialStudent)

  // レンダリングごとに、最初の学生を選択状態にする
  useEffect(() => {
    setSelectedStudent(initialStudent)
  }, [initialStudent.numId])

  return (
    <div className="w-96 p-4 m-2 border-l-4 flex flex-col justify-start overflow-y-auto">
      {/* 学生選択のラジオボタン */}
      <StudentSelectionRadioGroup
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      {/* 提出者情報 */}
      <div className="flex flex-col m-1">
        <h2 className="text-xl font-bold mb-2">提出者情報</h2>
        <ul className="pl-3">
          <li className="mb-2">学生名：{selectedStudent.name}</li>
          <li className="mb-2">学籍番号：{selectedStudent.numId}</li>
          <li className="mb-2">
            提出日時：
            {
              submissionSummaries.find(
                (summary) => summary.student.numId === selectedStudent.numId
              )?.submission.submissionDateTime
            }
          </li>
        </ul>
      </div>

      {/* 分類セレクトボタン */}
      <ClassificationSelect
        reportId={reportId}
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
      />

      {/* 点数 */}
      <div className="m-1">
        <h2 className="text-xl font-bold mb-2">点数</h2>
        <div className="pl-3">
          <TextField
            id="score"
            type="text"
            disabled
            value={
              submissionSummaries.find(
                (summary: SubmissionSummaryData) =>
                  summary.student.numId === selectedStudent.numId
              )?.assessment.score ?? '--'
            }
            variant="outlined"
            fullWidth
            inputProps={{
              'aria-label': 'Without label',
            }}
          />
        </div>
      </div>

      {/* メモ */}
      <MemoTextarea
        reportId={reportId}
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
      />

      {/* フィードバック */}
      <FeedbackTextarea
        reportId={reportId}
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
      />
    </div>
  )
}

export default Sidebar
