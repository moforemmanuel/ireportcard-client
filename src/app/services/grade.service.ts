import {Inject, Injectable} from '@angular/core';
import {RC_GRADE_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/dto/api.response";
import {Grade} from "../models/dto/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(@Inject(RC_GRADE_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  save(grade: Grade): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}`, grade);
  }

  update(grade: Grade): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, grade);
  }
}
