import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <header class="z-1 w-full fixed top-0">
      <p-toast></p-toast>
      <app-top-menu></app-top-menu>
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
  }

}
