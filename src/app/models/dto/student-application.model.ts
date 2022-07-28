import {Student} from "./student.model";

export interface StudentApplicationKey {
  student_id: number;
  class_sub_id: number;
}

export interface StudentApplication {
  application_key: StudentApplicationKey;
  application_trials?: StudentApplicationTrial[]
}

export interface StudentApplicationTrial {
  id: number;
  order: number;
  repeating: boolean;
  num_of_subjects?: number;
  created_at: string;
  updated_at?: string;
  application_key: StudentApplicationKey;
}

export interface ApplicationRequest {
  class_id: number;
  year_id: number,
}

export interface ApplicationResponse {
  class_name: string;
  student: Student;
  sat_id: number;
  application: StudentApplication;
}
