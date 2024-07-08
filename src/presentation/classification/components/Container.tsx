import { ReactNode, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import { GradeColumn } from './GradeColumn'
import { RankRow } from './RankRow'
import { SubmissionCard } from './SubmissionCard'
import { SideMenu } from './SideMenu'
import { SelectedButton } from './SelectedButton'

type Task = {
  name: string
  status: string
  rowLevel: string
}

const Container = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: 'ハリー',
      status: 'todo',
      rowLevel: 'A',
    },
    {
      name: 'ロン',
      status: 'todo',
      rowLevel: 'B',
    },
  ])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    console.log(over?.id)
    if (active.id !== over?.id && over?.id) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.name === active.id) {
            const [newStatus, newRowLevel] = (over.id as string).split('-')
            return {
              ...task,
              status: newStatus,
              rowLevel: newStatus === 'notStarted' ? 'A' : newRowLevel,
            }
          }
          return task
        })
      )
    }
  }

  const rowLabels = ['A', 'B', 'C']
  const columns = [
    { id: 'notStarted', title: 'Not Started', singleRow: true },
    { id: 'todo', title: 'To Do', singleRow: false },
    { id: 'inProgress', title: 'In Progress', singleRow: false },
    { id: 'done', title: 'Done', singleRow: false },
  ]
  const submissions: Submission[] = [
    {
      id: 1,
      studentName: 'ハリー',
      status: 'todo',
      gradeRowLevel: null,
      isChecked: false,
    },
    {
      id: 2,
      studentName: 'ロン',
      status: 'todo',
      gradeRowLevel: null,
      isChecked: true,
    },
  ]

  const isCheckedInSubmissions = !submissions.some(
    (submission) => submission.isChecked
  )
  const [isDisabled, setIsDisabled] = useState<boolean>(isCheckedInSubmissions)
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen">
          {/* sidemenu */}
          <SideMenu submissions={submissions} />
          {/* corse title & select button*/}
          <div className="pt-3 pl-3 w-screen">
            <div className="pb-7 flex justify-between">
              <h1 className="text-xl">コース名</h1>
              <div>
                <SelectedButton
                  styles="bg-sky-400"
                  title="複数開く"
                  isDisabled={isDisabled}
                  onClick={() => {}}
                />
                <SelectedButton
                  styles="bg-red-400"
                  title="選択解除"
                  isDisabled={isDisabled}
                  onClick={() => {}}
                />
              </div>
            </div>
            {/* canban */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {columns.map((column) => (
                <GradeColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                >
                  {column.singleRow ? (
                    <RankRow
                      status={column.id}
                      key={`${column.id}-A`}
                      id={`${column.id}-A`}
                      title={column.title}
                    >
                      {/* {submissions
                    .filter((submission) => submission.status === column.id)
                    .map((task, idx) => (
                      <SubmissionCard
                        key={submission.id}
                        id={submission.id}
                        status={task.status}
                      >
                        <div>{task.name}</div>
                        <div>{'rank' + (idx + 1)}</div>
                      </SubmissionCard>
                    ))} */}
                      <div>name</div>
                    </RankRow>
                  ) : (
                    rowLabels.map((rowLabel) => (
                      <RankRow
                        status={column.id}
                        key={`${column.id}-${rowLabel}`}
                        id={`${column.id}-${rowLabel}`}
                        title={column.title}
                      >
                        {tasks
                          .filter(
                            (task) =>
                              task.status === column.id &&
                              task.rowLevel === rowLabel
                          )
                          .map((task, idx) => (
                            // <SubmissionCard
                            //   key={task.name}
                            //   id={task.name}
                            //   status={task.status}
                            // >
                            //   <div>{task.name}</div>
                            //   <div>{'rank' + (idx + 1)}</div>
                            // </SubmissionCard>
                            <div>name</div>
                          ))}
                      </RankRow>
                    ))
                  )}
                </GradeColumn>
              ))}
            </div>
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default Container
