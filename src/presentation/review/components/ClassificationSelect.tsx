import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'
import { AssessmentGrade } from 'src/domain/models/assessments/assessmentGrade'
import { AssessmentRank } from 'src/domain/models/assessments/assessmentRank'
import { AssessmentClassifyCommand } from 'src/application/assessments/assessmentClassifyCommand'

// 分類選択コンポーネントのProps
interface ClassificationSelectProps {
  reportId: string
  submissionSummaries: SubmissionSummaryData[]
  selectedStudent: SubmissionSummaryStudentData
}

// 評点選択コンポーネント
const ClassificationSelect: React.FC<ClassificationSelectProps> = ({
  reportId,
  submissionSummaries,
  selectedStudent,
}) => {
  // 選択肢
  const grades: AssessmentGrade[] = [5, 4, 3, 2, 1, 0]
  const ranks: AssessmentRank[] = ['++', '+', '+-', '-', '--']
  const options = grades.flatMap((grade) => {
    if (grade === 0) return [`0`]
    return ranks.map((rank) => `${grade}${rank}`)
  })

  // 選択された学生の評点
  const initialSelectedGrade =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.grade || ''

  // 選択された学生の評点内の位置
  const initialSelectedRank =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.rank || ''

  // 選択された学生の点数
  const initialScore =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.score || 0

  // 評点の値を状態として管理
  const [selectedGradeRank, setSelectedGradeRank] = useState<string>(
    initialSelectedGrade + initialSelectedRank
  )

  // 点数の値を状態として管理
  const [score, setScore] = useState<number>(initialScore)

  // selectedStudent が変わるたびにGradeとRankとScoreの値を更新
  useEffect(() => {
    const newGrade =
      submissionSummaries.find(
        (summary: SubmissionSummaryData) =>
          summary.student.numId === selectedStudent.numId
      )?.assessment.grade || ''
    const newRank =
      submissionSummaries.find(
        (summary: SubmissionSummaryData) =>
          summary.student.numId === selectedStudent.numId
      )?.assessment.rank || ''
    const newScore =
      submissionSummaries.find(
        (summary: SubmissionSummaryData) =>
          summary.student.numId === selectedStudent.numId
      )?.assessment.score || 0

    setSelectedGradeRank(newGrade + newRank)
    setScore(newScore)
  }, [selectedStudent])

  // 評点が変更されたら、評点を更新する
  const handleChange = async (event: SelectChangeEvent<string>) => {
    const newSelectedGradeRank = event.target.value as string
    setSelectedGradeRank(newSelectedGradeRank)
    setScore(
      getScore(Number(newSelectedGradeRank[0]), newSelectedGradeRank.slice(1))
    )
    try {
      await window.electronAPI.classifyAssessmentAsync(
        new AssessmentClassifyCommand(
          Number(reportId),
          selectedStudent.numId,
          Number(selectedGradeRank[0]) as AssessmentGrade,
          selectedGradeRank.slice(1) as AssessmentRank
        )
      )
    } catch (e: Error | any) {
      console.log(e)
    }
  }

  // スコアを計算する関数 レンダリング用にドメイン層にあったものをコピー
  const getScore = (grade: number, rank: string): number => {
    if (grade === 0) {
      return 0
    }

    const rankIndex = ['--', '-', '+-', '+', '++'].indexOf(rank)

    switch (grade) {
      case 1:
        return 10 + 10 * rankIndex
      case 2:
        return 60 + 2 * rankIndex
      case 3:
        return 70 + 2 * rankIndex
      case 4:
        return 80 + 2 * rankIndex
      case 5:
        // '++' のとき 100 点になるようにする
        return Math.round(90 + 2.5 * rankIndex)
    }
  }

  return (
    <>
      {/* 評点セレクト */}
      <div className="m-1">
        <h2 className="text-xl font-bold mb-2">分類</h2>
        <div className="pl-3">
          <FormControl fullWidth>
            <Select
              id="select"
              inputProps={{ 'aria-label': 'Without label' }}
              value={selectedGradeRank}
              displayEmpty
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                評点を選択して下さい
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* 点数 */}
      <div className="m-1">
        <h2 className="text-xl font-bold mb-2">点数</h2>
        <div className="pl-3">
          <TextField
            id="score"
            type="number"
            disabled
            value={score}
            variant="outlined"
            fullWidth
            inputProps={{
              'aria-label': 'Without label',
              min: 0,
              max: 100,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ClassificationSelect
