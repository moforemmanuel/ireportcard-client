import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {Message, MessageService} from "primeng/api";
import {EntityResponse, isEntityResponse} from "../models/dto/entity.response";
import {LocalStorageUtil} from "../utils/local-storage.util";
import {Router} from "@angular/router";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router, private msgService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.successfulResponseHandler(event);
        }
      }),
      catchError((err) => this.errorResponseHandler(err))
    );
  }

  successfulResponseHandler = (event: HttpResponse<any>): void => {
    const message: Message = {severity: 'success', summary: 'Success', detail: ''};
    if (event.status === 200 || event.status === 201) {
      message.detail = event.body.message? event.body.message : '';
    }
    if (event.status === 204) {
      message.severity = 'warn';
      message.summary = 'Deleted';
      message.detail = 'Deleted successfully'
    }
    if (isEntityResponse(event.body)) {
      const entityResponse: EntityResponse = event.body;
      if (entityResponse && entityResponse.log ) {
        this.msgService.add(message);
      }
    }
  }

  private errorResponseHandler = (response: HttpErrorResponse) => {
    const error = response.error;
    const message: Message = {
      severity : 'error',
      summary : 'Error',
      detail: 'Something unexpected happened. Please file a report to the developers!'
    };
    if (error) {
      message.detail = error.message ? error.message : message.detail;
    } else {
      message.detail = 'Something unexpected happened. Please file a report to the developers!'
    }
    this.msgService.add(message);

    if(response.status == 401 || response.status == 403) {
      this.router.navigate(['/login']).then(() => LocalStorageUtil.deleteUserToken());
    }
    return of(error);
  }
}
