import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RcWelcomeComponent} from "./components/rc-welcome/rc-welcome.component";
import {SelectSchoolComponent} from "./components/select-school/select-school.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    component: RcWelcomeComponent,
    path: '',
    children: []
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/rc-auth/rc-auth.module').then(m => m.RcAuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/rc-admin/rc-admin.module').then(m => m.RcAdminModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/rc-student/rc-student.module').then(m => m.RcStudentModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/rc-dashboard/rc-dashboard.module').then(m => m.RcDashboardModule)
  },
  {component: SelectSchoolComponent, path: 'select-school', children: [], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
