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
  //handleDragEndの中身持って来る
  //debug
  //これをベースにするなら、tasksの中身を変える＆＆UIを変える
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
    },
    {
      id: 2,
      studentName: 'ロン',
      status: 'todo',
      gradeRowLevel: null,
    },
  ]
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {/* sidemenu */}
        <div className="flex h-screen">
          <SideMenu submissions={submissions} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {columns.map((column) => (
              <GradeColumn key={column.id} id={column.id} title={column.title}>
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
        {/* corse title */}
        {/* select button */}
        {/* canban */}
      </DndContext>
    </>
  )
}

export default Container
