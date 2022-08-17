import {Student} from "./student.model";
import {ClassLevel} from "./class-level.model";
import {ClassLevelSub} from "./class-level-sub.model";

export class ReportCardModel {
  constructor(
    public satId: number,
    public termId: number,
    public student: Student,
    public classLevel: ClassLevel,
    public classLevelSub: ClassLevelSub,
    public stats: ReportCardStats,
    public grades: SubjectGrade[]
  ) {
  }
}


class ReportCardStats {
  constructor(
    public subjectsPassed: number,
    public rank: number,
    public average: number,
    public classAverage: number
  ) {}
}

class SubjectGrade {
  constructor(
    public subjectId: number,
    public subjectName: string,
    public subjectCode: string,
    public coefficient: number,
    public openingSequenceGrade: SubjectGradeScore,
    public closingSequenceGrade: SubjectGradeScore
  ) {}
}

class SubjectGradeScore {
  constructor(
    public score: number,
    public graded: boolean
  ) {
  }
}
