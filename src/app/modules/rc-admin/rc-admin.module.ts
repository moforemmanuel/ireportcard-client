import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RcAdminRoutingModule} from './rc-admin-routing.module';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {SelectSchoolComponent} from "./components/select-school/select-school.component";
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import { AdminHomeComponent } from './components/admin-home/admin-home.component';


@NgModule({
  declarations: [
    AdminSettingComponent,
    AdminDashboardComponent,
    SelectSchoolComponent,
    AdminUsersComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    RcAdminRoutingModule,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RippleModule
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class RcAdminModule {
}
