import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../services/auth.service";
import {User} from "../../../../../models/dto/user.model";
import {Role} from "../../../../../models/enum/role.enum";
import {Teacher} from "../../../../../models/dto/teacher.model";
import {SchoolService} from "../../../../../services/school.service";
import {School} from "../../../../../models/dto/school.model";

@Component({
  selector: 'app-admin-add-teacher',
  templateUrl: './admin-add-teacher.component.html',
  styleUrls: ['./admin-add-teacher.component.scss']
})
export class AdminAddTeacherComponent implements OnInit {
  schools: School[] = [];
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private _schoolService: SchoolService,
  ) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required], lastName: ["", Validators.required],
      username: ["", Validators.required], school: [0, Validators.required],
      password: ["", Validators.required], rpassword: ["", Validators.required],
      phone: ["", Validators.required], address: [""],
    });
  }

  ngOnInit(): void {
    this._schoolService.getAll().subscribe(schools => this.schools = schools);
  }

  registerAction() {
    const password = this.registerForm.get("password")?.value;
    const user: User = {
      id: -1, role: Role.TEACHER, username: this.registerForm.get("username")?.value,
      firstName: this.registerForm.get("firstName")?.value, lastName: this.registerForm.get("lastName")?.value,
      phone: this.registerForm.get("phone")?.value, address: this.registerForm.get("address")?.value, approved: false
    }
    const teacher: Teacher = {
      id: -1, user: user, schoolId: this.registerForm.get("school")?.value,
    }

    this.authService.registerTeacher(teacher, password).subscribe(() => this.router.navigate(['/admin/teachers']).then())
  }

  isFormValid() {
    return this.registerForm.get('rpassword')?.value == this.registerForm.get('password')?.value && this.registerForm.valid;
  }
}
