import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  template: `
    <app-top-menu></app-top-menu>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AdminDashboardComponent implements OnInit {
  adminMenuItems: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.adminMenuItems = []
  }

}
