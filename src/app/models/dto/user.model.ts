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
  first_name: string;
  last_name: string;
}

export interface UserRegisterResponse {
  id: number;
  username: string;
  message: string;
}
