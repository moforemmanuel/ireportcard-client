import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../services/auth.service";
import {MessageService} from "primeng/api";
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
      <p-menubar styleClass="top-menu-bar">
        <ng-template pTemplate="start">
          <span class="h1 font-weight-bold p-menuitem-text rms-title">R . M . S</span>
        </ng-template>
        <ng-template pTemplate="end">
          <div class="d-flex">
            <div class="flex-item mx-2">
              <span class="fw-bold {{online ? 'online-text': 'offline-text' }}">{{online ? "ONLINE" : "OFFLINE"}}</span>
            </div>
            <div class="flex-item text-center">
              <ul>
                <li class="font-weight-bold">John Doe</li>
                <li>Admin</li>
              </ul>
            </div>
            <div class="flex-item">
              <button (click)="logoutAction()" pButton label="Logout" icon="pi pi-power-off"></button>
            </div>
          </div>
        </ng-template>
      </p-menubar>
    </div>
  `
})
export class TopMenuComponent implements OnInit {

  online: boolean = false;

  constructor(private router: Router, private authService: AuthService, private defaultService: DefaultService, private msgService: MessageService) {
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
          this.router.navigate(['/auth']).then(() => {
            addToMessageService(this.msgService, 'success', 'Log out', res.message);
          });
          LocalStorageUtil.deleteUserToken();
        }, error: (e: HttpErrorResponse) => {
          addToMessageService(this.msgService, 'warn', 'Log out', e.error.message)
        }
      });
    }

  }
}
