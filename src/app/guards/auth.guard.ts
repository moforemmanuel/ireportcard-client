import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {ReportCardService} from "../services/report-card.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private reportCardService: ReportCardService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedIn = new Subject<boolean>();

    this.reportCardService.testAuthUser().subscribe({
      next: (res) => {
        loggedIn.next(res);
        loggedIn.complete();
      }, error: () => {
        this.router.navigate(['/auth/login']).then();
        loggedIn.next(false);
        loggedIn.complete();
      }
    });

    return loggedIn.asObservable();
  }
}
