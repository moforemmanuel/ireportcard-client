import {Gender} from "../enum/gender.enum";
import {User} from "./user.model";

export class Student {
  public name: string = '';
  constructor(
    public id: number,
    public regNum: string,
    public gender: Gender,
    public dob: string,
    public pob: string,
    public schoolId: number,
    public info: StudentInfo,
    public user: User
  ) {
    this.name = `${this.user.firstName} ${this.user.lastName}`
  }
}

export class StudentInfo {
  constructor(
    public fatherName: string,
    public fatherPhone: string,
    public motherName: string,
    public motherPhone: string,
    public guardianName: string,
    public guardianPhone: string,
  ) {
  }
}
