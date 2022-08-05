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
  applicationTrials?: StudentApplicationTrial[];
}

export interface StudentApplicationTrial {
  id: number;
  order: number;
  repeating: boolean;
  numberOfSubjects?: number;
  createdAt: string;
  updatedAt?: string;
  applicationKey: StudentApplicationKey;
  academicYearId: number;
}

export interface ApplicationRequest {
  classSubId: number;
  yearId: number;
  studentId: number;
}

export interface ApplicationResponse {
  class_name: string;
  student: Student;
  application: StudentApplication;
  application_trials: StudentApplicationTrial[];
}
