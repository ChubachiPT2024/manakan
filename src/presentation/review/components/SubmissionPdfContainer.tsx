import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { filetypeinfo } from 'magic-bytes.js'

pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.min.mjs`

interface SubmissionPdfContainerProps {
  files: { name: string; url: string }[]
  width: number
  pageHeight: number
}

const SubmissionPdfContainer: React.FC<SubmissionPdfContainerProps> = ({
  files,
  width,
  pageHeight,
}) => {
  const [numPages, setNumPages] = useState<number[]>([])
  const [fileTypes, setFileTypes] = useState<{ [key: string]: string }>({})

  const onDocumentLoadSuccess = useCallback((index: number, pdf: any) => {
    setNumPages((prevNumPages) => {
      const newNumPages = [...prevNumPages]
      newNumPages[index] = pdf.numPages
      return newNumPages
    })
  }, [])

  const memoizedFiles = useMemo(() => {
    return files.map((file, index) => ({
      fileName: file.name,
      url: file.url,
      index,
    }))
  }, [files])

  const memoizedOptions = useMemo(
    () => ({
      cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
    }),
    []
  )

  useEffect(() => {
    const fetchFileTypes = async () => {
      const newFileTypes: { [key: string]: string } = {}
      for (const file of files) {
        const response = await fetch(file.url)
        const buffer = new Uint8Array(await response.arrayBuffer())
        const fileType = filetypeinfo(buffer)
        const mimeType = fileType.length > 0 ? fileType[0].mime : 'Unknown'
        newFileTypes[file.url] = mimeType
      }
      setFileTypes(newFileTypes)
    }
    fetchFileTypes()
  }, [files])

  return (
    <>
      {memoizedFiles.map(({ fileName, url, index }) => (
        <div
          key={`pdf-${index}`}
          className="mb-5 overflow-y-auto"
          style={{ width, height: pageHeight }}
        >
          <div className="font-bold mb-2 p-2 border border-gray-300 rounded bg-gray-100">
            {fileName}
          </div>
          {fileTypes[url] === 'application/pdf' ? (
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
          ) : (
            <div className="border border-gray-300 p-4 rounded bg-gray-100">
              このファイルタイプの表示はサポートされていません。
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default SubmissionPdfContainer
