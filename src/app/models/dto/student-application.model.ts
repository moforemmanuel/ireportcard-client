import {Student} from "./student.model";
import {ClassLevelSub} from "./class-level-sub.model";

export interface StudentApplicationKey {
  studentId: number;
  classSubId: number;
}

export interface StudentApplication {
  key: StudentApplicationKey;
  student: Student;
  classLevelSub: ClassLevelSub;
  application_trials?: StudentApplicationTrial[];
}

export interface StudentApplicationTrial {
  id: number;
  order: number;
  repeating: boolean;
  numOfSubjects?: number;
  createdAt: string;
  updatedAt?: string;
  applicationKey: StudentApplicationKey;
  academicYearId: number;
}

export interface ApplicationRequest {
  class_id: number;
  year_id: number;
  student_id: number;
}

export interface ApplicationResponse {
  class_name: string;
  student: Student;
  application: StudentApplication;
  application_trials: StudentApplicationTrial[];
}
