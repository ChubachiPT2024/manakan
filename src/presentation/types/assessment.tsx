export interface Assessment {
  grade: AssessmentGradeOfFrontend
  rank: AssessmentRankOfFrontend
}

export interface Submission {
  isSubmitted: boolean
}

export type AssessmentGradeOfFrontend = 0 | 1 | 2 | 3 | 4 | 5
export type AssessmentRankOfFrontend = '++' | '+' | '+-' | '-' | '--'
