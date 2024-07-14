import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { SubmissionFileGetCommand } from 'src/application/submissionFiles/submissionFileGetCommand'
import { SubmissionFileGetResult } from 'src/application/submissionFiles/submissionFileGetResult'

// pdfjs-distからpdf.worker.min.jsファイルへのパスを設定
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`

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
}

// 以下の Props を学籍番号を受けとる様に修正し、useEffect内で API 経由でPDFファイルを取得するように修正予定
const PdfView: React.FC<PdfViewProps> = ({
  reportId,
  student,
  files,
  height,
  width,
  pageHeight,
}) => {
  const [pdfDatas, setPdfDatas] = useState<Uint8Array[]>([])
  const [numPages, setNumPages] = useState<number[]>([])

  useEffect(() => {
    const fetchPdfFiles = async () => {
      const pdfDataPromises = files.map(async (file) => {
        const response = await window.electronAPI.getSubmissionFileAsync(
          new SubmissionFileGetCommand(reportId, student.numId, file)
        )
        console.log(`File: ${file}, Data Length: ${response.content.length}`)
        return new Uint8Array(response.content)
      })

      const pdfDataArray = await Promise.all(pdfDataPromises)
      setPdfDatas(pdfDataArray)
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
    return pdfDatas.map((data, index) => ({ file: { data }, index }))
  }, [pdfDatas])

  return (
    <div className="text-center" style={{ height, width }}>
      <h2 className="text-2xl font-bold">{student.name}</h2>
      <div className="overflow-y-auto" style={{ height }}>
        {memoizedFiles.map(({ file, index }) => (
          <div
            key={index}
            className="mb-5 overflow-y-auto"
            style={{ width, height: pageHeight }}
          >
            <Document
              file={file}
              onLoadSuccess={(pdf) => onDocumentLoadSuccess(index, pdf)}
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
      </div>
    </div>
  )
}

export default PdfView
