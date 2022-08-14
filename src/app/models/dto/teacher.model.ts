import {User} from "./user.model";

export class Teacher {
  constructor(
    public id: number,
    public schoolId: number,
    public user: User
  ) {
  }
}
