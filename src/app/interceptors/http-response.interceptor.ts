import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, tap} from 'rxjs';
import {MessageService} from "primeng/api";
import {EntityResponse} from "../models/dto/entity.response";
import {addToMessageService} from "../utils/message-service.util";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private msgService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.successfulResponseHandler(event);
        }
      }),
      catchError(this.responseHandler)
    );
  }

  successfulResponseHandler = (event: HttpResponse<any>) => {
    const entityResponse = event.body as EntityResponse;
    if (event.status === 201) {
      this.msgService.add({severity: 'success', summary: 'Success', detail: entityResponse.message});
    }
  }

  private responseHandler = (response: HttpErrorResponse) => {
    console.log(response)
    if (response.status >= 200 && response.status <= 299) {
      console.log("CREATED A RESOURCE")
    }

    if (response.error instanceof Error) {
      this.msgService.add({severity: 'warn', summary: response.error.name, detail: response.error.message});
    } else if (response.status == 0) {
      this.msgService.add({severity: 'error', summary: `Server error`, detail: `Server is not running!`});
    } else if (response.status == 401) {
      addToMessageService(this.msgService, 'warn', 'Logged Out', 'You need to be logged in to perform this action!')
    } else if (response.error == undefined) {
      this.msgService.add({
        severity: 'error',
        summary: 'Unknown error',
        detail: 'Report this to the admin or developers!'
      });
    } else {
      this.msgService.add({
        severity: 'error',
        summary: response.name,
        detail: `Backend returned code ${response.status} : ${response.error.message ? response.error.message : 'Unknown error'}`
      });
    }
    return EMPTY;
  }
}
