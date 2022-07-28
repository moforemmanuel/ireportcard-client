import {Component, OnInit} from '@angular/core';
import {
  ApplicationResponse,
  StudentApplication,
  StudentApplicationKey
} from "../../../../models/dto/student-application.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subject} from "../../../../models/dto/subject.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SubjectService} from "../../../../services/subject.service";
import {SubjectRegistration} from "../../../../models/dto/subject-registration.model";
import {SubjectRegistrationService} from "../../../../services/subject-registration.service";
import {StudentService} from "../../../../services/student.service";
import {Student} from "../../../../models/dto/student.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevel} from "../../../../models/dto/class-level.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/class-level-sub.model";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {SAT} from "../../../../app.types";

type ApplicationSubject =  { pending: boolean, subject: Subject };
@Component({
  selector: 'app-save-application',
  templateUrl: './save-application.component.html',
  styleUrls: ['./save-application.component.scss']
})
export class SaveApplicationComponent implements OnInit {
  readonly modal: NgbActiveModal;
  editing: boolean = false;
  studentApplicationRes?: ApplicationResponse;
  apForm: {studentId: number, classId: number, yearId: number, valid: () => boolean};
  applicationSubjects: ApplicationSubject[] = [];
  subjects: Subject[] = []; students: Student[] = []; academicYears: AcademicYear[] = [];
  classLevels: { id: number, name: string, cl: ClassLevel, cls: ClassLevelSub }[] = [];
  private readonly defaultSubject: Subject = {id: -1, name: '', section_id: -1, code: '', coefficient: -1};

  // TODO arrange this forced undefined removal
  studentAT!: SAT;

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
    this.modal = activeModal;
    this.apForm = {studentId: -1, classId: -1, yearId: -1, valid: () => {
      return this.apForm.studentId > 0 && this.apForm.classId > 0 && this.apForm.yearId > 0
    }};
  }

  ngOnInit(): void {
    this.loadSubjects();
    this.loadStudents();
    this.loadAcademicYears();
    this.loadClassLevels();
    this.loadApplicationSubjects();
    this.setupApplicationForm();
  }

  setupApplicationForm() {
    if (this.studentApplicationRes) {
      this.apForm.yearId = -1;
      this.apForm.classId = this.studentApplicationRes.application.application_key.student_id;
      this.apForm.studentId = this.studentApplicationRes.student.id;
    }
  }

  resetApplication() {
    this.studentApplicationRes = undefined;
  }

  get apFormValid(): boolean {
    return this.apForm.studentId > 0 && this.apForm.classId > 0 && this.apForm.yearId > 0;
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

  loadApplication = (applicationKey: StudentApplicationKey, yearId: number) => {
    this.studentApplicationService.getFull(applicationKey, yearId).subscribe((res) => this.studentApplicationRes = res);
  }

  loadStudents = () => {
    this.studentService.getAll().subscribe((students) => this.students = students);
  }

  loadSubjects = () => {
    this.subjectService.getAll().subscribe((subjects) => this.subjects = subjects);
  }

  loadAcademicYears = () => {
    this.academicYearService.getAll().subscribe( (years) => this.academicYears = years)
  }

  loadClassLevels = () => {
    this.classLevelService.getAll().subscribe({
      next: (classLevels) => classLevels.forEach((cl) => {
        this.classLevelSubService.getAllByClassLevelId(cl.id).subscribe({
          next: (classLevelSubs) => classLevelSubs.forEach((cls) => {
            this.classLevels.push({id: cl.id, name: `${cl.name} ${cls.name}`, cl: cl, cls: cls});
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
          newSubjectRegs.push({
            id: -1, sat_id: this.studentApplicationRes.sat_id, subject_id: aps.subject.id,
          });
        }
      }
    });

    const studentApplication: StudentApplication = {
      application_key: {
        student_id: this.apForm.studentId,
        class_sub_id: this.apForm.classId,
      },
    }

    console.log(studentApplication);
    if (this.editing) {
      console.log(newSubjectRegs)
    } else {
      this.studentApplicationService.save(studentApplication).subscribe({
        next: (res) => {
          console.log(res);
          const ak: StudentApplicationKey = {
            class_sub_id: studentApplication.application_key.class_sub_id,
            student_id: studentApplication.application_key.student_id
          };
          this.loadApplication(ak, this.apForm.yearId);
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
        'This subject has already been added for registration, select another.':
        'This subject has already been registered.'
      addToMessageService(this.msgService, 'warn', 'Duplicate Subject', msgDetail)
    }
  }

  deleteApplication() {
    const confirmDelete = confirm(`Are you sure you want to delete?`);
    if(this.editing && this.studentApplicationRes && confirmDelete) {
      this.studentApplicationService.delete({
        student_id: this.studentApplicationRes?.student.id,
        class_sub_id: this.studentApplicationRes?.application.application_key.class_sub_id
      }).subscribe((res) => {
        // close on delete as this does not exist anymore
        this.activeModal.close();
      });
    }
  }
}
