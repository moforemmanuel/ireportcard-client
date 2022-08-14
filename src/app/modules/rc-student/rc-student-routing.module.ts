import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentDashboardComponent} from "./components/student-dashboard/student-dashboard.component";
import {StudentHomeComponent} from "./components/student-home/student-home.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthStudentGuard} from "../../guards/auth/auth-student.guard";

const routes: Routes = [
  {
    component: StudentDashboardComponent, path: '',
    canActivate: [
      AuthGuard, AuthStudentGuard
    ],
    children: [
      {component: StudentHomeComponent, path: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcStudentRoutingModule { }
