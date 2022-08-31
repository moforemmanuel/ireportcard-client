import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AdminSettingComponent} from "./components/admin-setting/admin-setting.component";
import {AdminUsersComponent} from "./components/admin-users/admin-users.component";
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {AuthAdminGuard} from "../../guards/auth/auth-admin.guard";
import {AdminTeachersComponent} from "./components/admin-teachers/admin-teachers.component";
import {AdminAddTeacherComponent} from "./components/admin-teachers/admin-add-teacher/admin-add-teacher.component";
import {AdminViewTeacherComponent} from "./components/admin-teachers/admin-view-teacher/admin-view-teacher.component";

const routes: Routes = [
  {
    component: AdminDashboardComponent, path: 'admin',
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      {component: AdminHomeComponent, path: ''},
      {component: AdminSettingComponent, path: 'settings'},
      {component: AdminUsersComponent, path: 'users'},
      {component: AdminTeachersComponent, path: 'teachers'},
      {component: AdminAddTeacherComponent, path: 'teachers/add'},
      {component: AdminViewTeacherComponent, path: 'teachers/view/:id'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcAdminRoutingModule {
}
