import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RcAdminRoutingModule} from './rc-admin-routing.module';
import {AdminSettingComponent} from './components/admin-setting/admin-setting.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {AdminUsersComponent} from './components/admin-users/admin-users.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {RcSharedModule} from "../rc-shared.module";
import {RcReusableModule} from "../rc-reusable/rc-reusable.module";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [
    AdminSettingComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    RcAdminRoutingModule,
    RcSharedModule,
    RcReusableModule,
    ToolbarModule,
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class RcAdminModule {
}
