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
      <p-menubar styleClass="top-menu-bar" [model]="menuItems" [class]="'menu-item'">
        <ng-template pTemplate="start">
          <span class="h3 font-weight-bold p-menuitem-text rms-title mx-5 px-5">R . M . S</span>
        </ng-template>
        <ng-template pTemplate="end">
          <div class="d-flex">
            <div class="flex-item mx-2">
              <span class="fw-bold {{online ? 'online-text': 'offline-text' }}">{{online ? "ONLINE" : "OFFLINE"}}</span>
            </div>
            <div class="flex-item">
              <button (click)="changeSchoolAction()" pButton label="Change School" icon="pi pi-arrows-h" class="p-button-raised p-button-plain hover:text-white" ></button>
             <button (click)="logoutAction()" pButton label="Logout" icon="pi pi-power-off" data-in-line="true" class="p-button-danger"></button>
            </div>
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
      },
      {
        label: 'Subjects',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/dashboard/subject'],
      },
      {
        label: 'Classes',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/dashboard/class'],
      },
      {
        label: 'Students',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/dashboard/student'],
      },
      {
        label: 'Applications',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: ['/dashboard/application'],
      },
      {
        label: 'Class Lists',
        icon: 'pi pi-fw pi-folder',
        routerLink: ['/dashboard/class-list'],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/dashboard/settings'],
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
