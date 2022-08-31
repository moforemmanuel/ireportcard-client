import {Inject, Injectable} from '@angular/core';
import {RC_SUBJECT_REGISTRATION_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubjectRegistration} from "../models/dto/subject-registration.model";
import {ApiResponse} from "../models/dto/api.response";

@Injectable({
  providedIn: 'root'
})
export class SubjectRegistrationService {

  constructor(@Inject(RC_SUBJECT_REGISTRATION_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  get(id: number): Observable<SubjectRegistration> {
    return this.http.get<SubjectRegistration>(`${this.apiUrl}/${id}`);
  }

  getBySatId(satId: number): Observable<SubjectRegistration[]> {
    return this.http.get<SubjectRegistration[]>(`${this.apiUrl}/sat/${satId}`);
  }

  save(subjectRegistration: SubjectRegistration): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}`, subjectRegistration);
  }

  saveMultiple(subjectRegistrations: SubjectRegistration[]): Observable<ApiResponse[]> {
    return this.http.post<ApiResponse[]>(`${this.apiUrl}/multiple`, subjectRegistrations);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
