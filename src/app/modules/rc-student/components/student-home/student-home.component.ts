import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {UserComplete} from "../../../../models/dto/user.model";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  student?: UserComplete;

  constructor(
    private _userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.loadUserComplete();
  }

  loadUserComplete = () => this._userService.getCompleteFromSession().subscribe(u => this.student = u);


}
