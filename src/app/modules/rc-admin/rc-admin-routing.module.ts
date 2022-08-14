import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthTeacherGuard} from "../../guards/auth/auth-teacher.guard";
import {SelectSchoolComponent} from "./components/select-school/select-school.component";
import {AdminSettingComponent} from "./components/admin-setting/admin-setting.component";
import {AdminUsersComponent} from "./components/admin-users/admin-users.component";
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {AuthAdminGuard} from "../../guards/auth/auth-admin.guard";

const routes: Routes = [
  {
    component: AdminDashboardComponent, path: 'admin',
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      {component: AdminHomeComponent, path: ''},
      {component: SelectSchoolComponent, path: 'select-school'},
      {component: AdminSettingComponent, path: 'settings'},
      {component: AdminUsersComponent, path: 'users'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcAdminRoutingModule {
}
