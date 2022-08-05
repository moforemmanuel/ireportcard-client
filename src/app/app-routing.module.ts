import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./modules/rc-dashboard/components/dashboard/dashboard.component";
import {RcHomeComponent} from "./modules/rc-dashboard/components/rc-home/rc-home.component";
import {RcSubjectsComponent} from "./modules/rc-dashboard/components/rc-subjects/rc-subjects.component";
import {RcStudentsComponent} from "./modules/rc-dashboard/components/rc-students/rc-students.component";
import {RcClassesComponent} from "./modules/rc-dashboard/components/rc-classes/rc-classes.component";
import {RcClasslistsComponent} from "./modules/rc-dashboard/components/rc-classlists/rc-classlists.component";
import {RcWelcomeComponent} from "./components/rc-welcome/rc-welcome.component";
import {RcSettingsComponent} from "./modules/rc-dashboard/components/rc-settings/rc-settings.component";
import {SchoolGuard} from "./guards/school.guard";
import {SelectSchoolComponent} from "./components/select-school/select-school.component";
import {LoginComponent} from "./modules/rc-auth/components/login/login.component";
import {RegisterComponent} from "./modules/rc-auth/components/register/register.component";
import {AuthComponent} from "./modules/rc-auth/components/auth/auth.component";
import {AuthGuard} from "./guards/auth.guard";
import {ClassLevelComponent} from "./modules/rc-dashboard/components/rc-classes/class-level/class-level.component";
import {
  AddApplicationComponent
} from "./modules/rc-dashboard/components/rc-applications/add-application/add-application.component";

const routes: Routes = [
  {
    component: RcWelcomeComponent,
    path: '',
    children: []
  },
  {path: 'dashboard', loadChildren: () => import('./modules/rc-dashboard/rc-dashboard.module').then(m => m.RcDashboardModule)},
  {path: 'auth', loadChildren: () => import('./modules/rc-auth/rc-auth.module').then(m => m.RcAuthModule)},
  {component: SelectSchoolComponent, path: 'select-school', children: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
