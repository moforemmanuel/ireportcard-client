import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {MenuItem, MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Router} from "@angular/router";
import {DefaultService} from "../../../../services/default.service";

@Component({
  selector: 'app-top-menu',
  styleUrls: ['./top-menu.component.scss'],
  template: `
    <div class="top-menu">
      <p-menubar [styleClass]="'p-3 text-color border-noround'" [model]="menuItems" [class]="'menu-item'">
        <ng-template pTemplate="start">
          <span class="text-5xl">RMS</span>
        </ng-template>
        <ng-template pTemplate="end">
          <div class="flex justify-content-center align-items-center">
            <span class="block border-circle w-3rem h-3rem {{online ? 'bg-green-200': 'bg-red-200' }}" pTooltip="{{online ? 'Online' : 'Offline'}}" tooltipPosition="top"></span>
            <button (click)="changeSchoolAction()" pButton label="Change School" icon="pi pi-arrows-h" class="p-button-raised border-noround m-1" ></button>
            <button (click)="logoutAction()" pButton pTooltip="Logout" tooltipPosition="top" icon="pi pi-power-off" data-in-line="true" class="p-button-danger border-noround m-1"></button>
          </div>
        </ng-template>
      </p-menubar>
    </div>
  `
})
export class TopMenuComponent implements OnInit {

  online: boolean = false;
  menuItems: MenuItem[] = [];


  constructor(private router: Router, private authService: AuthService, private defaultService: DefaultService, private msgService: MessageService) {
  }

  ngOnInit(): void {
    this.checkOnlineStatus();

    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard/home'],
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

  checkOnlineStatus(): void {
    this.defaultService.test().subscribe({
      next: () => this.online = true,
      error: () => this.online = false
    });
  }

  logoutAction() {
    console.log("logging out")
    const confirmDelete = confirm("Are you sure you want to log out?");
    const sessionId: string | null = LocalStorageUtil.readUserToken();
    if (sessionId && confirmDelete) {
      this.authService.logout({sessionId: sessionId}).subscribe({
        next: (res) => {
          this.router.navigate(['/auth']).then(() => {
            addToMessageService(this.msgService, 'success', 'Log out', res.message);
          });
          LocalStorageUtil.deleteUserToken();
          LocalStorageUtil.deleteSchoolId();
        }, error: (e: HttpErrorResponse) => {
          addToMessageService(this.msgService, 'warn', 'Log out', e.error.message)
        }
      });
    }

  }

  changeSchoolAction() {
    LocalStorageUtil.deleteSchoolId();
    location.reload();
  }
}
