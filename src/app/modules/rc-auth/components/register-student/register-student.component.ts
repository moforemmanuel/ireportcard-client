import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Gender} from "../../../../models/enum/gender.enum";
import {School} from "../../../../models/dto/school.model";
import {SchoolService} from "../../../../services/school.service";
import {DateUtil} from "../../../../utils/date.util";
import {Student, StudentInfo} from "../../../../models/dto/student.model";
import {User} from "../../../../models/dto/user.model";
import {Role} from "../../../../models/enum/role.enum";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {
  studentForm: FormGroup;
  genders: string[] = Object.keys(Gender);
  schools: School[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolService,
    private authService: AuthService,
  ) {
    this.studentForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      pob: ['', Validators.required],
      school: [0, Validators.required],
      fatherName: [''],
      fatherPhone: [''],
      motherName: [''],
      motherPhone: [''],
      guardianName: [''],
      guardianPhone: [''],
    });
  }

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools = () => this.schoolService.getAll().subscribe((schools) => this.schools = schools);

  registerStudentAction() {
    console.log(this.studentForm.value);

    const user: User = new User(
      -1, this.studentForm.get('username')?.value,
      this.studentForm.get('firstname')?.value, this.studentForm.get('lastname')?.value,
      this.studentForm.get('phone')?.value, this.studentForm.get('address')?.value, false, Role.STUDENT
    );
    const info: StudentInfo = {
      fatherName: this.studentForm.get('fatherName')?.value,
      fatherPhone: this.studentForm.get('fatherPhone')?.value,
      motherName: this.studentForm.get('motherName')?.value,
      motherPhone: this.studentForm.get('motherPhone')?.value,
      guardianName: this.studentForm.get('guardianName')?.value,
      guardianPhone: this.studentForm.get('guardianPhone')?.value,
    };
    const student: Student = {
      id: -1, regNum: '', name: '',
      gender: this.studentForm.get('gender')?.value,
      dob: DateUtil.toString(new Date(this.studentForm.get('dob')?.value)),
      pob: this.studentForm.get('pob')?.value,
      schoolId: this.studentForm.get('school')?.value,
      info: info, user: user
    }
    const password = this.studentForm.get('password')?.value;
    this.authService.registerStudent(student, password).subscribe(() => {
      this.router.navigate(['/auth/login']).then();
    });
  }
}
