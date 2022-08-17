import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-student-dashboard',
  styleUrls: ['./student-dashboard.component.scss'],
  template: `
    <header class="z-1 w-full fixed top-0">
      <p-toast></p-toast>
      <app-top-menu [menuItems]="studentMenuItems"></app-top-menu>
    </header>
    <main class="z-0 h-full min-h-screen my-2 py-8">
      <router-outlet></router-outlet>
    </main>
    <footer class="z-1">
      <app-footer></app-footer>
    </footer>
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
        routerLink: ['/student/application'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Subjects',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/student/subjects'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Results',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/student/results'],
        routerLinkActiveOptions: {exact: true},
      },
    ];
  }

}
