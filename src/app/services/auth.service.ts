import {Inject, Injectable} from '@angular/core';
import {RC_AUTH_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAuth, UserLoginRequest, UserRegisterRequest, UserRegisterResponse} from "../models/dto/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(RC_AUTH_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  login = (userLogin: UserLoginRequest): Observable<UserAuth> => {
    return this.http.post<UserAuth>(`${this.apiUrl}/login`, userLogin);
  }

  regiser = (userReg: UserRegisterRequest): Observable<UserRegisterResponse> => {
    return this.http.post<UserRegisterResponse>(`${this.apiUrl}/register`, userReg);
  }

  logout = (logout: { sessionId: string }): Observable<UserAuth> => {
    return this.http.post<UserAuth>(`${this.apiUrl}/logout`, logout);
  }
}
