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
    path: 'dashboard',
    loadChildren: () => import('./modules/rc-dashboard/rc-dashboard.module').then(m => m.RcDashboardModule)
  },
  {path: 'auth', loadChildren: () => import('./modules/rc-auth/rc-auth.module').then(m => m.RcAuthModule)},
  {component: SelectSchoolComponent, path: 'select-school', children: [], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
