import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "../../guards/auth.guard";
import {RcSubjectsComponent} from "./components/rc-subjects/rc-subjects.component";
import {RcClassesComponent} from "./components/rc-classes/rc-classes.component";
import {ViewClassLevelComponent} from "./components/rc-classes/view-class-level/view-class-level.component";
import {RcStudentsComponent} from "./components/rc-students/rc-students.component";
import {RcApplicationsComponent} from "./components/rc-applications/rc-applications.component";
import {AddApplicationComponent} from "./components/rc-applications/add-application/add-application.component";
import {RcClassListsComponent} from "./components/rc-class-lists/rc-class-lists.component";
import {RcSettingsComponent} from "./components/rc-settings/rc-settings.component";
import {RcHomeComponent} from "./components/rc-home/rc-home.component";
import {AddStudentComponent} from "./components/rc-students/add-student/add-student.component";
import {StudentComponent} from "./components/rc-students/student/student.component";
import {AddClassLevelComponent} from "./components/rc-classes/add-class-level/add-class-level.component";
import {SubjectComponent} from "./components/rc-subjects/subject/subject.component";
import {AddSubjectComponent} from "./components/rc-subjects/add-subject/add-subject.component";
import {
  RcViewApplicationComponent
} from "./components/rc-applications/rc-view-application/rc-view-application.component";
import {AuthAdminGuard} from "../../guards/auth/auth-admin.guard";

const routes: Routes = [
  {
    component: DashboardComponent, path: 'dashboard', canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      {component: RcHomeComponent, path: ''},
      {component: RcSubjectsComponent, path: 'subject'},
      {component: AddSubjectComponent, path: 'subject/add'},
      {component: SubjectComponent, path: 'subject/view/:id'},
      {component: RcClassesComponent, path: 'class'},
      {component: AddClassLevelComponent, path: 'class/add'},
      {component: ViewClassLevelComponent, path: 'class/view/:id'},
      {component: RcStudentsComponent, path: 'student'},
      {component: AddStudentComponent, path: 'student/add'},
      {component: StudentComponent, path: 'student/view/:id'},
      {component: RcApplicationsComponent, path: 'application'},
      {component: AddApplicationComponent, path: 'application/add'},
      {component: RcViewApplicationComponent, path: 'application/view/:id'},
      {component: RcClassListsComponent, path: 'class-list'},
      {component: RcSettingsComponent, path: 'settings'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcDashboardRoutingModule {
}
