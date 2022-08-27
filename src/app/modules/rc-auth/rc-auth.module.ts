import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component'
import {AuthComponent} from './components/auth/auth.component';
import {RcAuthRoutingModule} from "./rc-auth-routing.module";
import {RegisterTeacherComponent} from './components/register-teacher/register-teacher.component';
import {RegisterStudentComponent} from './components/register-student/register-student.component';
import {RcSharedModule} from "../rc-shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent,
  ],
  imports: [
    RcAuthRoutingModule,
    CommonModule,
    RcSharedModule
  ],
  exports: [
    AuthComponent
  ]
})
export class RcAuthModule {
}
