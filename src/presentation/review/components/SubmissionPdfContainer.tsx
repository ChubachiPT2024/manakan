import React, { useCallback, useMemo, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.min.mjs`

interface SubmissionPdfContainerProps {
  files: string[]
  width: number
  pageHeight: number
}

const SubmissionPdfContainer: React.FC<SubmissionPdfContainerProps> = ({
  files,
  width,
  pageHeight,
}) => {
  const [numPages, setNumPages] = useState<number[]>([])

  const onDocumentLoadSuccess = useCallback((index: number, pdf: any) => {
    setNumPages((prevNumPages) => {
      const newNumPages = [...prevNumPages]
      newNumPages[index] = pdf.numPages
      return newNumPages
    })
  }, [])

  const memoizedFiles = useMemo(() => {
    return files.map((url, index) => ({ url, index }))
  }, [files])

  const memoizedOptions = useMemo(
    () => ({
      cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
    }),
    []
  )

  return (
    <>
      {memoizedFiles.map(({ url, index }) => (
        <div
          key={`pdf-${index}`}
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
                key={`page-${index}-${pageIndex + 1}`}
                pageNumber={pageIndex + 1}
                width={width}
                height={pageHeight}
              />
            ))}
          </Document>
        </div>
      ))}
    </>
  )
}

export default SubmissionPdfContainer