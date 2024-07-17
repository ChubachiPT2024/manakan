import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { SubmissionFileGetCommand } from 'src/application/submissionFiles/submissionFileGetCommand'
import StudentHeader from './StudentHeader'
import SubmissionContainer from './SubmissionContainer'
// pdfjs-distからpdf.worker.min.jsファイルへのパスを設定
pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.min.mjs`

interface Student {
  name: string
  numId: number
  userId: string
}

interface PdfViewProps {
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

const PdfView: React.FC<PdfViewProps> = ({
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
  const [numPages, setNumPages] = useState<number[]>([])

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

  const onDocumentLoadSuccess = useCallback((index: number, pdf: any) => {
    setNumPages((prevNumPages) => {
      const newNumPages = [...prevNumPages]
      newNumPages[index] = pdf.numPages
      return newNumPages
    })
  }, [])

  const memoizedFiles = useMemo(() => {
    return pdfUrls.map((url, index) => ({ url, index }))
  }, [pdfUrls])

  const memoizedOptions = useMemo(
    () => ({
      // pdfjs のフォントエラーを回避する為に外部サイトを指定
      cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
    }),
    []
  )

  return (
    <StudentHeader student={student} style={{ height, width }}>
      <SubmissionContainer height={height}>
        {memoizedFiles.map(({ url, index }) => (
          <div
            key={`${student.userId}-${index}`}
            className="mb-5 overflow-y-auto"
            style={{ width, height: pageHeight }}
          >
            <Document
              file={url}
              onLoadSuccess={(pdf) => onDocumentLoadSuccess(index, pdf)}
              options={memoizedOptions}
            >
              {Array.from(new Array(numPages[index] || 0), (_, pageIndex) => (
                <Page
                  key={`${student.name}-page-${index}-${pageIndex + 1}`}
                  pageNumber={pageIndex + 1}
                  width={width}
                  height={pageHeight}
                />
              ))}
            </Document>
          </div>
        ))}
      </SubmissionContainer>
    </StudentHeader>
  )
}

export default PdfView
