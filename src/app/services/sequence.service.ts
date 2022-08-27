import {Inject, Injectable} from '@angular/core';
import {RC_SEQUENCE_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sequence} from "../models/dto/sequence.model";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  constructor(@Inject(RC_SEQUENCE_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  getAll(): Observable<Sequence[]> {
    return this.http.get<Sequence[]>(this.apiUrl);
  }

  getByTermId(termId: number): Observable<Sequence[]> {
    return this.http.get<Sequence[]>(`${this.apiUrl}/term/${termId}`);
  }

  save(sequence: Sequence): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, sequence);
  }

  update(sequence: Sequence): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}/${sequence.id}`, sequence);
  }
}
