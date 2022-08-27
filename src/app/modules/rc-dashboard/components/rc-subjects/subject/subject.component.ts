import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../../../models/dto/subject.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../../services/subject.service";
import {Section} from "../../../../../models/dto/section.model";
import {SectionService} from "../../../../../services/section.service";
import {LocalStorageUtil} from "../../../../../utils/local-storage.util";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subject!: Subject;
  subjectForm: FormGroup = this.fb.group({});
  sections: Section[] = [];
  private readonly schoolId = LocalStorageUtil.getSchoolId();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private sectionService: SectionService
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required], code: ['', Validators.required],
      coeff: ['', Validators.required], section: [0, Validators.required]
    });
    const subjectId: number = this.activatedRoute.snapshot.params['id'];
    if (subjectId) {
      this.subjectService.getById(subjectId).subscribe((subject) => {
        this.subject = subject;
        this.setupSubjectForm(subject);
      })
    }
  }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections = () => {
    if (this.schoolId > 0) {
      this.sectionService.getBySchoolId(this.schoolId).subscribe((sections) => this.sections = sections);
    }
  }

  setupSubjectForm(subject: Subject) {
    this.subjectForm = this.fb.group({
      name: [subject.name, Validators.required], code: [subject.code, Validators.required],
      coeff: [subject.coefficient, Validators.required], section: [subject.sectionId, Validators.required]
    });
  }

  saveSubjectAction(): void {
    const subject: Subject = {
      id: this.subject.id, name: this.subjectForm.get('name')?.value, code: this.subjectForm.get('code')?.value,
      coefficient: this.subjectForm.get('coeff')?.value, sectionId: this.subjectForm.get('section')?.value
    }
    this.subjectService.update(subject).subscribe(() => {

    });
  }
}
