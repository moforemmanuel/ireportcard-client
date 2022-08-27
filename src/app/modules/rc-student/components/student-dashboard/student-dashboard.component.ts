import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-student-dashboard',
  styleUrls: ['./student-dashboard.component.scss'],
  template: `
    <app-top-menu [menuItems]="studentMenuItems"></app-top-menu>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class StudentDashboardComponent implements OnInit {
  studentMenuItems: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.studentMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/student/'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Applications',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/student/applications'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Subjects',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/student/subjects'],
        routerLinkActiveOptions: {exact: true},
      },
    ];
  }

}
