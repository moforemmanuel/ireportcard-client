import {Student} from "./models/dto/student.model";
import {ApplicationResponse, StudentApplication, StudentApplicationTrial} from "./models/dto/student-application.model";

export type SAT = {
  student: Student,
  sat: StudentApplicationTrial,
  application: StudentApplication,
  applicationResponse: ApplicationResponse
};
