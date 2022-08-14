import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {ReportCardService} from "../../../../services/report-card.service";
import {Router} from "@angular/router";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <div>
      <p-toast></p-toast>
      <div class="flex justify-content-center">
        <div class="surface-card p-4 shadow-2 border-round w-full m-2 lg:m-8">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent implements OnInit {
  login: boolean = true;

  constructor(private defaultService: ReportCardService, private router: Router, private msgService: MessageService) {
  }

  ngOnInit(): void {
  }
}
