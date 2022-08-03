import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageUtil} from "../utils/local-storage.util";

@Injectable({
  providedIn: 'root'
})
export class SchoolGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const schoolId = LocalStorageUtil.readSchoolId();
    if (!schoolId) {
      this.router.navigate(['/select-school']).then((r) => console.log(`School guard: ${r}`));
    }
    return schoolId ? schoolId > 0: false;
  }

}
