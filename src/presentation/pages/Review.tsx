// ReviewPage.tsx
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import PdfView from '../review/components/PdfView'
import { SubmissionSummariesGetCommand } from 'src/application/submissionSummaries/submissionSummariesGetCommand'

const Review = () => {
  const location = useLocation()

  // 提出物サマリーを取得
  const { submissionSummaries, error, isLoading } = useSubmissionSummaries(
    reportId,
    studentNumIds
  )

  if (isLoading) return <Loading />
  if (error) return <Error />

  return (
    <>
      <div className="h-full overflow-hidden">
        {/* navbar */}
        <div className="z-50 bg-white fixed top-0 flex items-center w-full p-2 border-b shadow-sm">
          {/* 戻るボタン */}
          <BackButton href={`/classification/${reportId}`} />
        </div>

        {/* メインコンテンツ */}
        <div className="flex mt-14" style={{ height: 'calc(100vh - 4rem)' }}>
          {/* PDF表示 */}
          <div className="w-10/12 pl-8 pt-5 overflow-x-auto whitespace-nowrap flex overflow-y-hidden">
            {submissionSummaries.map((summary, index) => (
              <PdfView
                key={index}
                reportId={Number(reportId)}
                student={summary.student}
                files={summary.files}
                height="calc(100vh - 4rem)"
                width={900}
                pageHeight={1000}
              />
            ))}
          </div>

          {/* sidebar */}
          <div className="w-96 p-4 m-2 border-l-4 flex flex-col justify-start overflow-y-auto">
            {/* 学生選択のラジオボタン */}
            <div className="flex flex-col m-1">
              <FormControl>
                <h2 className="text-xl font-bold mb-1">学生選択</h2>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue="学生1"
                  name="radio-buttons-group"
                >
                  {students.map((student, index) => (
                    <FormControlLabel
                      key={index}
                      value={student.name}
                      control={<Radio />}
                      label={student.name}
                      sx={{ m: '0' }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            {/* 提出者情報 */}
            <div className="flex flex-col m-1">
              <h2 className="text-xl font-bold mb-2">提出者情報</h2>
              <ul className="pl-3">
                <li className="mb-2">学生名：学生1</li>
                <li className="mb-2">学籍番号：0000000</li>
                <li className="mb-2">提出日時：2021/09/01 12:00</li>
              </ul>
            </div>

            {/* 分類 セレクトボタン*/}
            <div className="m-1">
              <h2 className="text-xl font-bold mb-2">分類</h2>
              <div className="pl-3">
                <FormControl fullWidth>
                  <Select
                    id="select"
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={grade.toString()}
                    onChange={handleChange}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
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
                  value={100}
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

            {/* メモ テキストエリア*/}
            <div className="m-1">
              <h2 className="text-xl font-bold mb-2">メモ</h2>
              <div className="pl-3">
                <TextField
                  id="memo"
                  multiline
                  rows={4}
                  placeholder="評価の為の一時的なメモを記述して下さい。このデータはmanabaには反映されません。"
                  sx={{ m: '0' }}
                  fullWidth
                />
              </div>
            </div>

            {/* フィードバック テキストエリア*/}
            <div className="m-1">
              <h2 className="text-xl font-bold mb-2">フィードバック</h2>
              <div className="pl-3">
                <TextField
                  id="feedback"
                  multiline
                  rows={4}
                  placeholder="学生に伝える為のフィードバックを記述して下さい。"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review
