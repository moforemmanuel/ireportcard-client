import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../../models/dto/subject.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../../../../services/subject.service";
import {Section} from "../../../../../models/dto/section.model";
import {SectionService} from "../../../../../services/section.service";
import {MessageService} from "primeng/api";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {addToMessageService} from "../../../../../utils/message-service.util";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  @Input() subject: Subject;
  subjectForm: FormGroup = this.fb.group({});
  sections: Section[] = [];
  private readonly defaultSubject: Subject = {id: -1, name: '', coefficient: 0, code: '', sectionId: -1};

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private subjectService: SubjectService,
    private sectionService: SectionService,
    private msgService: MessageService
  ) {
    this.subject = this.defaultSubject;
    this.setupSubjectForm();
  }

  ngOnInit(): void {
    this.sectionService.getAll().subscribe({
      next: (sections) => this.sections = sections,
      error: (err) => addToMessageService(this.msgService, 'warn', 'Error connecting to server', `${err.message}`)
    });
  }

  resetSubject(): void {
    this.subject = this.defaultSubject;
  }

  setupSubjectForm() {
    this.subjectForm = new FormGroup({
      name: new FormControl(this.subject.name, Validators.required),
      code: new FormControl(this.subject.code, Validators.required),
      coeff: new FormControl(this.subject.coefficient, [Validators.required, Validators.min(0)]),
      sectionId: new FormControl(this.subject.sectionId, Validators.required)
    });
  }

  saveSubject(): void {
    const subjectToSave: Subject = {
      id: -1,
      name: this.subjectForm.get('name')?.value,
      code: this.subjectForm.get('code')?.value,
      coefficient: this.subjectForm.get('coeff')?.value,
      sectionId: this.subjectForm.get('sectionId')?.value.id
    }

    if (this.subject.id < 0) {
      this.subjectService.save(subjectToSave).subscribe({
        next: (res) => addToMessageService(this.msgService, 'success', 'Success', `${res.message}`),
        error: (err) => addToMessageService(this.msgService, 'error', 'Failed', `${err.message}`)
      });
    } else {
      subjectToSave.id = this.subject.id;
      this.subjectService.update(subjectToSave).subscribe({
        next: (res) => addToMessageService(this.msgService, 'success', 'Success', `${res.message}`),
        error: (err) => addToMessageService(this.msgService, 'error', 'Error', `${err.message}`)
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
