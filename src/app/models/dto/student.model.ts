import {Gender} from "../enum/gender.enum";

export interface Student {
  id: number;
  name: string;
  gender: Gender;
  dob: string;
  pob: string;
  regNum: string;
  schoolId: number;
}
