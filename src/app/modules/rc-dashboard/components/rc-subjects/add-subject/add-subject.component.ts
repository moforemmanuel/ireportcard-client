import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Section} from "../../../../../models/dto/section.model";
import {SectionService} from "../../../../../services/section.service";
import {LocalStorageUtil} from "../../../../../utils/local-storage.util";
import {Subject} from "../../../../../models/dto/subject.model";
import {SubjectService} from "../../../../../services/subject.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {SchoolService} from "../../../../../services/school.service";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  subjectForm: FormGroup = this.fb.group({});
  sections: Section[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _schoolService: SchoolService,
    private sectionService: SectionService,
    private subjectService: SubjectService
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required], code: ['', Validators.required],
      coeff: ['', Validators.required], section: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const schoolIdOb = this._schoolService.loadSchoolIdLocalStorage();
    schoolIdOb.subscribe((id) => this.loadSections(id));
  }

  loadSections = (schoolId: number) => {
    if (schoolId) {
      this.sectionService.getAllBySchoolId(schoolId).subscribe((sections) => this.sections = sections);
    }
  }

  saveSubjectAction() {
    const subject: Subject = {
      id: -1, name: this.subjectForm.get('name')?.value, code: this.subjectForm.get('code')?.value,
      coefficient: this.subjectForm.get('coeff')?.value, sectionId: this.subjectForm.get('section')?.value
    }
    this.subjectService.save(subject).subscribe((res) => {
      this.router.navigate([`/dashboard/subject`]).then();
    });
  }
}
