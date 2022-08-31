import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Section} from "../../../../../models/dto/section.model";
import {SectionService} from "../../../../../services/section.service";
import {LocalStorageUtil} from "../../../../../utils/local-storage.util";
import {Subject} from "../../../../../models/dto/subject.model";
import {SubjectService} from "../../../../../services/subject.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  subjectForm: FormGroup = this.fb.group({});
  sections: Section[] = [];
  private readonly schoolId = LocalStorageUtil.getSchoolId();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sectionService: SectionService,
    private subjectService: SubjectService
  ) {
    this.loadSections();
    this.subjectForm = this.fb.group({
      name: ['', Validators.required], code: ['', Validators.required],
      coeff: ['', Validators.required], section: [0, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  loadSections = () => {
    if (this.schoolId > 0) {
      this.sectionService.getAllBySchoolId(this.schoolId).subscribe((sections) => this.sections = sections);
    }
  }

  saveSubjectAction() {
    const subject: Subject = {
      id: -1, name: this.subjectForm.get('name')?.value, code: this.subjectForm.get('code')?.value,
      coefficient: this.subjectForm.get('coeff')?.value, sectionId: this.subjectForm.get('section')?.value
    }
    console.log(subject)
    this.subjectService.save(subject).subscribe((res) => {
      this.router.navigate([`/dashboard/subject/view/${res.id}`])
    });
  }
}
