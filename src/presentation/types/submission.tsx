export interface Assessment {
  grade: AssessmentGradeOfFrontend
  rank: AssessmentRankOfFrontend
}

export type AssessmentGradeOfFrontend = 1 | 2 | 3 | 4 | 5
export type AssessmentRankOfFrontend = '++' | '+' | '+-' | '-' | '--'
