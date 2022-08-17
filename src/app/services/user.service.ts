import {Inject, Injectable} from '@angular/core';
import {RC_USER_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UserComplete} from "../models/dto/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(RC_USER_API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  getComplete(id: number): Observable<UserComplete> {
    return this.http.get<UserComplete>(`${this.apiUrl}/complete/${id}`);
  }

  getCompleteFromSession(): Observable<UserComplete> {
    return this.http.get<UserComplete>(`${this.apiUrl}/complete`);
  }
}
