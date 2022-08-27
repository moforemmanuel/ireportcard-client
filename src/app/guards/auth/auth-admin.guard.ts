import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {ReportCardService} from "../../services/report-card.service";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private reportCardService: ReportCardService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAdmin: Subject<boolean> = new Subject<boolean>();
    this.reportCardService.testAuthAdmin().subscribe({
      next: (adminRes) => {
        if (!adminRes) {
          this.router.navigate(['/auth/login']).then();
        }
        isAdmin.next(adminRes);
        isAdmin.complete();
      }, error: () => {
        this.router.navigate(['/auth/login']).then();
        isAdmin.next(false);
        isAdmin.complete();
      }
    });
    return isAdmin.asObservable();
  }

}
