import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentDashboardComponent} from "./components/student-dashboard/student-dashboard.component";
import {StudentHomeComponent} from "./components/student-home/student-home.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthStudentGuard} from "../../guards/auth/auth-student.guard";
import {StudentApplicationsComponent} from "./components/student-applications/student-applications.component";
import {
  StudentViewApplicationComponent
} from "./components/student-applications/student-view-application/student-view-application.component";
import {StudentResultsComponent} from "./components/student-results/student-results.component";
import {StudentSubjectsComponent} from "./components/student-subjects/student-subjects.component";

const routes: Routes = [
  {
    component: StudentDashboardComponent, path: 'student',
    canActivate: [AuthGuard, AuthStudentGuard],
    children: [
      {component: StudentHomeComponent, path: 'home'},
      {component: StudentApplicationsComponent, path: 'application'},
      {component: StudentViewApplicationComponent, path: 'application/view/:id'},
      {component: StudentSubjectsComponent, path: 'subjects'},
      {component: StudentResultsComponent, path: 'results'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcStudentRoutingModule {
}
