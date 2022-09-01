import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_CLASS_LEVEL_SUB_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {ClassLevelSub} from "../models/dto/class-level-sub.model";
import {ApiResponse} from "../models/dto/api.response";

@Injectable({
  providedIn: 'root'
})
export class ClassLevelSubService {

  constructor(private http: HttpClient, @Inject(RC_CLASS_LEVEL_SUB_API_URL) private apiUrl: string) {
  }

  getAll(): Observable<ClassLevelSub[]> {
    return this.http.get<ClassLevelSub[]>(this.apiUrl);
  }

  getAllByClassLevelId(classLevelId: number): Observable<ClassLevelSub[]> {
    return this.http.get<ClassLevelSub[]>(this.apiUrl + "/level/" + classLevelId);
  }

  update(classLevelSub: ClassLevelSub): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, classLevelSub);
  }

  save(classLevelSub: ClassLevelSub): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}`, classLevelSub);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
