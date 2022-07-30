import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {DefaultService} from "../../../../services/default.service";
import {Router} from "@angular/router";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  login: boolean = true;

  constructor(private defaultService: DefaultService, private router: Router, private msgService: MessageService) {
  }

  ngOnInit(): void {
    this.authRedirect();
  }

  authRedirect = () => {
    const sessionId: string | null = LocalStorageUtil.readUserToken();
    if (sessionId) {
      this.defaultService.test().subscribe(() => {
        addToMessageService(this.msgService, 'warn', 'Logout',
          `You have to logout before you ${this.login ? 'login' : 'register'}.`)
        this.router.navigate(['/dashboard/home']).then(() => {
        })
      });
    }
  }

  toggleLogin = () => {
    this.login = !this.login;
  }
}
