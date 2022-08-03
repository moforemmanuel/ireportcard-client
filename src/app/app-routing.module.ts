import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./modules/rc-dashboard/components/dashboard/dashboard.component";
import {RcHomeComponent} from "./modules/rc-dashboard/components/rc-home/rc-home.component";
import {RcSubjectsComponent} from "./modules/rc-dashboard/components/rc-subjects/rc-subjects.component";
import {RcStudentsComponent} from "./modules/rc-dashboard/components/rc-students/rc-students.component";
import {RcClassesComponent} from "./modules/rc-dashboard/components/rc-classes/rc-classes.component";
import {RcClasslistsComponent} from "./modules/rc-dashboard/components/rc-classlists/rc-classlists.component";
import {RcWelcomeComponent} from "./components/rc-welcome/rc-welcome.component";
import {RcSettingsComponent} from "./modules/rc-dashboard/components/rc-settings/rc-settings.component";
import {RcApplicationsComponent} from "./modules/rc-dashboard/components/rc-applications/rc-applications.component";
import {SchoolGuard} from "./guards/school.guard";
import {SelectSchoolComponent} from "./components/select-school/select-school.component";
import {LoginComponent} from "./modules/rc-auth/components/login/login.component";
import {RegisterComponent} from "./modules/rc-auth/components/register/register.component";
import {AuthComponent} from "./modules/rc-auth/components/auth/auth.component";
import {AuthGuard} from "./guards/auth.guard";
import {ClassLevelComponent} from "./modules/rc-dashboard/components/rc-classes/class-level/class-level.component";

const routes: Routes = [
  {
    component: RcWelcomeComponent,
    path: '',
    children: []
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
    children: [
      {component: RcHomeComponent, path: 'home'},
      {component: RcSubjectsComponent, path: 'subject'},
      {component: RcClassesComponent, path: 'class'},
      {component: ClassLevelComponent, path: 'class/:id'},
      {component: RcStudentsComponent, path: 'student'},
      {component: RcApplicationsComponent, path: 'application'},
      {component: RcClasslistsComponent, path: 'class-list'},
      {component: RcSettingsComponent, path: 'settings'}
    ],
    canActivate: [AuthGuard, SchoolGuard]
  },
  {
    component: AuthComponent,
    path: 'auth',
    children: [
      {component: LoginComponent, path: 'login'},
      {component: RegisterComponent, path: 'register'}
    ]
  },
  {
    component: SelectSchoolComponent,
    path: 'select-school',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
