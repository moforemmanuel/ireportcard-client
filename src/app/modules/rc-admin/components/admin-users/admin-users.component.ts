import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers = () => this._userService.getAll().subscribe(users => this.users = users);

  toggleApprovedAction = (id: number) => this._userService.toggleApproved(id).subscribe();
}
