import {Component, OnInit} from '@angular/core';
import {UserComplete} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  admin?: UserComplete;

  constructor(
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadUserComplete();
  }

  loadUserComplete = () => this._userService.getCompleteFromSession().subscribe(u => this.admin = u);
}
