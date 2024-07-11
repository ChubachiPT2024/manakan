import { Assessment } from './submission'

export interface Report {
  id: number
  title: string
  items: Item[]
}

export interface Item {
  student: Student
  assessment: Assessment
  isChecked: boolean
}
