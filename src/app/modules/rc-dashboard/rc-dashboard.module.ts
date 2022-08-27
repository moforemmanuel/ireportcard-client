import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RcHomeComponent} from './components/rc-home/rc-home.component';
import {RcSubjectsComponent} from './components/rc-subjects/rc-subjects.component';
import {RcStudentsComponent} from './components/rc-students/rc-students.component';
import {RcClassesComponent} from './components/rc-classes/rc-classes.component';
import {RcClasslistsComponent} from './components/rc-classlists/rc-classlists.component';
import {RcSettingsComponent} from './components/rc-settings/rc-settings.component';
import {RcBodyIntroComponent} from './components/rc-body-intro/rc-body-intro.component';
import {RcApplicationsComponent} from './components/rc-applications/rc-applications.component';
import {SubjectComponent} from "./components/rc-subjects/subject/subject.component";
import {StudentComponent} from "./components/rc-students/student/student.component";
import {ClassLevelComponent} from "./components/rc-classes/class-level/class-level.component";
import {SectionComponent} from "./components/rc-settings/section/section.component";
import {AddStudentComponent} from './components/rc-students/add-student/add-student.component';
import {AddApplicationComponent} from './components/rc-applications/add-application/add-application.component';
import {RcDashboardRoutingModule} from "./rc-dashboard-routing.module";
import {AddClassLevelComponent} from './components/rc-classes/add-class-level/add-class-level.component';
import {AddSubjectComponent} from './components/rc-subjects/add-subject/add-subject.component';
import {RcSharedModule} from "../rc-shared.module";
import {RcReusableModule} from "../rc-reusable/rc-reusable.module";
import {
  RcViewApplicationComponent
} from './components/rc-applications/rc-view-application/rc-view-application.component';


@NgModule({
  declarations: [
    SideMenuComponent,
    DashboardComponent,
    RcHomeComponent,
    RcSubjectsComponent,
    RcStudentsComponent,
    RcClassesComponent,
    RcClasslistsComponent,
    RcSettingsComponent,
    RcBodyIntroComponent,
    RcApplicationsComponent,
    SubjectComponent,
    StudentComponent,
    ClassLevelComponent,
    SectionComponent,
    AddStudentComponent,
    AddApplicationComponent,
    AddClassLevelComponent,
    AddSubjectComponent,
    RcViewApplicationComponent,
  ],
  imports: [
    RcDashboardRoutingModule,
    CommonModule,
    RcSharedModule,
    RcReusableModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class RcDashboardModule {
}
