import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PanelMenuModule} from "primeng/panelmenu";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";

import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FooterComponent} from './components/footer/footer.component';
import {RcHomeComponent} from './components/rc-home/rc-home.component';
import {RcSubjectsComponent} from './components/rc-subjects/rc-subjects.component';
import {RcStudentsComponent} from './components/rc-students/rc-students.component';
import {RcClassesComponent} from './components/rc-classes/rc-classes.component';
import {RcClasslistsComponent} from './components/rc-classlists/rc-classlists.component';
import {RcSettingsComponent} from './components/rc-settings/rc-settings.component';
import {RcBodyIntroComponent} from './components/rc-body-intro/rc-body-intro.component';
import {DataViewModule} from "primeng/dataview";
import {ToastModule} from "primeng/toast";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {RcApplicationsComponent} from './components/rc-applications/rc-applications.component';
import {RadioButtonModule} from "primeng/radiobutton";
import {CheckboxModule} from "primeng/checkbox";
import {SplitButtonModule} from "primeng/splitbutton";
import {ToggleButtonModule} from "primeng/togglebutton";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {SubjectComponent} from "./components/rc-subjects/subject/subject.component";
import {StudentComponent} from "./components/rc-students/student/student.component";
import {ClassLevelComponent} from "./components/rc-classes/class-level/class-level.component";
import {SectionComponent} from "./components/rc-settings/section/section.component";
import {
  StudentApplicationComponent
} from "./components/rc-applications/student-application/student-application.component";
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {AddStudentComponent} from './components/rc-students/add-student/add-student.component';
import {AddApplicationComponent} from './components/rc-applications/add-application/add-application.component';
import {RcDashboardRoutingModule} from "./rc-dashboard-routing.module";
import {MessageModule} from "primeng/message";
import {CalendarModule} from "primeng/calendar";
import {AddClassLevelComponent} from './components/rc-classes/add-class-level/add-class-level.component';
import {AddSubjectComponent} from './components/rc-subjects/add-subject/add-subject.component';


@NgModule({
  declarations: [
    TopMenuComponent,
    SideMenuComponent,
    DashboardComponent,
    FooterComponent,
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
    StudentApplicationComponent,
    AddStudentComponent,
    AddApplicationComponent,
    AddClassLevelComponent,
    AddSubjectComponent,
  ],
  imports: [
    RcDashboardRoutingModule,
    CommonModule,
    MenubarModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    PanelMenuModule,
    RippleModule,
    CardModule,
    DividerModule,
    DataViewModule,
    ToastModule,
    FormsModule,
    TableModule,
    InputSwitchModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CheckboxModule,
    SplitButtonModule,
    ToggleButtonModule,
    DropdownModule,
    InputNumberModule,
    PanelModule,
    MenuModule,
    MessageModule,
    CalendarModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class RcDashboardModule {
}
