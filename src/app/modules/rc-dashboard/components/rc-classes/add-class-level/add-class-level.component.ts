import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Section} from "../../../../../models/dto/section.model";
import {ClassLevel} from "../../../../../models/dto/class-level.model";
import {SectionService} from "../../../../../services/section.service";
import {ClassLevelService} from "../../../../../services/class-level.service";
import {Router} from "@angular/router";
import {LocalStorageUtil} from "../../../../../utils/local-storage.util";

@Component({
  selector: 'app-add-class-level',
  templateUrl: './add-class-level.component.html',
  styleUrls: ['./add-class-level.component.scss']
})
export class AddClassLevelComponent implements OnInit {
  classForm: FormGroup = this.fb.group({})

  sections: Section[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sectionService: SectionService,
    private classLevelService: ClassLevelService,
  ) {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      section: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections = () => {
    const schoolId = LocalStorageUtil.getSchoolId();
    this.sectionService.getBySchoolId(schoolId).subscribe(sections => this.sections = sections);
  }

  saveClassAction() {
    const classLevel: ClassLevel = {
      id: -1, name: this.classForm.get('name')?.value,
      sectionId: this.classForm.get('section')?.value
    }
    console.log(classLevel);
    this.classLevelService.save(classLevel).subscribe(() => {
      this.router.navigate(['/dashboard/class']).then()
    })
  }
}
