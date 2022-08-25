import {Inject, Injectable} from '@angular/core';
import {RC_SUBJECT_TEACHER_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {SubjectTeacher, SubjectTeacherKey} from "../models/dto/subject-teacher.model";
import {EntityResponse} from "../models/dto/entity.response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectTeacherService {

  constructor(
    @Inject(RC_SUBJECT_TEACHER_API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  create = (subjectTeacher: SubjectTeacher): Observable<EntityResponse> => this.http.post<EntityResponse>(this.apiUrl, subjectTeacher);
  getByKey = (key: SubjectTeacherKey): Observable<SubjectTeacher> => this.http.get<SubjectTeacher>(`${this.apiUrl}`, {
    params: {subjectId: key.subjectId, teacherId: key.teacherId}
  });
  getAll = (): Observable<SubjectTeacher[]> => this.http.get<SubjectTeacher[]>(this.apiUrl);
  getAllByTeacher = (teacherId: number): Observable<SubjectTeacher[]> => this.http.get<SubjectTeacher[]>(`${this.apiUrl}/teacher/${teacherId}`);
}
