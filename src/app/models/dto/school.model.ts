export interface School {
  id: number,
  name: string,
  currentYearId?: number,
  currentTerm?: string,
  currentSequenceId?: number,
  maxGrade: number,
  applicationOpen: boolean,
  ownerId: number
}
