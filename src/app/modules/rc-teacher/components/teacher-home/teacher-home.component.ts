import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {UserComplete} from "../../../../models/dto/user.model";

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  teacher?: UserComplete;

  constructor(
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadUserComplete();
  }

  loadUserComplete = () => this._userService.getCompleteFromSession().subscribe(u => {
    this.teacher = u;
    console.log(u)
  });

}
