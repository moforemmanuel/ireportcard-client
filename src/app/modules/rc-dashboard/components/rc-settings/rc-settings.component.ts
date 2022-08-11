import {Component, OnInit} from '@angular/core';
import {addToMessageService} from "../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {Sequence, SequenceType} from "../../../../models/dto/sequence.model";
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

enum ATSName {YEAR, TERM, SEQUENCE,}

@Component({
  selector: 'app-rc-settings',
  templateUrl: './rc-settings.component.html',
  styleUrls: ['./rc-settings.component.scss']
})
export class RcSettingsComponent implements OnInit {

  schoolId: number = -1;
  settingsForm: FormGroup = this.fb.group({});
  sequenceForm: FormGroup = this.fb.group({});
  school?: School;
  sections: Section[] = [];
  terms: Term[] = [];
  sequences: Sequence[] = [];
  sequencesByTerms: { term: Term, sequences: Sequence[] }[] = [];
  academicYears: AcademicYear[] = [];
  sequenceTypes: string[] = Object.keys(SequenceType);

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
    this.loadSchool();
    this.loadSettingsInfo();
    this.settingsForm = this.fb.group({
      applicationsOpen: [false, Validators.required], name: ["", Validators.required], year: [0, Validators.required],
      term: ["", Validators.required], sequence: [0, Validators.required],
      maxGrade: [0, Validators.compose([Validators.min(0), Validators.max(100)])]
    });
    this.sequenceForm = this.fb.group({
      name: ['', Validators.required], term: [0, Validators.required], type: [SequenceType.OPENING, Validators.required]
    });
  }

  initSchoolForm = () => {
    if (this.school) {
      this.settingsForm = this.fb.group({
        applicationsOpen: [this.school.applicationOpen, Validators.required],
        name: [this.school.name ? this.school.name : '', Validators.required],
        year: [this.school.currentYearId ? this.school.currentYearId : -1, Validators.required],
        term: [this.school.currentTerm ? this.school.currentTerm : 'None'],
        sequence: [this.school.currentSequenceId ? this.school : -1, Validators.required],
        maxGrade: [this.school.maxGrade ? this.school.maxGrade : -1, Validators.compose([Validators.min(0), Validators.max(100)])]
      });
    }
  }

  loadSchool(): void {
    this.schoolId = LocalStorageUtil.getSchoolId();
    this.schoolService.getById(this.schoolId).subscribe((school) => {
      localStorage.setItem("school", JSON.stringify(school))
      this.school = school;
      this.initSchoolForm();
    });
  }

  loadDefaultDataAction = () => this.defaultService.create().subscribe();

  loadSettingsInfo(): void {
    this.sectionService.getBySchoolId(this.schoolId).subscribe((sections) => this.sections = sections)
    this.sequenceService.getAll().subscribe((sequences) => this.sequences = sequences);
    this.termService.getAll().subscribe((terms) => {
      this.sequencesByTerms = [];
      this.terms = terms;
      this.terms.forEach(term => this.sequenceService.getByTermId(term.id).subscribe((sequences) => {
        this.sequencesByTerms.push({term: term, sequences: sequences});
      }))
    });
    this.academicYearService.getAll().subscribe((years) => this.academicYears = years);
  }

  saveSettingsAction() {
    const school: School = {
      id: this.schoolId,
      name: this.settingsForm.get('name')?.value,
      applicationOpen: this.settingsForm.get('applicationsOpen')?.value,
      currentYearId: parseInt(this.settingsForm.get("year")?.value),
      maxGrade: this.settingsForm.get('maxGrade')?.value,
      currentSequenceId: parseInt(this.settingsForm.get("sequence")?.value),
    }
    this.schoolService.update(school).subscribe(() => document.location.reload());
  }

  editYTSAction(atsOrdinal: ATSName, entity: ATS, inputElement: HTMLInputElement) {
    if (inputElement.disabled && entity.name !== inputElement.value && inputElement.value) {
      entity.name = inputElement.value;
      if (atsOrdinal == ATSName.YEAR) {
        if (AcademicYearUtil.isValid(entity.name)) {
          this.academicYearService.update(entity as AcademicYear).subscribe(() => this.loadSettingsInfo());
        } else {
          addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${entity.name}' is not valid!`);
        }
      } else if (atsOrdinal == ATSName.TERM) {
        this.termService.update(entity as Term).subscribe(() => this.loadSettingsInfo());
      } else if (atsOrdinal == ATSName.SEQUENCE) {
        this.sequenceService.update(entity as Sequence).subscribe(() => this.loadSettingsInfo());
      }
    }
  }

  addYTSAction(atsOrdinal: ATSName, inputElement: HTMLInputElement) {
    if (inputElement.hidden && inputElement.value !== '') {
      const elValue = inputElement.value;
      if (atsOrdinal == ATSName.YEAR) {
        const year: AcademicYear = {id: -1, name: elValue};
        if (AcademicYearUtil.isValid(elValue)) {
          this.academicYearService.save(year).subscribe(() => this.loadSettingsInfo());
        } else {
          addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${elValue}' is not valid!`);
        }
      } else if (atsOrdinal == ATSName.TERM) {
        const term: Term = {id: -1, name: elValue};
        this.termService.save(term).subscribe(() => this.loadSettingsInfo());
      } else if (atsOrdinal == ATSName.SEQUENCE) {
        const sequence: Sequence = {
          id: -1, termId: this.sequenceForm.get('term')?.value, type: this.sequenceForm.get('type')?.value,
          name: this.sequenceForm.get('name')?.value
        }
        this.sequenceService.save(sequence).subscribe(() => this.loadSettingsInfo());
      }
    }
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
