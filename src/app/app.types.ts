import {Student} from "./models/dto/student.model";
import {ApplicationResponse, StudentApplication, StudentApplicationTrial} from "./models/dto/student-application.model";
import {ClassLevel} from "./models/dto/class-level.model";
import {ClassLevelSub} from "./models/dto/class-level-sub.model";

export type SAT = {
  student: Student,
  sat: StudentApplicationTrial,
  application: StudentApplication
};

export type  StudentClassLevel = {
  id: number,
  sub_id: number,
  name: string,
  classLevel: ClassLevel,
  classLevelSub: ClassLevelSub
}
