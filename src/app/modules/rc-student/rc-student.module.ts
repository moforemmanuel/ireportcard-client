import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RcStudentRoutingModule} from './rc-student-routing.module';
import {StudentHomeComponent} from './components/student-home/student-home.component';
import {StudentDashboardComponent} from './components/student-dashboard/student-dashboard.component';
import {RcSharedModule} from "../rc-shared.module";
import {RcReusableModule} from "../rc-reusable/rc-reusable.module";
import {StudentApplicationsComponent} from './components/student-applications/student-applications.component';
import {
  StudentViewApplicationComponent
} from './components/student-applications/student-view-application/student-view-application.component';
import {StudentResultsComponent} from './components/student-results/student-results.component';
import {StudentSubjectsComponent} from './components/student-subjects/student-subjects.component';


@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentDashboardComponent,
    StudentApplicationsComponent,
    StudentViewApplicationComponent,
    StudentResultsComponent,
    StudentSubjectsComponent,
  ],
  imports: [
    CommonModule,
    RcStudentRoutingModule,
    RcSharedModule,
    RcReusableModule
  ]
})
export class RcStudentModule {
}
