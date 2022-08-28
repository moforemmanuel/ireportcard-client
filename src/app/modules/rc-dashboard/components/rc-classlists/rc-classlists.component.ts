import {Component, OnInit} from '@angular/core';
import {ClassListRequest, ClassListResponse} from "../../../../models/dto/classlist.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevelService} from "../../../../services/class-level.service";
import {SubjectService} from "../../../../services/subject.service";
import {SequenceService} from "../../../../services/sequence.service";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Subject} from "../../../../models/dto/subject.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassListService} from "../../../../services/class-list.service";
import {Grade} from "../../../../models/dto/grade.model";
import {GradeService} from "../../../../services/grade.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";

@Component({
  selector: 'app-rc-classlists',
  templateUrl: './rc-classlists.component.html',
  styleUrls: ['./rc-classlists.component.scss']
})
export class RcClasslistsComponent implements OnInit {

  classes: { id: number, name: string }[] = [];
  academicYears: AcademicYear[] = [];
  subjects: Subject[] = [];
  sequences: Sequence[] = [];

  constructor(
    private yearService: AcademicYearService,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private subjectService: SubjectService,
    private sequenceService: SequenceService,
  ) {
  }

  ngOnInit(): void {
    this.loadClasses();
    this.yearService.getAll().subscribe(years => this.academicYears = years);
    this.subjectService.getAll().subscribe((subjects) => this.subjects = subjects);
    this.sequenceService.getAll().subscribe((sequences) => this.sequences = sequences);
  }

  loadClasses() {
    this.classLevelSubService.getAll().subscribe((classLevelSubs) => {
      classLevelSubs.forEach(classSub => {
        this.classLevelService.getById(classSub.classLevelId).subscribe((classLevel) => {
          this.classes.push({id: classSub.id, name: `${classLevel.name} - ${classSub.name}`});
          this.classes.sort((a, b) => a.name < b.name ? -1 : 1);
        });
      });
    });
  }
}
