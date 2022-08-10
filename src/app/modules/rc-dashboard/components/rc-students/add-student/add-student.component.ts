import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateUtil} from "../../../../../utils/date.util";
import {Student} from "../../../../../models/dto/student.model";
import {Gender} from "../../../../../models/enum/gender.enum";
import {LocalStorageUtil} from "../../../../../utils/local-storage.util";
import {StudentService} from "../../../../../services/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  genders: string[] = Object.keys(Gender);

  constructor(private fb: FormBuilder, private router: Router, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      pob: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveStudentAction() {
    const schoolId = LocalStorageUtil.readSchoolId();
    if (schoolId) {
      const student: Student = {
        id: -1, regNum: '', pob: this.studentForm.get('pob')?.value,
        name: this.studentForm.get('name')?.value, gender: this.studentForm.get('gender')?.value,
        dob: DateUtil.setToRcDateString(this.studentForm.get('dob')?.value), schoolId: schoolId,
      };
      this.studentService.save(student).subscribe((res) => {
        this.router.navigate([`/dashboard/student/view/${res.id}`]).then();
      });
    }
  }
}
