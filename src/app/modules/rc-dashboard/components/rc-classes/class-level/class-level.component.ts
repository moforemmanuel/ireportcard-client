import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClassLevel} from "../../../../../models/dto/class-level.model";
import {ClassLevelSubService} from "../../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../../models/dto/class-level-sub.model";
import {addToMessageService} from "../../../../../utils/message-service.util";
import {MessageService} from "primeng/api";
import {ClassLevelService} from "../../../../../services/class-level.service";
import {SectionService} from "../../../../../services/section.service";
import {Section} from "../../../../../models/dto/section.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-class',
  templateUrl: './class-level.component.html',
  styleUrls: ['./class-level.component.scss']
})
export class ClassLevelComponent implements OnInit {
  classForm: FormGroup;
  classLevel: ClassLevel = {id: -1, name: '', sectionId: -1};
  section: Section;
  classLevelSubs: ClassLevelSub[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private classLevelService: ClassLevelService, private sectionService: SectionService,
    private classLevelSubService: ClassLevelSubService, private msg: MessageService) {

    this.classForm = this.fb.group({
      name: ['', Validators.required],
      classLevels: this.fb.array([])
    });
    this.section = {id: -1, name: '', category: '', schoolId: -1}

    const classId = this.activatedRoute.snapshot.params['id'];
    this.classLevelService.getById(classId).subscribe({
      next: (classLevel) => {
        this.classLevel = classLevel;
        this.loadData(classLevel);
      },
      error: () => this.router.navigate(['/class']).then()
    });
  }

  get classLevelSubForms() {
    return this.classForm.get('classLevels') as FormArray;
  }

  ngOnInit(): void {

  }

  loadData(classLevel: ClassLevel) {
    this.setClassLevelSection(classLevel.sectionId);
    this.classLevelSubService.getAllByClassLevelId(classLevel.id).subscribe((cls) => {
      this.classLevelSubs = cls;
      console.log(cls)
    });
  }

  setClassLevelSection(sectionId: number) {
    this.sectionService.getById(sectionId).subscribe({
      next: (section: Section) => {
        this.section = section;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  resetClassLevel(sectionId: number) {
    console.log(sectionId)
    this.classLevel = {id: -1, sectionId: sectionId, name: '', classLevelSubs: []}
    this.setClassLevelSection(sectionId);
  }

  loadClassLevelSubs(classLevel: ClassLevel): void {
    if (classLevel.id > 0) {
      this.classLevelSubService.getAllByClassLevelId(classLevel.id).subscribe({
        next: (classLevelSubs) => {
          this.classLevelSubs = classLevelSubs;
          classLevelSubs.forEach(classLevelSub => {
            this.classLevelSubForms.push(this.fb.group({
              subName: [classLevelSub.name, Validators.required]
            }))
          });
        },
        error: () => addToMessageService(this.msg, 'warn', 'Warning!', 'Unable to retrieve class level subs')
      });
    }
  }

  saveClassLevelSub(classLevelSubInput: HTMLInputElement, classLevelSub: ClassLevelSub) {
    console.log(classLevelSubInput.value);
    classLevelSub.name = classLevelSubInput.value;
    if (classLevelSub.id < 0) {
      this.classLevelSubService.save(classLevelSub).subscribe({
        next: (res) => addToMessageService(this.msg, 'success', 'Save successful', res.message),
        error: (err) => addToMessageService(this.msg, 'error', 'Save failed', err.message)
      });
    } else {
      this.classLevelSubService.update(classLevelSub).subscribe({
        next: (res) => addToMessageService(this.msg, 'success', 'Update successful', res.message),
        error: (err) => addToMessageService(this.msg, 'error', 'Update failed', err.message)
      });
    }
  }
}
