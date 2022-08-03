import {Component, OnInit} from '@angular/core';
import {SchoolSettings} from "../../../../models/dto/school-settings.model";
import {SchoolSettingsService} from "../../../../services/school-settings.service";
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {Sequence} from "../../../../models/dto/sequence.model";
import {SequenceService} from "../../../../services/sequence.service";
import {TermService} from "../../../../services/term.service";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {Term} from "../../../../models/dto/term.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DefaultService} from "../../../../services/default.service";
import {AcademicYearUtil} from "../../../../utils/academic-year.util";
import {SchoolService} from "../../../../services/school.service";
import {School} from "../../../../models/dto/school.model";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Section} from "../../../../models/dto/section.model";
import {SectionService} from "../../../../services/section.service";

type ATS = AcademicYear | Term | Sequence;

enum ATSName {
  YEAR, TERM, SEQUENCE,
}

@Component({
  selector: 'app-rc-settings',
  templateUrl: './rc-settings.component.html',
  styleUrls: ['./rc-settings.component.scss']
})
export class RcSettingsComponent implements OnInit {

  schoolId: number = -1;
  settingsForm: FormGroup = this.fb.group({});
  school?: School;
  sections: Section[] = [];
  terms: Term[] = [];
  sequences: Sequence[] = [];
  academicYears: AcademicYear[] = [];

  constructor(
    private fb: FormBuilder,
    private msgService: MessageService,
    private defaultService: DefaultService,
    private schoolService: SchoolService,
    private sectionService: SectionService,
    private sequenceService: SequenceService,
    private termService: TermService,
    private academicYearService: AcademicYearService
  ) {
  }

  ngOnInit(): void {
    this.loadSchoolId();
    this.loadSchool();
    this.loadSettingsInfo();
    this.settingsForm = this.fb.group({
      applicationsOpen: [false, Validators.required],
      name: ["", Validators.required],
      year: [0, Validators.required],
      term: ["", Validators.required],
      sequence: [0, Validators.required],
      maxGrade: [0, Validators.compose([Validators.min(0), Validators.max(100)])]
    });
  }

  initSchoolForm = () => {
    if (this.school) {
      this.settingsForm = this.fb.group({
        applicationsOpen: [this.school.applicationOpen, Validators.required],
        name: [this.school.name ? this.school.name: '', Validators.required],
        year: [this.school.currentYearId? this.school.currentYearId: -1, Validators.required],
        term: [this.school.currentTerm? this.school.currentTerm: 'None'],
        sequence: [this.school.currentSequenceId? this.school: -1, Validators.required],
        maxGrade: [this.school.maxGrade? this.school.maxGrade: -1, Validators.compose([Validators.min(0), Validators.max(100)])]
      });
    }
  }

  loadSchoolId = () => {
    const sid = LocalStorageUtil.readSchoolId();
    this.schoolId = sid? sid: this.schoolId;
  }

  loadSchool(): void {
    this.schoolService.getById(this.schoolId).subscribe((school) => {
      localStorage.setItem("school", JSON.stringify(school))
      this.school = school;
      this.initSchoolForm();
    });
  }

  loadSettingsInfo(): void {
    this.sectionService.getBySchoolId(this.schoolId).subscribe((sections) => this.sections = sections)
    this.sequenceService.getAll().subscribe((sequences) => this.sequences = sequences);
    this.termService.getAll().subscribe((terms) => this.terms = terms);
    this.academicYearService.getAll().subscribe((years) => this.academicYears = years);
  }

  saveSettingsAction() {
    const school: School = {
      id: this.schoolId,
      name: this.settingsForm.get('name')?.value,
      applicationOpen: this.settingsForm.get('applicationsOpen')?.value,
      maxGrade: this.settingsForm.get('maxGrade')?.value,
      currentYearId: parseInt(this.settingsForm.get("year")?.value),
      currentSequenceId: parseInt(this.settingsForm.get("sequence")?.value),
    }
    this.schoolService.update(school).subscribe(() => document.location.reload());
  }

  loadDefaultDataAction() {
    this.defaultService.create().subscribe({
      next: (res) => addToMessageService(this.msgService, 'success', 'Success', 'Successfully loaded default data!\n' + res),
      error: (err) => {
        addToMessageService(this.msgService, 'error', 'Error', err.message);
      }
    })
  }

  editATSAction($event: MouseEvent, atsName: ATSName, entity: ATS, inputElement: HTMLInputElement) {
    const editButton = $event.target as HTMLButtonElement;

    if (inputElement.disabled) {
      editButton.textContent = "Save";
      inputElement.disabled = false;
    } else {
      editButton.textContent = "Edit";
      inputElement.disabled = true;
      if (entity.name !== inputElement.value) {
        entity.name = inputElement.value;
        switch (atsName) {
          case ATSName.YEAR: {
            console.log(entity)
            if (AcademicYearUtil.isValid(entity.name)) {
              this.academicYearService.update(entity as AcademicYear).subscribe({
                next: (res) => addToMessageService(this.msgService, 'success', 'Update successful', res.message),
                error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
                complete: () => this.loadSettingsInfo()
              });
            } else {
              addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${entity.name}' is not valid!`);
            }

            break;
          }
          case ATSName.TERM: {
            this.termService.update(entity as Term).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Update successful', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
              complete: () => this.loadSettingsInfo()
            });
            break;
          }
          case ATSName.SEQUENCE: {
            this.sequenceService.update(entity as Sequence).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Update successful', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Update failed', err.message),
              complete: () => this.loadSettingsInfo()
            });
            break;
          }
          default:
            addToMessageService(this.msgService, 'error', 'Error', 'Something has happened');
            break;
        }
      }
    }
  }

  addATSAction($event: MouseEvent, atsName: ATSName, inputElement: HTMLInputElement, seqTermAddInput?: HTMLSelectElement) {
    const addButton = $event.target as HTMLButtonElement;
    if (inputElement.hidden) {
      inputElement.hidden = false;
      addButton.textContent = "Save";
    } else {
      const entityValue = inputElement.value;
      switch (atsName) {
        case ATSName.SEQUENCE: {
          const termId = seqTermAddInput ? parseInt(seqTermAddInput.value) : -1;
          const seq: Sequence = {id: -1, name: entityValue, termId: termId};
          if (seq.termId > 0) {
            this.sequenceService.save(seq).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Success', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
              complete: () => this.loadSettingsInfo()
            });
          } else addToMessageService(this.msgService, 'warn', 'No term selected', 'Select a term first to save the sequence')
          break;
        }
        case ATSName.TERM: {
          const term: Term = {id: -1, name: entityValue};
          this.termService.save(term).subscribe({
            next: (res) => addToMessageService(this.msgService, 'success', 'Success', res.message),
            error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
            complete: () => this.loadSettingsInfo()
          });
          break;
        }
        case ATSName.YEAR: {
          if (AcademicYearUtil.isValid(entityValue)) {
            const year: AcademicYear = {id: -1, name: entityValue};
            this.academicYearService.save(year).subscribe({
              next: (res) => addToMessageService(this.msgService, 'success', 'Success', res.message),
              error: (err) => addToMessageService(this.msgService, 'error', 'Error', err.error.message),
              complete: () => this.loadSettingsInfo()
            });
          } else {
            addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${entityValue}' is not valid!`);
          }
          break;
        }
      }

      inputElement.hidden = true;
      addButton.textContent = "Add";
    }
  }

  // TODO move this to a util module
  getTermBySequenceId(sequenceId: number): Term {
    const sequence = this.sequences.find(seq => seq.id == sequenceId);

    let res: Term[] = [];
    if (sequence) {
      res = this.terms.filter((term) => {
        return sequence.termId == term.id
      });
    }
    return res.length == 1? res[0]: {id: -1, name: 'None'}
  }

  deleteATSAction(number: number, year: AcademicYear) {

  }

  saveSection(sectionInput: HTMLInputElement | Section, blocked: boolean) {
    if (blocked) {
      if (sectionInput instanceof HTMLInputElement) {
        if (sectionInput.hidden && sectionInput.value !== "") {
          const section: Section = {
            id: -1, name: sectionInput.value, schoolId: this.schoolId, category: ""
          }
          this.sectionService.save(section).subscribe(() => {
            sectionInput.value = "";
            this.loadSettingsInfo();
          });
        }
      } else {
        this.sectionService.update(sectionInput).subscribe(() => this.loadSettingsInfo());
      }
    }
  }

  deleteSection(section: Section) {
    this.sectionService.delete(section.id).subscribe(() => this.loadSettingsInfo());
  }
}


