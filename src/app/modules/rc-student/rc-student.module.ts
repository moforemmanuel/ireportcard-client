import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RcStudentRoutingModule } from './rc-student-routing.module';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';


@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentDashboardComponent
  ],
  imports: [
    CommonModule,
    RcStudentRoutingModule
  ]
})
export class RcStudentModule { }
