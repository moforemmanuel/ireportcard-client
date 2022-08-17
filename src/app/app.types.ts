import {Student} from "./models/dto/student.model";
import {StudentApplication, StudentApplicationTrial} from "./models/dto/student-application.model";
import {ClassLevel} from "./models/dto/class-level.model";
import {ClassLevelSub} from "./models/dto/class-level-sub.model";
import {AcademicYear} from "./models/dto/academic-year.model";

export type SAT = {
  student: Student,
  sat: StudentApplicationTrial,
  sa: StudentApplication,
  year: AcademicYear
};

export type  StudentClassLevel = {
  id: number,
  sub_id: number,
  name: string,
  classLevel: ClassLevel,
  classLevelSub: ClassLevelSub
}

export type RcClassLevel = {
  classLevel: ClassLevel,
  classLevelSubs: ClassLevelSub[],
}
