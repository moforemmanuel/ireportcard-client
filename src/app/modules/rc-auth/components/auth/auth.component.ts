import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {ReportCardService} from "../../../../services/report-card.service";
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

  constructor(private defaultService: ReportCardService, private router: Router, private msgService: MessageService) {
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
        this.router.navigate(['/dashboard']).then((r) => console.log(r));
      });
    }
  }

  toggleLogin = () => {
    this.login = !this.login;
  }
}
