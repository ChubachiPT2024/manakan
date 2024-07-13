import { useEffect, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SubmissionCard } from '../classification/components/SubmissionCard'
import { SideMenu } from '../classification/components/SideMenu'
import { SelectedButton } from '../classification/components/SelectedButton'
import { GradeColumn } from '../classification/components/GradeColumn'
import { RankRow } from '../classification/components/RankRow'
import { useNavigate, useParams } from 'react-router-dom'
import { ReportListGetCommand } from 'src/application/reportLists/reportListGetCommand'
import { Report } from '../types/report'
import { AssessmentRank } from '../types/submission'

const Classification = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [process, setProcess] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [draggingSubmissionId, setDraggingSubmissionId] = useState(null)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([])
  const [report, setReport] = useState<Report | null>(null)
  const [assessmentGrades, setAssessmentGrades] = useState<
    {
      id: number
      submissionNum: number
    }[]
  >([
    { id: 1, submissionNum: 0 },
    { id: 2, submissionNum: 0 },
    { id: 3, submissionNum: 0 },
    { id: 4, submissionNum: 0 },
    { id: 5, submissionNum: 0 },
  ])

  const assessmentRanks = ['++', '+', '+-', '-', '--']

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingSubmissionId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingSubmissionId(null)
    const { active, over } = event

    let grade: number | null = null
    let rank: AssessmentRank | null = null

    if (over && active.id !== over?.id) {
      const newItems = report.items.map((item) => {
        if (item.student.id === active.id) {
          if (over.id !== 'has-not-grade') {
            const [newGrade, newRank] = (over.id as string).split(':')
            grade = Number(newGrade)
            rank = newRank as AssessmentRank
          }

          return {
            ...item,
            assessment: {
              grade: grade,
              rank: rank,
            },
          }
        }

        return item
      })

      setReport({
        ...report,
        items: newItems,
      })
    }
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newReport = report.items.map((item) => {
      if (item.student.id === id) {
        return {
          ...item,
          isChecked: event.target.checked,
        }
      }

      return item
    })

    setReport({
      ...report,
      items: newReport,
    })
  }

  const handleCheckboxClear = () => {
    const newReport = report.items.map((item) => {
      return {
        ...item,
        isChecked: false,
      }
    })

    setReport({
      ...report,
      items: newReport,
    })
  }

  useEffect(() => {
    window.electronAPI
      .getReportListAsync(new ReportListGetCommand(Number(id)))
      .then((res) => {
        const newItems = res.reportListData.items.map((item) => {
          return {
            student: {
              id: item.student.userId,
              name: item.student.name,
            },
            assessment: {
              grade: item.assessment.grade,
              rank: item.assessment.rank,
            },
            isChecked: false,
          }
        })
        setReport({
          id: res.reportListData.courseId,
          title: res.reportListData.courseName,
          items: newItems,
        })
        setProcess('success')
      })
      .catch((err) => {
        setProcess('error')
      })
      .finally(() => {
        setProcess('success')
      })
  }, [id])

  useEffect(() => {
    if (!report) return
    setAssessmentGrades(
      assessmentGrades.map((grade) => ({
        ...grade,
        submissionNum: report.items.filter(
          (item) => item.assessment.grade === grade.id
        ).length,
      }))
    )
  }, [report])

  useEffect(() => {
    if (report) {
      const checkedReportIds = report.items
        .filter((item) => item.isChecked)
        .map((item) => item.student.id)
      setSelectedStudentIds(checkedReportIds)
    }
  }, [report])

  // BUG:https://github.com/clauderic/dnd-kit/issues/591
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  )

  if (process === 'loading') {
    return (
      <>
        <div
          className="flex justify-center items-center h-screen"
          aria-label="読み込み中"
        >
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </>
    )
  }

  if (process === 'error') {
    return (
      <>
        <div
          className="flex justify-center items-center h-screen"
          aria-label="読み込み中"
        >
          <div className="text-center">
            <h1 className="text-2xl mb-5">エラーが発生しました</h1>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/')}
            >
              ホームへ戻る
            </button>
          </div>
        </div>
      </>
    )
  }

  const draggingItem = report.items.find(
    (item) => item.student.id === draggingSubmissionId
  )
  const notHasAssessmentItem = report.items
    .filter((item) => item.student.id !== draggingSubmissionId)
    .filter((item) => item.assessment.grade == null)
  const hasAssessmentItem = report.items
    .filter((item) => item.student.id !== draggingSubmissionId)
    .filter(
      (item) => item.assessment.grade != null && item.assessment.rank != null
    )

  const handleOpenSelected = () => {
    const selectedSubmissions = report.items.filter((item) => item.isChecked)
    navigate('/review', {
      state: { reportId: id, studentNumIds: selectedStudentIds },
    })
  }

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {draggingSubmissionId && (
          <DragOverlay>
            <SubmissionCard
              key={draggingSubmissionId}
              id={draggingSubmissionId}
              item={draggingItem}
              onChange={(e) => handleCheckboxChange(e, draggingSubmissionId)}
            />
          </DragOverlay>
        )}
        <div className="flex h-screen">
          <SideMenu isDisabled={notHasAssessmentItem.length == 0}>
            {notHasAssessmentItem.map((item, idx) => {
              return (
                <SubmissionCard
                  key={idx}
                  id={item.student.id}
                  item={item}
                  onChange={(e) => handleCheckboxChange(e, item.student.id)}
                />
              )
            })}
          </SideMenu>
          <div className="flex-1 overflow-hidden">
            <div className="pt-3 pl-3 h-full flex flex-col">
              <div className="pb-7 flex justify-between">
                <h1 className="text-2xl">{report.title}</h1>
                <div>
                  <SelectedButton
                    styles="bg-sky-400"
                    title="複数開く"
                    isDisabled={selectedStudentIds.length === 0}
                    onClick={handleOpenSelected}
                  />
                  <SelectedButton
                    styles="bg-red-400"
                    title="選択解除"
                    isDisabled={selectedStudentIds.length === 0}
                    onClick={handleCheckboxClear}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex h-full">
                  {assessmentGrades.map((grade) => (
                    <GradeColumn
                      key={grade.id}
                      title={grade.id.toString()}
                      submissionNum={grade.submissionNum}
                    >
                      {assessmentRanks.map((rank, index) => (
                        <RankRow
                          key={index}
                          id={`${grade.id}:${rank}`}
                          title={rank}
                        >
                          {hasAssessmentItem
                            .filter(
                              (item) =>
                                `${item.assessment.grade}:${item.assessment.rank}` ===
                                `${grade.id}:${rank}`
                            )
                            .map((item, index) => (
                              <SubmissionCard
                                key={index}
                                id={item.student.id}
                                item={item}
                                onChange={(e) =>
                                  handleCheckboxChange(e, item.student.id)
                                }
                              />
                            ))}
                        </RankRow>
                      ))}
                    </GradeColumn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default Classification
