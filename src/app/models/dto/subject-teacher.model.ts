import {TeacherPosition} from "../enum/role.enum";

export class SubjectTeacher {
  constructor(
    public key: SubjectTeacherKey,
    public position: TeacherPosition
  ) {
  }
}

export class SubjectTeacherKey {
  constructor(
    public subjectId: number,
    public teacherId: number
  ) {
  }
}

