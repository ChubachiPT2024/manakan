import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { SubmissionFileGetCommand } from 'src/application/submissionFiles/submissionFileGetCommand'
import StudentHeader from './StudentHeader'
import SubmissionContainer from './SubmissionContainer'
import PdfContainer from './PdfContainer' // 新しいコンポーネントをインポート
// pdfjs-distからpdf.worker.min.jsファイルへのパスを設定
// pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.min.mjs`

interface Student {
  name: string
  numId: number
  userId: string
}

interface StudentSubmissionsProps {
  reportId: number
  student: Student
  files: string[]
  height: string
  width: number
  pageHeight: number
  submission: Submission
}

interface Submission {
  isSubmitted: boolean
  submissionDateTime?: string
  submissionCount?: number
}

const StudentSubmissions: React.FC<StudentSubmissionsProps> = ({
  reportId,
  student,
  files,
  height,
  width,
  pageHeight,
  submission,
}) => {
  // 未提出の場合は例外テキストを表示
  if (!submission.isSubmitted) {
    return (
      <StudentHeader student={student} style={{ height, width }}>
        <SubmissionContainer height={height}>
          <p className="border border-gray-300 p-4 rounded bg-gray-100">
            未提出の為、表示するデータがありません
          </p>
        </SubmissionContainer>
      </StudentHeader>
    )
  }

  const [pdfUrls, setPdfUrls] = useState<string[]>([])

  useEffect(() => {
    const fetchPdfFiles = async () => {
      const pdfDataPromises = files.map(async (file) => {
        const response = await window.electronAPI.getSubmissionFileAsync(
          new SubmissionFileGetCommand(reportId, student.numId, file)
        )
        const blob = new Blob([response.content], { type: 'application/pdf' })
        return URL.createObjectURL(blob)
      })

      const pdfUrlsArray = await Promise.all(pdfDataPromises)
      setPdfUrls(pdfUrlsArray)

      return () => {
        // クリーンアップ: URLオブジェクトを解放
        pdfUrlsArray.forEach(URL.revokeObjectURL)
      }
    }

    fetchPdfFiles()
  }, [reportId, student.numId, files])

  return (
    <StudentHeader student={student} style={{ height, width }}>
      <SubmissionContainer height={height}>
        <PdfContainer files={pdfUrls} width={width} pageHeight={pageHeight} />
      </SubmissionContainer>
    </StudentHeader>
  )
}

export default StudentSubmissions
