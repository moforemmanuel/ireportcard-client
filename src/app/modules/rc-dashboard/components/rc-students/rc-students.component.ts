import {Component, OnInit} from '@angular/core';
import {Student} from "../../../../models/dto/student.model";
import {StudentService} from "../../../../services/student.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-rc-students',
  templateUrl: './rc-students.component.html',
  styleUrls: ['./rc-students.component.scss']
})
export class RcStudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (students) => {
        this.students = students;
        console.log(students)
      },
    });
  }

  deleteStudentAction(student: Student) {
    const confirmDelete = confirm(`Are you sure you want to delete account of: ${student.user.firstName}`);
    if (confirmDelete) {
      this.studentService.delete(student.id).subscribe({next: () => this.loadStudents()});
    }
  }
}
