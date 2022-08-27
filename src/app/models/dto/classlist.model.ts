import {Subject} from "./subject.model";
import {ClassLevelSub} from "./class-level-sub.model";
import {Grade} from "./grade.model";
import {Student} from "./student.model";
import {ClassLevel} from "./class-level.model";

export interface ClassListRequest {
  year_id: number;
  class_id: number;
  subject_id: number;
  sequence_id: number;
}

export interface ClassListResponse {
  className: string;
  sequenceName: string;
  subject: Subject;
  classLevel: ClassLevel;
  classLevelSub: ClassLevelSub;
  studentGrades: { student: Student, grade: Grade }[];
}
