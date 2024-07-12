import React, { useEffect, useState, useMemo } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// pdfjs-distからpdf.worker.min.jsファイルへのパスを設定
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`

interface PdfViewProps {
  studentName: string
  pdfPaths: string[]
  height: string
  width: number
  pageHeight: number
}

const PdfView: React.FC<PdfViewProps> = ({
  studentName,
  pdfPaths,
  height,
  width,
  pageHeight,
}) => {
  const [pdfDatas, setPdfDatas] = useState<Uint8Array[]>([])
  const [numPages, setNumPages] = useState<number[]>([])

  useEffect(() => {
    const fetchPdfFiles = async () => {
      const pdfDataPromises = pdfPaths.map(async (path) => {
        const response = await fetch(path)
        const arrayBuffer = await response.arrayBuffer()
        return new Uint8Array(arrayBuffer)
      })

      const pdfDataArray = await Promise.all(pdfDataPromises)
      setPdfDatas(pdfDataArray)
    }

    fetchPdfFiles()
  }, [pdfPaths])

  const onDocumentLoadSuccess = (index: number) => (pdf: any) => {
    setNumPages((prevNumPages) => {
      const newNumPages = [...prevNumPages]
      newNumPages[index] = pdf.numPages
      return newNumPages
    })
  }

  const memoizedFiles = useMemo(() => {
    return pdfDatas.map((data) => ({ data }))
  }, [pdfDatas])

  return (
    <div className="text-center" style={{ height, width }}>
      <h2 className="text-2xl font-bold">{studentName}</h2>
      <div className="overflow-y-auto" style={{ height }}>
        {memoizedFiles.map((file, index) => (
          <div
            key={index}
            className="mb-5 overflow-y-auto"
            style={{ width, height: pageHeight }}
          >
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess(index)}>
              {Array.from(new Array(numPages[index] || 0), (_, pageIndex) => (
                <Page
                  key={`${studentName}-page-${index}-${pageIndex + 1}`}
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
