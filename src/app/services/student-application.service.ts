import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
  ApplicationRequest,
  ApplicationResponse,
  StudentApplication,
  StudentApplicationKey
} from "../models/dto/student-application.model";
import {RC_STUDENT_APPLICATION_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService {

  constructor(@Inject(RC_STUDENT_APPLICATION_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  get(applicationKey: StudentApplicationKey): Observable<StudentApplication> {
    return this.http.get<StudentApplication>(`${this.apiUrl}`, {
      params: {classId: applicationKey.class_sub_id, studentId: applicationKey.student_id}
    });
  }

  getFull(applicationKey: StudentApplicationKey, yearId: number): Observable<ApplicationResponse> {
    return this.http.get<ApplicationResponse>(`${this.apiUrl}/one_full`, {
      params: {yearId: yearId, classId: applicationKey.class_sub_id, studentId: applicationKey.student_id}
    })
  }

  getAll(): Observable<StudentApplication[]> {
    return this.http.get<StudentApplication[]>(`${this.apiUrl}/all`);
  }

  getAllByRequest(request: ApplicationRequest): Observable<ApplicationResponse[]> {
    return this.http.get<ApplicationResponse[]>(`${this.apiUrl}/all_full`, {
      params: {yearId: request.year_id, classId: request.class_id}
    });
  }

  save(application: StudentApplication): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, application);
  }

  update(application: StudentApplication): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}`, application);
  }
}
