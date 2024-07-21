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
import { useNavigate, useParams } from 'react-router-dom'
import { SubmissionCard } from '../classification/components/SubmissionCard'
import { SideMenu } from '../classification/components/SideMenu'
import { SelectedButton } from '../classification/components/SelectedButton'
import { GradeColumn } from '../classification/components/GradeColumn'
import { RankRow } from '../classification/components/RankRow'
import { ReportListGetCommand } from 'src/application/reportLists/reportListGetCommand'
import { Report } from '../types/report'
import {
  AssessmentGradeOfFrontend,
  AssessmentRankOfFrontend,
} from '../types/assessment'
import { AssessmentClassifyCommand } from 'src/application/assessments/assessmentClassifyCommand'
import { BackButton } from '../common/button/BackButton'
import Spinner from '../common/isLoading/Spinner'
import Error from '../common/error/Error'
import { UniqueIdentifier } from '@dnd-kit/core'

const Classification = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [process, setProcess] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [draggingSubmissionId, setDraggingSubmissionId] = useState(null)
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([])
  const [report, setReport] = useState<Report | null>(null)
  const [courseName, setCourseName] = useState<string>('')
  const [assessmentGrades, setAssessmentGrades] = useState<
    {
      id: number
      submissionNum: number
    }[]
  >([
    { id: 5, submissionNum: 0 },
    { id: 4, submissionNum: 0 },
    { id: 3, submissionNum: 0 },
    { id: 2, submissionNum: 0 },
    { id: 1, submissionNum: 0 },
    { id: 0, submissionNum: 0 },
  ])

  const assessmentRanks = ['++', '+', '+-', '-', '--']

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingSubmissionId(event.active.id)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setDraggingSubmissionId(null)

    const { active, over } = event
    if (!over || active.id === over?.id) {
      return
    }

    const newGradeAndRank = getNewGradeAndRank(over.id)

    const itemIndex = report.items.findIndex(
      (x) => x.student.numId === active.id
    )
    const newItem = {
      ...report.items[itemIndex],
      assessment: {
        grade: newGradeAndRank.grade,
        rank: newGradeAndRank.rank,
      },
    }

    await updateAssessment(
      report.id,
      newItem.student.numId,
      newItem.assessment.grade,
      newItem.assessment.rank
    )

    setReport({
      ...report,
      items: report.items.with(itemIndex, newItem),
    })
  }

  const getNewGradeAndRank = (
    overId: UniqueIdentifier
  ): { grade?: AssessmentGradeOfFrontend; rank?: AssessmentRankOfFrontend } => {
    if (overId === 'has-not-grade') {
      return {
        grade: undefined,
        rank: undefined,
      }
    }

    let [newGrade, newRank] = (overId as string).split(':')
    newRank = newRank === '' ? undefined : newRank
    let grade = Number(newGrade) as AssessmentGradeOfFrontend
    let rank = newRank as AssessmentRankOfFrontend

    return {
      grade: grade,
      rank: rank,
    }
  }

  const updateAssessment = async (
    reportId: number,
    studentId: number,
    grade: AssessmentGradeOfFrontend,
    rank?: AssessmentRankOfFrontend
  ) => {
    await window.electronAPI
      .classifyAssessmentAsync(
        new AssessmentClassifyCommand(reportId, studentId, grade, rank)
      )
      .catch((e: any) => {
        console.log(e)
      })
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newReport = report.items.map((item) => {
      if (item.student.numId === id) {
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
              numId: item.student.numId,
              name: item.student.name,
            },
            submission: {
              isSubmitted: item.submission.isSubmitted,
            },
            assessment: {
              grade: item.assessment.grade,
              rank: item.assessment.rank,
            },
            isChecked: false,
          }
        })
        setReport({
          id: res.reportListData.reportId,
          title: res.reportListData.reportTitle,
          items: newItems,
        })
        setCourseName(res.reportListData.courseName)
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
        .map((item) => item.student.numId)
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
    return <Spinner />
  }

  if (process === 'error') {
    return <Error />
  }

  const draggingItem = report.items.find(
    (item) => item.student.numId === draggingSubmissionId
  )
  const notHasAssessmentItem = report.items
    .filter((item) => item.student.numId !== draggingSubmissionId)
    .filter((item) => item.assessment.grade === undefined)
  const hasAssessmentItem = report.items
    .filter((item) => item.student.numId !== draggingSubmissionId)
    .filter((item) => item.assessment.grade !== undefined)

  const handleOpenSelected = () => {
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
        <div className="flex w-full h-full">
          <SideMenu enabled={notHasAssessmentItem.length === 0} reportId={id}>
            {notHasAssessmentItem.map((item, idx) => {
              return (
                <SubmissionCard
                  key={idx}
                  id={item.student.numId}
                  item={item}
                  onChange={(e) => handleCheckboxChange(e, item.student.numId)}
                />
              )
            })}
          </SideMenu>
          <div className="flex overflow-hidden">
            <div className="flex flex-col max-w-full max-h-full pt-3 pl-3">
              <div className="flex justify-between">
                <div className="flex justify-between">
                  <BackButton href={`/`} />
                  <div>
                    {/* courseName */}
                    <h1 className="flex ml-2 text-xl">
                      <p className="mr-2">コース名</p>
                      {courseName}
                    </h1>
                    {/* courseName */}
                    <h2 className="flex ml-2 text-base">
                      <p className="mr-2">レポート名</p>
                      {report.title}
                    </h2>
                  </div>
                </div>
                <div className="mt-2">
                  <SelectedButton
                    styles="bg-sky-400"
                    title="開く"
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
              <div className="grow overflow-x-scroll">
                <div className="flex h-full">
                  {assessmentGrades.map((grade) => (
                    <GradeColumn
                      key={grade.id}
                      title={grade.id.toString()}
                      submissionNum={grade.submissionNum}
                    >
                      {grade.id !== 0 ? (
                        assessmentRanks.map((rank, index) => (
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
                                  id={item.student.numId}
                                  item={item}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, item.student.numId)
                                  }
                                />
                              ))}
                          </RankRow>
                        ))
                      ) : (
                        <RankRow key={grade.id} id={`${grade.id}:`} title={''}>
                          {hasAssessmentItem
                            .filter(
                              (item) =>
                                `${item.assessment.grade}:` === `${grade.id}:`
                            )
                            .map((item, index) => (
                              <SubmissionCard
                                key={index}
                                id={item.student.numId}
                                item={item}
                                onChange={(e) =>
                                  handleCheckboxChange(e, item.student.numId)
                                }
                              />
                            ))}
                        </RankRow>
                      )}
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
