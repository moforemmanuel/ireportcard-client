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
  terms: Term[] = [];
  sequences: Sequence[] = [];
  academicYears: AcademicYear[] = [];

  constructor(
    private fb: FormBuilder,
    private msgService: MessageService,
    private defaultService: DefaultService,
    private schoolService: SchoolService,
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
        applicationsOpen: [this.school.application_open, Validators.required],
        name: [this.school.name, Validators.required],
        year: [this.school.curr_year_id, Validators.required],
        term: [this.school.curr_term],
        sequence: [this.school.curr_seq_id, Validators.required],
        maxGrade: [this.school.max_grade, Validators.compose([Validators.min(0), Validators.max(100)])]
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
    this.sequenceService.getAll().subscribe({
      next: (sequences) => {
        this.sequences = sequences
        console.log(this.school)
      },
    });
    this.termService.getAll().subscribe({
      next: (terms) => this.terms = terms,
    });
    this.academicYearService.getAll().subscribe({
      next: (years) => this.academicYears = years,
    });
  }

  saveSettingsAction() {
    const school: School = {
      id: this.schoolId,
      name: this.settingsForm.get('name')?.value,
      application_open: this.settingsForm.get('applicationsOpen')?.value,
      max_grade: this.settingsForm.get('maxGrade')?.value,
      curr_year_id: parseInt(this.settingsForm.get("year")?.value),
      curr_seq_id: parseInt(this.settingsForm.get("sequence")?.value),
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
          const seq: Sequence = {id: -1, name: entityValue, term_id: termId};
          if (seq.term_id > 0) {
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
        return sequence.term_id == term.id
      });
    }

    switch (res.length) {
      case 0:
        return {id: -1, name: 'None'};
      case 1:
        return res[0];
      default:
        return {id: -1, name: 'None'};
    }
  }

  deleteATSAction(number: number, year: AcademicYear) {

  }
}


