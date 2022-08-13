import {Inject, Injectable} from '@angular/core';
import {RC_DEFAULT_API_URL, RC_REPORT_CARD_API_URL} from "../app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportCardService {

  constructor(
    @Inject(RC_DEFAULT_API_URL) private defaultApiUrl: string,
    @Inject(RC_REPORT_CARD_API_URL) private reportCardApiUrl: string,
    private http: HttpClient
  ) {}

  create(): Observable<string> {
    return this.http.post<string>(`${this.defaultApiUrl}/create`, {})
  }

  test(): Observable<any> {
    return this.http.get<any>(`${this.defaultApiUrl}/test`, {})
  }

  getReportCard = (satId: number, termId: number): Observable<HttpResponse<ArrayBuffer>> => {
    return this.http.get(`${this.reportCardApiUrl}/report_card`, {
      observe: 'response',
      params: {satId: satId, termId: termId},
      responseType: 'arraybuffer',
    }).pipe(map((response) => this.downloadFile(response)));
  }

  private downloadFile = (response: HttpResponse<ArrayBuffer>) => {
    if (response.body) {
      const filename = response.headers.get('Content-Disposition')?.split("filename=")[1].replace(/"/g, "");
      const blob = new Blob([response.body]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.setAttribute('style', 'display: none');
      document.body.appendChild(a);

      a.href = url;
      a.download = filename ? filename : "reportcard.docx";
      a.click();
    }
    return response;
  }
}
