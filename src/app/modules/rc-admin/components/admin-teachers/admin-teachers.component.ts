import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../../../services/teacher.service";
import {Teacher} from "../../../../models/dto/teacher.model";
import {SchoolService} from "../../../../services/school.service";
import {School} from "../../../../models/dto/school.model";

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.scss']
})
export class AdminTeachersComponent implements OnInit {
  schoolId: number = -1;
  schools: School[] = [];
  teachers: Teacher[] = [];

  constructor(
    private _schoolService: SchoolService,
    private _teacherService: TeacherService,
  ) {
  }

  ngOnInit(): void {
    this.loadTeachers();
    this.loadSchools();
  }

  loadTeachers = (schoolId?: number) => {
    if (schoolId && schoolId > 0) this._teacherService.getAllBySchool(schoolId).subscribe(teachers => this.teachers = teachers);
    else this._teacherService.getAll().subscribe(teachers => this.teachers = teachers);
  }

  loadSchool = (id: number) => this._schoolService.getById(id);
  loadSchools = () => this._schoolService.getAll().subscribe(schools => this.schools = schools);
}
