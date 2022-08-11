import {Component, OnInit} from '@angular/core';
import {StudentApplication, StudentApplicationTrial} from "../../../../../models/dto/student-application.model";
import {FormBuilder} from "@angular/forms";
import {Subject} from "../../../../../models/dto/subject.model";
import {SubjectService} from "../../../../../services/subject.service";
import {SubjectRegistration} from "../../../../../models/dto/subject-registration.model";
import {SubjectRegistrationService} from "../../../../../services/subject-registration.service";
import {StudentService} from "../../../../../services/student.service";
import {Student} from "../../../../../models/dto/student.model";
import {AcademicYear} from "../../../../../models/dto/academic-year.model";
import {StudentApplicationService} from "../../../../../services/student-application.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Dropdown} from "primeng/dropdown";

@Component({
  selector: 'app-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.scss']
})
export class StudentApplicationComponent implements OnInit {
  studentApplication!: StudentApplication;
  studentApplicationTrial!: StudentApplicationTrial;
  registeredSubjects: { reg: SubjectRegistration, subject: Subject }[] = [];
  subjects: Subject[] = [];
  students: Student[] = [];
  academicYears: AcademicYear[] = [];

  alreadyAddedSubject: boolean = false;
  subjectsToRegister: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msgService: MessageService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private studentApplicationService: StudentApplicationService,
    private subjectRegistrationService: SubjectRegistrationService,
  ) {
    const satId = this.activatedRoute.snapshot.params['id'];
    if (satId) {
      this.loadSAT(satId);
    } else {
      this.router.navigate(['/dashboard/application']).then();
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    this.studentService.getAll().subscribe((students) => this.students = students);
    this.subjectService.getAll().subscribe((subjects) => this.subjects = subjects);
  }

  loadSAT = (satId: number) => {
    this.studentApplicationService.getTrial(satId).subscribe((sat) => {
      this.studentApplicationTrial = sat;
      this.studentApplicationService.get(sat.applicationKey).subscribe((application) => {
        this.studentApplication = application;
      });
      this.loadRegisteredSubjects(satId);
    });
  }

  loadRegisteredSubjects = (satId: number) => {
    this.registeredSubjects = [];
    this.subjectRegistrationService.getBySatId(satId).subscribe((subjectRegs) => {
      subjectRegs.forEach(subjectReg => {
        this.subjectService.getById(subjectReg.subjectId).subscribe((subject) => {
          this.registeredSubjects.push({reg: subjectReg, subject: subject});
        });
      });
    });
  }

  unregisterSubjectAction(subject: { reg: SubjectRegistration; subject: Subject }) {
    this.subjectRegistrationService.delete(subject.reg.id).subscribe(() => this.loadRegisteredSubjects(subject.reg.satId));
  }

  addSubjectToRegisterAction(subjectDropDown: Dropdown) {
    const subjectId = subjectDropDown.value;
    if (subjectId) {
      const selectedSubject = this.subjects.find(s => s.id == subjectId)
      const subjectRegistered = this.registeredSubjects.find(s => s.subject.id == subjectId);
      const subjectSelected = this.subjectsToRegister.find(s => s.id == subjectId);
      if (!(subjectSelected || subjectRegistered) && selectedSubject) {
        this.subjectsToRegister.push(selectedSubject);
      }
    }
  }

  removeSubjectToRegister(subjectId: number) {
    this.subjectsToRegister = this.subjectsToRegister.filter(s => s.id != subjectId)
  }

  registerSubjectsAction() {
    if (this.studentApplicationTrial && this.subjectsToRegister.length != 0) {
      const subjectRegs: SubjectRegistration[] = [];
      const satId = this.studentApplicationTrial.id;
      this.subjectsToRegister.forEach(s => subjectRegs.push({
        subjectId: s.id, satId: satId, id: 0
      }));
      this.subjectRegistrationService.saveMultiple(subjectRegs).subscribe(() => {
        this.loadRegisteredSubjects(satId);
        this.subjectsToRegister = [];
      });
    }
  }
}
