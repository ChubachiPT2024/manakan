// presentation/import/components/PdfView.tsx

import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf'

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

  // ここは API におきかえる
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

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">{studentName}</h2>
      <div className="inline-block overflow-y-auto m-2" style={{ height }}>
        {pdfDatas.map((data, index) => (
          <div
            key={index}
            className="mb-5 bg-red-500"
            style={{ width, height: pageHeight }}
          >
            <Document file={{ data }}>
              {Array.from(new Array(1), (_, pageIndex) => (
                <Page
                  key={`${studentName}-page-${pageIndex + 1}`}
                  pageNumber={pageIndex + 1}
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
