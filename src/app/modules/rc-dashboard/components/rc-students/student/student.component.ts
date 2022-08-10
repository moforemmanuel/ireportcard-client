import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from "../../../../../models/dto/student.model";
import {StudentService} from "../../../../../services/student.service";
import {MessageService} from "primeng/api";
import {Gender} from "../../../../../models/enum/gender.enum";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  student!: Student;
  genders: Gender[] = [Gender.FEMALE, Gender.MALE, Gender.OTHER];
  studentForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private msgService: MessageService
  ) {
    const studentId = this.activatedRoute.snapshot.params['id'];
    if (studentId) {
      this.studentService.getById(studentId).subscribe({
        next: (res) => {
          this.student = res;
          this.setUpStudentForm();
        },
        error: () => this.router.navigate(['/dashboard/student']).then()
      })
    }
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      pob: ['', Validators.required],
    });
  }

  setUpStudentForm(): void {
    this.studentForm = this.fb.group({
      name: [this.student.name, Validators.required],
      gender: [this.student.gender, Validators.required],
      dob: [this.student.dob, Validators.required],
      pob: [this.student.pob, Validators.required],
    });
  }

  saveStudentAction() {

  }
}
