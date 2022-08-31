import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RcTeacherRoutingModule } from './rc-teacher-routing.module';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import { TeacherClassListComponent } from './components/teacher-class-list/teacher-class-list.component';
import {RcSharedModule} from "../rc-shared.module";
import {RcReusableModule} from "../rc-reusable/rc-reusable.module";


@NgModule({
  declarations: [
    TeacherDashboardComponent,
    TeacherHomeComponent,
    TeacherClassListComponent
  ],
  imports: [
    CommonModule,
    RcTeacherRoutingModule,
    RcSharedModule,
    RcReusableModule,
  ]
})
export class RcTeacherModule { }
