import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {ReportCardService} from "../../services/report-card.service";

@Injectable({
  providedIn: 'root'
})
export class AuthTeacherGuard implements CanActivate {
  constructor(
    private router: Router,
    private reportCardService: ReportCardService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isTeacherOrAdmin: Subject<boolean> = new Subject<boolean>();
    this.reportCardService.testAuthTeacher().subscribe({
      next: (res) => {
        if (!res) { // from here, my eyes are paining! :(
          this.reportCardService.testAuthAdmin().subscribe({
            next: (adminRes) => {
              if (!adminRes) {
                this.router.navigate(['/login']).then();
              }
              isTeacherOrAdmin.next(adminRes);
              isTeacherOrAdmin.complete();
            }, error: () => {
              this.router.navigate(['/login']).then();
              isTeacherOrAdmin.next(false);
              isTeacherOrAdmin.complete();
            }
          });
        } else {
          isTeacherOrAdmin.next(res);
          isTeacherOrAdmin.complete();
        }
      }, error: () => {
        this.router.navigate(['/login']).then();
        isTeacherOrAdmin.next(false);
        isTeacherOrAdmin.complete()
      }
    });
    return isTeacherOrAdmin.asObservable();
  }

}
