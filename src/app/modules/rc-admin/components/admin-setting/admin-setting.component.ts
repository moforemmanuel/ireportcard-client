import {Component, OnInit} from '@angular/core';
import {AcademicYearUtil} from "../../../../utils/academic-year.util";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {addToMessageService} from "../../../../utils/message-service.util";
import {Term} from "../../../../models/dto/term.model";
import {Sequence, SequenceType} from "../../../../models/dto/sequence.model";
import {SequenceService} from "../../../../services/sequence.service";
import {TermService} from "../../../../services/term.service";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ATS} from "../../../../app.types";
import {MessageService} from "primeng/api";
import {School} from "../../../../models/dto/school.model";
import {SchoolService} from "../../../../services/school.service";
import {User} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";

enum ATSName {YEAR, TERM, SEQUENCE,}

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {
  showSchoolDialog: boolean = false;
  schools: School[] = [];
  admins: User[] = [];
  schoolForm: FormGroup = this._fb.group({});
  sequenceForm: FormGroup = this._fb.group({});
  terms: Term[] = [];
  years: AcademicYear[] = [];
  sequences: Sequence[] = [];
  sequencesByTerms: { term: Term, sequence: Sequence }[] = [];
  academicYears: AcademicYear[] = [];
  sequenceTypes: string[] = Object.keys(SequenceType);

  constructor(
    private _fb: FormBuilder,
    private msgService: MessageService,
    private _termService: TermService,
    private _userService: UserService,
    private _schoolService: SchoolService,
    private _sequenceService: SequenceService,
    private _academicYearService: AcademicYearService
  ) {
  }

  ngOnInit(): void {
    this.sequenceForm = this._fb.group({
      name: ['', Validators.required], term: [0, Validators.required], type: [SequenceType.OPENING, Validators.required]
    });
    this.schoolForm = this._fb.group({
      name: ['', Validators.required], maxGrade: [20, Validators.required], owner: [-1, [Validators.required, Validators.min(1)]]
    });
    this.loadSettings();
  }

  loadSettings = () => {
    this._userService.getAllAdmin().subscribe(admins => this.admins = admins);
    this._schoolService.getAll().subscribe(schools => this.schools = schools);
    this._sequenceService.getAll().subscribe((sequences) => this.sequences = sequences);
    this._termService.getAll().subscribe((terms) => {
      this.sequencesByTerms = [];
      this.terms = terms;
      this.terms.forEach(term => this._sequenceService.getByTermId(term.id).subscribe((sequences) => {
        sequences.forEach(s => this.sequencesByTerms.push({term: term, sequence: s}))
      }))
    });
    this._academicYearService.getAll().subscribe((years) => this.academicYears = years);
  }


  editYTSAction(atsOrdinal: ATSName, entity: ATS, inputElement: HTMLInputElement) {
    if (inputElement.disabled && inputElement.value) {
      entity.name = inputElement.value;
      if (atsOrdinal == ATSName.YEAR) {
        if (AcademicYearUtil.isValid(entity.name)) {
          this._academicYearService.update(entity as AcademicYear).subscribe(() => this.loadSettings());
        } else {
          addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${entity.name}' is not valid!`);
        }
      } else if (atsOrdinal == ATSName.TERM) {
        this._termService.update(entity as Term).subscribe(() => this.loadSettings());
      } else if (atsOrdinal == ATSName.SEQUENCE) {
        console.log(entity)
        this._sequenceService.update(entity as Sequence).subscribe(() => this.loadSettings());
      }
    }
  }

  addYTSAction(atsOrdinal: ATSName, inputElement: HTMLInputElement) {
    if (inputElement.hidden && inputElement.value !== '') {
      const elValue = inputElement.value;
      if (atsOrdinal == ATSName.YEAR) {
        const year: AcademicYear = {id: -1, name: elValue};
        if (AcademicYearUtil.isValid(elValue)) {
          this._academicYearService.save(year).subscribe(() => this.loadSettings());
        } else {
          addToMessageService(this.msgService, 'warn', 'Invalid Year', `The value '${elValue}' is not valid!`);
        }
      } else if (atsOrdinal == ATSName.TERM) {
        const term: Term = {id: -1, name: elValue};
        this._termService.save(term).subscribe(() => this.loadSettings());
      } else if (atsOrdinal == ATSName.SEQUENCE) {
        const sequence: Sequence = {
          id: -1, termId: this.sequenceForm.get('term')?.value, type: this.sequenceForm.get('type')?.value,
          name: this.sequenceForm.get('name')?.value
        }
        this._sequenceService.save(sequence).subscribe(() => this.loadSettings());
      }
    }
  }

  deleteATSAction(number: number, year: AcademicYear) {

  }


  addNewSchoolAction(submitting: boolean) {
    if (submitting) {

      const school: School = {
        id: -1, name: this.schoolForm.get('name')?.value, ownerId: this.schoolForm.get('owner')?.value,
        applicationOpen: false, maxGrade: this.schoolForm.get('maxGrade')?.value
      }
      this._schoolService.save(school).subscribe((res) => {
        this.showSchoolDialog = false;
        this.loadSettings();
      })
    } else {
      this.showSchoolDialog = true;
    }
  }

  deleteSelectedSchoolAction() {

  }
}
