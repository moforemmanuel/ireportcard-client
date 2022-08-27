import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  template: `
    <header class="z-1 w-full fixed top-0">
      <p-toast></p-toast>
      <app-top-menu [menuItems]="adminMenuItems"></app-top-menu>
    </header>
    <main class="z-0 h-full min-h-screen my-2 py-8">
      <router-outlet></router-outlet>
    </main>
    <footer class="z-1">
      <app-footer></app-footer>
    </footer>
  `
})
export class AdminDashboardComponent implements OnInit {
  adminMenuItems: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.adminMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: [''],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/admin/users'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/admin/settings'],
        routerLinkActiveOptions: {exact: true},
      },
    ]
  }

}
