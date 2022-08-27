import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthComponent} from "./components/auth/auth.component";
import {RegisterTeacherComponent} from "./components/register-teacher/register-teacher.component";
import {RegisterStudentComponent} from "./components/register-student/register-student.component";

const routes: Routes = [

  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'register/teacher', component: RegisterTeacherComponent},
      {path: 'register/student', component: RegisterStudentComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcAuthRoutingModule {
}
