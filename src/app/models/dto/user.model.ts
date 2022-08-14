import {Role} from "../enum/role.enum";

export class User {
  constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public address: string,
    public role: Role
  ) {}
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserAuth {
  sessionId: string;
  message: string;
}

export interface UserRegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserRegisterResponse {
  id: number;
  username: string;
  message: string;
}
