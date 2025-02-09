import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../../../models/dto/subject.model";
import {Student} from "../../../../../models/dto/student.model";
import {AcademicYear} from "../../../../../models/dto/academic-year.model";
import {StudentClassLevel} from "../../../../../app.types";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../../services/subject.service";
import {StudentService} from "../../../../../services/student.service";
import {ClassLevelService} from "../../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../../services/class-level-sub.service";
import {AcademicYearService} from "../../../../../services/academic-year.service";
import {StudentApplicationService} from "../../../../../services/student-application.service";
import {SubjectRegistrationService} from "../../../../../services/subject-registration.service";
import {SectionService} from "../../../../../services/section.service";
import {Section} from "../../../../../models/dto/section.model";
import {Dropdown} from "primeng/dropdown";
import {ApplicationRequest} from "../../../../../models/dto/student-application.model";
import {SubjectRegistration} from "../../../../../models/dto/subject-registration.model";

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {
  subjects: Subject[] = [];
  addedSubjects: Subject[] = [];
  alreadyAddedSubject: boolean = false
  students: Student[] = [];
  academicYears: AcademicYear[] = [];
  sections: Section[] = [];
  classLevels: StudentClassLevel[] = [];
  applicationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private sectionService: SectionService,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private academicYearService: AcademicYearService,
    private studentApplicationService: StudentApplicationService,
    private subjectRegistrationService: SubjectRegistrationService,
  ) {
    this.applicationForm = this.fb.group({
      student: [0, Validators.required], year: [0, Validators.required], classLevel: [0, Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    this.subjectService.getAll().subscribe((subjects) => {
      this.subjects = subjects
      console.log(subjects)
    });
    this.academicYearService.getAll().subscribe((years) => this.academicYears = years);
    this.studentService.getAll().subscribe((students) => this.students = students);
    this.loadClassLevels();
  }

  loadClassLevels = () => {
    this.classLevelService.getAll().subscribe({
      next: (classLevels) => {
        classLevels.forEach((cl) => {
          this.classLevelSubService.getAllByClassLevelId(cl.id).subscribe({
            next: (classLevelSubs) => {
              classLevelSubs.forEach((cls) => {
                this.classLevels.push({
                  id: cl.id,
                  sub_id: cls.id,
                  name: `${cl.name} ${cls.name}`,
                  classLevel: cl,
                  classLevelSub: cls
                });
              })
            }
          });
        })
      }
    });
  };


  addSubjectAction(subjectDropDown: Dropdown) {
    const subjectId = subjectDropDown.value;
    const subject = this.subjects.find(s => s.id === subjectId);
    if (subject) {
      if (this.addedSubjects.find(s => s.id === subject.id)) {
        this.alreadyAddedSubject = true;
      } else {
        this.addedSubjects.push(subject);
        this.alreadyAddedSubject = false;
      }
    }
  }

  submitApplicationAction() {
    const request: ApplicationRequest = {
      studentId: this.applicationForm.get('student')?.value,
      yearId: this.applicationForm.get('year')?.value,
      classSubId: this.applicationForm.get('classLevel')?.value,
    }
    this.studentApplicationService.save(request).subscribe({
      next: (response) => {
        const satId = response.id;
        this.addedSubjects.forEach((subject) => {
          const subjectReg: SubjectRegistration = {id: 0, satId: satId, subjectId: subject.id,};
          this.subjectRegistrationService.save(subjectReg).subscribe();
        });
      }
    });
  }
}
