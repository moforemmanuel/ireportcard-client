import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {ReportCardService} from "../../services/report-card.service";

@Injectable({
  providedIn: 'root'
})
export class AuthStudentGuard implements CanActivate {
  constructor(
    private router: Router,
    private reportCardService: ReportCardService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isStudent = new Subject<boolean>();

    this.reportCardService.testAuthStudent().subscribe({
      next: (res) => {
        if (!res) {
          this.router.navigate(['/login']).then()
        }
        isStudent.next(res);
        isStudent.complete();
      }, error: () => {
        this.router.navigate(['/login']).then();
        isStudent.next(false);
        isStudent.complete();
      }
    });
    return isStudent.asObservable();
  }

}
