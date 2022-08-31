import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassLevel} from "../../../../../models/dto/class-level.model";
import {ClassLevelSubService} from "../../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../../models/dto/class-level-sub.model";
import {MessageService} from "primeng/api";
import {ClassLevelService} from "../../../../../services/class-level.service";
import {SectionService} from "../../../../../services/section.service";
import {Section} from "../../../../../models/dto/section.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../../../../models/dto/subject.model";
import {SubjectService} from "../../../../../services/subject.service";

@Component({
  selector: 'app-class',
  templateUrl: './view-class-level.component.html',
  styleUrls: ['./view-class-level.component.scss']
})
export class ViewClassLevelComponent implements OnInit {
  classForm: FormGroup;
  msFormControl: FormControl;
  classLevel: ClassLevel = {id: -1, name: '', order: 0, sectionId: -1};
  section: Section;
  classLevelSubs: ClassLevelSub[] = [];

  mandatorySubjects: { subject: Subject, added: boolean }[] = [];
  nonMandatorySubjects: Subject[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _subjectService: SubjectService,
    private classLevelService: ClassLevelService, private sectionService: SectionService,
    private classLevelSubService: ClassLevelSubService, private msg: MessageService
  ) {
    this.section = {id: -1, name: '', category: '', schoolId: -1}
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      classLevels: this.fb.array([])
    });
    this.msFormControl = new FormControl(0, Validators.required);
  }

  ngOnInit(): void {
    const classId = this.activatedRoute.snapshot.params['id'];
    this.classLevelService.getById(classId).subscribe({
      next: (classLevel) => {
        this.classLevel = classLevel;
        this.loadSection(classLevel.sectionId);
        this.loadClassLevelSubs(classLevel.id);
        this.loadSubjects(classLevel.id);
      },
      error: () => this.router.navigate(['/dashboard/class']).then()
    });
  }

  loadClassLevelSubs(classLevelId: number) {
    this.classLevelSubService.getAllByClassLevelId(classLevelId).subscribe((cls) => {
      this.classLevelSubs = cls;
      (this.classForm.get('classLevels') as FormArray).controls = [];
      cls.forEach((classLevelSub) => this.setClassLevelSubForm(classLevelSub.id, classLevelSub.name));
    });
  }

  loadSection(sectionId: number) {
    this.sectionService.getById(sectionId).subscribe((section: Section) => this.section = section);
  }

  loadSubjects(classLevelId: number) {
    this.classLevelService.getSubjects(classLevelId).subscribe((mSubjects) => {
      this.mandatorySubjects = mSubjects.map((s): { subject: Subject, added: boolean } => {
        return {subject: s, added: true}
      });
      console.log(this.mandatorySubjects)
      this._subjectService.getAll().subscribe(subjects => {
        this.nonMandatorySubjects = [];
        subjects.forEach(nmSubject => this.addToNonMandatorySubjects(nmSubject));
      });
    });
  }

  addToNonMandatorySubjects(subject: Subject) {
    if (!this.mandatorySubjects.find(s => s.subject.id == subject.id)) this.nonMandatorySubjects.push(subject);
  }

  get classLevelSubForms(): FormArray {
    return this.classForm.get('classLevels') as FormArray;
  }

  setClassLevelSubForm(id: number, name: string) {
    this.classLevelSubForms.push(this.fb.group({id: [id], name: [name, Validators.required]}))
  }

  saveClassLevelSub(formId: number) {
    const clsForm = this.classLevelSubForms.controls[formId];
    const classLevelSub: ClassLevelSub = {
      id: clsForm.get('id')?.value, name: clsForm.get('name')?.value, classLevelId: this.classLevel.id
    }
    if (classLevelSub.id < 0) {
      this.classLevelSubService.save(classLevelSub).subscribe(() => this.loadClassLevelSubs(this.classLevel.id));
    } else {
      this.classLevelSubService.update(classLevelSub).subscribe(() => this.loadClassLevelSubs(this.classLevel.id));
    }
  }

  addMandatorySubjectAction() {
    const subjectId = this.msFormControl.value;
    if (subjectId > 0) {
      const subject = this.nonMandatorySubjects.find(s => s.id == subjectId);
      if (subject) {
        if (!this.mandatorySubjects.find(s => s.subject.id == subject.id)) {
          this.mandatorySubjects = [...this.mandatorySubjects, {subject: subject, added: false}];
        }
      }
    }
  }

  saveMandatorySubjectAction() {
    const id: number = this.classLevel.id;
    const subjectIds: number[] = this.mandatorySubjects.filter(ms => !ms.added).map(ms => ms.subject.id);
    this.classLevelService.updateSubjects(id, subjectIds).subscribe(() => this.loadSubjects(id));
  }
}
