import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <header class="z-1 w-full fixed top-0">
      <p-toast></p-toast>
      <app-top-menu [menuItems]="dashboardMenuItems"></app-top-menu>
    </header>
    <main class="z-0 h-full min-h-screen py-8">
      <div class="dashboard-container row no-gutters dashbody-container">
        <div class="dash-body container-fluid dash-body-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>
    <footer class="z-1">
      <app-footer></app-footer>
    </footer>
  `
})
export class DashboardComponent implements OnInit {
  menuItems: MenuItem[] = [];
  dashboardMenuItems: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.menuItems = [
      {separator: true},
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
      }
    ];
    this.dashboardMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Subjects',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/dashboard/subject'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Classes',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/dashboard/class'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Students',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/dashboard/student'],
        routerLinkActiveOptions: {exact: true},
        items: [
          {
            label: 'Add',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/dashboard/student/add'],
            routerLinkActiveOptions: {exact: true},
          },
        ]
      },
      {
        label: 'Applications',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: ['/dashboard/application'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Class Lists',
        icon: 'pi pi-fw pi-folder',
        routerLink: ['/dashboard/class-list'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/dashboard/settings'],
        routerLinkActiveOptions: {exact: true},
      }

    ]
  }

}
