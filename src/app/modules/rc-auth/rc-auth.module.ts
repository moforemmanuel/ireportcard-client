import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplitterModule} from 'primeng/splitter';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {AvatarModule} from 'primeng/avatar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageModule} from 'primeng/image';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component'
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {AuthComponent} from './components/auth/auth.component';
import {ToastModule} from "primeng/toast";
import {RcAuthRoutingModule} from "./rc-auth-routing.module";
import {RegisterTeacherComponent} from './components/register/register-teacher/register-teacher.component';
import {RegisterStudentComponent} from './components/register/register-student/register-student.component';
import {RadioButtonModule} from "primeng/radiobutton";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";


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
    SplitterModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    StyleClassModule,
    CardModule,
    PasswordModule,
    AvatarModule,
    ReactiveFormsModule,
    FormsModule,
    ImageModule,
    CheckboxModule,
    RippleModule,
    ToastModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule
  ],
  exports: [
    AuthComponent
  ]
})
export class RcAuthModule {
}
