import {Component, OnInit} from '@angular/core';
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevelService} from "../../../../services/class-level.service";
import {SubjectService} from "../../../../services/subject.service";
import {SequenceService} from "../../../../services/sequence.service";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Subject} from "../../../../models/dto/subject.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {SectionService} from "../../../../services/section.service";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {StudentClassLevel} from "../../../../app.types";

@Component({
  selector: 'app-rc-classlists',
  templateUrl: './rc-class-lists.component.html',
  styleUrls: ['./rc-class-lists.component.scss']
})
export class RcClassListsComponent implements OnInit {
  private readonly schoolId = LocalStorageUtil.readSchoolId();
  classes: StudentClassLevel[] = [];
  academicYears: AcademicYear[] = [];
  subjects: Subject[] = [];
  sequences: Sequence[] = [];

  constructor(
    private _sectionService: SectionService,
    private _subjectService: SubjectService,
    private _sequenceService: SequenceService,
    private _classLevelService: ClassLevelService,
    private _academicYearService: AcademicYearService,
    private _classLevelSubService: ClassLevelSubService,
  ) {
  }

  ngOnInit(): void {

    this.loadClasses();
    this._academicYearService.getAll().subscribe(years => this.academicYears = years);
    this._subjectService.getAll().subscribe((subjects) => this.subjects = subjects);
    this._sequenceService.getAll().subscribe((sequences) => this.sequences = sequences);
  }

  loadClasses() {
    if (this.schoolId) {
      this._sectionService.getAllBySchoolId(this.schoolId).subscribe((sections) => {
        sections.forEach((section) => this._classLevelService.getBySection(section.id).subscribe((classLevels) => {
          classLevels.forEach((cl) => this._classLevelSubService.getAllByClassLevelId(cl.id).subscribe((classLevelSubs) => {
            classLevelSubs.forEach((cls) => this.classes.push({
              id: cl.id, sub_id: cls.id, classLevel: cl, classLevelSub: cls, name: `${cl.name} ${cls.name}`
            }));
            this.classes.sort((a, b) => a.name < b.name ? -1 : 1);
          }));
        }));
      });
    }
  }
}
