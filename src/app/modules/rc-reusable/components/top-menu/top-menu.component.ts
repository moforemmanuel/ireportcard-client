import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {MenuItem, MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Router} from "@angular/router";
import {ReportCardService} from "../../../../services/report-card.service";

@Component({
  selector: 'app-top-menu',
  styleUrls: ['./top-menu.component.scss'],
  template: `
    <div class="top-menu">
      <p-menubar [styleClass]="'p-3 text-color border-noround'" [model]="menuItems" [class]="'menu-item'">
        <ng-template pTemplate="start">
          <span class="text-4xl">iRC</span>
        </ng-template>
        <ng-template pTemplate="end">
          <div class="flex justify-content-center align-items-center">
            <span
              class="p-button p-button-icon text-white border-circle {{online ? 'bg-green-300 hover:bg-green-300': 'bg-red-300 hover:bg-red-600' }}"
              pTooltip="{{online ? 'Online' : 'Offline'}}" tooltipPosition="top">
              <i class="{{online? 'pi pi-bolt': 'pi pi-ban'}}"></i>
            </span>
            <button (click)="changeSchoolAction()" pButton pTooltip="Change School" tooltipPosition="top"
                    icon="pi pi-arrows-h" class="p-button-sm p-button-raised border-noround m-1"></button>
            <button (click)="logoutAction()" pButton pTooltip="Logout" tooltipPosition="top" icon="pi pi-power-off"
                    data-in-line="true" class="p-button-sm p-button-danger border-noround m-1"></button>
          </div>
        </ng-template>
      </p-menubar>
    </div>
  `
})
export class TopMenuComponent implements OnInit {

  online: boolean = false;
  @Input() menuItems: MenuItem[] = [];


  constructor(private router: Router, private authService: AuthService, private defaultService: ReportCardService, private msgService: MessageService) {
  }

  ngOnInit(): void {
    this.checkOnlineStatus();
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
          this.router.navigate(['/auth/login']).then(() => {
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
