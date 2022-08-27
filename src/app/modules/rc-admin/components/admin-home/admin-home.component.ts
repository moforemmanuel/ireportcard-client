import {Component, OnInit} from '@angular/core';
import {User, UserComplete} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../../models/enum/role.enum";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  admin?: UserComplete;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser = () => this._userService.getCompleteFromSession().subscribe(u => {
    this.admin = u;
  });
}
