import {Component, OnInit} from '@angular/core';
import {
  ApplicationRequest,
  ApplicationResponse,
  StudentApplication,
  StudentApplicationKey
} from "../../../../../models/dto/student-application.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../../models/dto/subject.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SubjectService} from "../../../../../services/subject.service";
import {SubjectRegistration} from "../../../../../models/dto/subject-registration.model";
import {SubjectRegistrationService} from "../../../../../services/subject-registration.service";
import {StudentService} from "../../../../../services/student.service";
import {Student} from "../../../../../models/dto/student.model";
import {AcademicYear} from "../../../../../models/dto/academic-year.model";
import {AcademicYearService} from "../../../../../services/academic-year.service";
import {ClassLevel} from "../../../../../models/dto/class-level.model";
import {ClassLevelService} from "../../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../../models/dto/class-level-sub.model";
import {StudentApplicationService} from "../../../../../services/student-application.service";
import {addToMessageService} from "../../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {SAT, StudentClassLevel} from "../../../../../app.types";

type ApplicationSubject = { pending: boolean, subject: Subject };

@Component({
  selector: 'app-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.scss']
})
export class StudentApplicationComponent implements OnInit {
  editing: boolean = false;
  studentApplicationRes?: ApplicationResponse;
  applicationForm: FormGroup = this.fb.group({});
  applicationSubjects: ApplicationSubject[] = [];
  subjects: Subject[] = [];
  students: Student[] = [];
  academicYears: AcademicYear[] = [];
  studentClassLevels: StudentClassLevel[] = [];
  // TODO arrange this forced undefined removal
  studentAT!: SAT;
  private readonly defaultSubject: Subject = {id: -1, name: '', sectionId: -1, code: '', coefficient: -1};

  constructor(
    private fb: FormBuilder,
    private msgService: MessageService,
    private activeModal: NgbActiveModal,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private academicYearService: AcademicYearService,
    private studentApplicationService: StudentApplicationService,
    private subjectRegistrationService: SubjectRegistrationService,
  ) {

    this.applicationForm = this.fb.group({
      student: [0, Validators.required],
      year: [0, Validators.required],
      classLevel: [0, Validators.required],
      subjectRegs: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.loadData();
    this.loadClassLevels();
    this.loadApplicationSubjects();
  }


  resetApplication() {
    this.studentApplicationRes = undefined;
  }

  getUnregisteredSubjects(): Subject[] {
    const subjects: Subject[] = [];
    this.subjects.forEach((s) => {
      if (!this.applicationSubjects.find((as) => as.subject.id == s.id)) {
        subjects.push(s);
      }
    });
    return subjects;
  }

  loadData = () => {
    this.studentService.getAll().subscribe((students) => this.students = students);
    this.subjectService.getAll().subscribe((subjects) => this.subjects = subjects);
    this.academicYearService.getAll().subscribe((years) => this.academicYears = years);
  }

  loadClassLevels = () => {
    this.classLevelService.getAll().subscribe({
      next: (classLevels) => classLevels.forEach((cl) => {
        this.classLevelSubService.getAllByClassLevelId(cl.id).subscribe({
          next: (classLevelSubs) => classLevelSubs.forEach((cls) => {
            this.studentClassLevels.push({id: cl.id, sub_id: cls.id, name: `${cl.name} ${cls.name}`, classLevel: cl, classLevelSub: cls});
          })
        });
      })
    });
  }


  loadApplicationSubjects() {
    if (this.studentApplicationRes) {

    }
  }

  saveApplication() {
    const newSubjectRegs: SubjectRegistration[] = [];
    this.applicationSubjects.forEach((aps) => {
      if (aps.pending) {
        if (this.studentApplicationRes) {
        }
      }
    });

    const applicationRequest: ApplicationRequest = {
      studentId: this.applicationForm.get('student')?.value,
      classId: this.applicationForm.get('classLevel')?.value,
      yearId: this.applicationForm.get('year')?.value,
    }

    console.log(applicationRequest)

    if (this.editing) {
      console.log(newSubjectRegs)
    } else {
      this.studentApplicationService.save(applicationRequest).subscribe({
        next: (res) => {
          console.log(res);
          const ak: StudentApplicationKey = {
            classSubId: applicationRequest.classId,
            studentId: applicationRequest.studentId
          };
          this.editing = true;
        },
      });

      this.subjectRegistrationService.saveMultiple(newSubjectRegs).subscribe({
        next: (res) => {
          console.log(res)
          this.loadApplicationSubjects();
        }
      });
    }
  }

  addSubject($event: MouseEvent, subjectSelect: HTMLSelectElement) {
    const addSubjectButton: HTMLButtonElement = $event.target as HTMLButtonElement;
    if (subjectSelect.hidden) {
      subjectSelect.hidden = false;
      addSubjectButton.textContent = "Register";
    } else {
      const s: Subject = this.findSubjectById(parseInt(subjectSelect.value), this.subjects);

      if (s.id > 0) {
        this.addToApplicationSubjects({pending: true, subject: s})
      }

      subjectSelect.hidden = true;
      addSubjectButton.textContent = "Add";
    }
  }

  findSubjectById = (id: number, subjects: Subject[]): Subject => {
    const s: Subject | undefined = subjects.find(s => s.id == id);
    return s ? s : this.defaultSubject;
  }

  addToApplicationSubjects = (asp: { pending: boolean, subject: Subject }) => {
    if (!(this.applicationSubjects.find(asb => asb.subject.id == asp.subject.id))) {
      this.applicationSubjects.push(asp);
    } else {
      const msgDetail: string = asp.pending ?
        'This subject has already been added for registration, select another.' :
        'This subject has already been registered.'
      addToMessageService(this.msgService, 'warn', 'Duplicate Subject', msgDetail)
    }
  }

  deleteApplication() {
    const confirmDelete = confirm(`Are you sure you want to delete?`);
    if (this.editing && this.studentApplicationRes && confirmDelete) {
      this.studentApplicationService.delete({
        studentId: this.studentApplicationRes?.student.id,
        classSubId: this.studentApplicationRes?.application.key.classSubId
      }).subscribe(() => {
        // close on delete as this does not exist anymore
        this.activeModal.close();
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  setupApplicationForm() {
    if (this.studentAT) {
      this.applicationForm = this.fb.group({
        student: [this.studentAT.student.id, Validators.required],
        year: [this.studentAT.sat.academicYearId, Validators.required],
        classLevel: [this.studentAT.application.classLevelSub.id, Validators.required],
        subjectRegs: this.fb.array([])
      })
    }
  }
}
