import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeacherDashboardComponent} from "./components/teacher-dashboard/teacher-dashboard.component";
import {TeacherHomeComponent} from "./components/teacher-home/teacher-home.component";
import {TeacherClassListComponent} from "./components/teacher-class-list/teacher-class-list.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthTeacherGuard} from "../../guards/auth/auth-teacher.guard";

const routes: Routes = [
  {
    component: TeacherDashboardComponent, path: '', canActivate: [AuthGuard, AuthTeacherGuard],
    children: [
      {component: TeacherHomeComponent, path: ''},
      {component: TeacherClassListComponent, path: 'class-list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcTeacherRoutingModule { }
