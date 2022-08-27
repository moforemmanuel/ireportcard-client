import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {Student} from "../../../../models/dto/student.model";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  student!: Student;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.loadUserComplete();
  }

  loadUserComplete = () => this.userService.getCompleteFromSession().subscribe(user => {
    console.log(user)
    this.student = user.account as Student
  });


}
