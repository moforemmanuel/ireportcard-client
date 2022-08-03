import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LocalStorageUtil} from "../utils/local-storage.util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const xAuthToken = LocalStorageUtil.readUserToken();
    if (!xAuthToken) {
      return next.handle(request).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            const xAuthToken: string | null = event.headers.get("X-Auth-Token");
            if (xAuthToken && xAuthToken !== "") {
              console.log(xAuthToken)
              LocalStorageUtil.writeUserToken(xAuthToken);
            } else {
              if (event.status == 401) {
                LocalStorageUtil.deleteUserToken();
              }
            }
          }
        })
      );
    } else {
      const request1 = request.clone({
        headers: request.headers.set('X-Auth-Token', xAuthToken)
      });
      return next.handle(request1);
    }
  }
}
