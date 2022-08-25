import {Inject, Injectable} from '@angular/core';
import {RC_CLASS_LIST_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {ClassListRequest, ClassListResponse} from "../models/dto/classlist.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassListService {

  constructor(@Inject(RC_CLASS_LIST_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  get(classListRequest: ClassListRequest): Observable<ClassListResponse> {
    return this.http.get<ClassListResponse>(this.apiUrl, {
      params: {
        yearId: classListRequest.yearId,
        classId: classListRequest.classId,
        subjectId: classListRequest.subjectId,
        sequenceId: classListRequest.sequenceId,
      }
    });
  }
}
