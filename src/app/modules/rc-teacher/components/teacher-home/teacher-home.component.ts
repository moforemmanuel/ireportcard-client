import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../../../models/dto/teacher.model";
import {UserService} from "../../../../services/user.service";
import {User, UserComplete} from "../../../../models/dto/user.model";

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  teacher?: UserComplete;
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUserComplete();
  }

  loadUserComplete = () => this._userService.getCompleteFromSession().subscribe(u => {
    this.teacher = u;
    console.log(u)
  });

}
