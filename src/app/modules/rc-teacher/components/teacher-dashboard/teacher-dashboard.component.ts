import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-teacher-dashboard',
  styleUrls: ['./teacher-dashboard.component.scss'],
  template: `
    <header class="z-1 w-full fixed top-0">
      <p-toast></p-toast>
      <app-top-menu [menuItems]="teacherMenuItems"></app-top-menu>
    </header>
    <main class="z-0 h-full min-h-screen my-2 py-8">
      <router-outlet></router-outlet>
    </main>
    <footer class="z-1">
      <app-footer></app-footer>
    </footer>
  `
})
export class TeacherDashboardComponent implements OnInit {
  teacherMenuItems: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log("qsd")
    this.teacherMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/teacher'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Class List',
        icon: 'pi pi-fw pi-folder',
        routerLink: ['/teacher/class-list'],
        routerLinkActiveOptions: {exact: true},
      },
    ];
  }

}
