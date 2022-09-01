import {Component, OnInit} from '@angular/core';
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevelService} from "../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {SubjectService} from "../../../../services/subject.service";
import {SequenceService} from "../../../../services/sequence.service";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Subject} from "../../../../models/dto/subject.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {SubjectTeacherService} from "../../../../services/subject-teacher.service";
import {UserService} from "../../../../services/user.service";
import {Teacher} from "../../../../models/dto/teacher.model";
import {StudentClassLevel} from "../../../../app.types";

@Component({
  selector: 'app-teacher-class-list',
  templateUrl: './teacher-class-list.component.html',
  styleUrls: ['./teacher-class-list.component.scss']
})
export class TeacherClassListComponent implements OnInit {
  teacher?: Teacher;

  classes: StudentClassLevel[] = [];
  academicYears: AcademicYear[] = [];
  subjects: Subject[] = [];
  sequences: Sequence[] = [];

  constructor(
    private userService: UserService,
    private subjectService: SubjectService,
    private sequenceService: SequenceService,
    private yearService: AcademicYearService,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private subjectTeacherService: SubjectTeacherService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getCompleteFromSession().subscribe(u => {
      this.teacher = u.account as Teacher;
      if (u.account) this.loadData(u.account.id)
    });
  }

  loadData = (teacherId: number) => {
    this.yearService.getAll().subscribe(years => this.academicYears = years);
    this.sequenceService.getAll().subscribe((sequences) => this.sequences = sequences);
    this.subjectTeacherService.getAllByTeacher(teacherId).subscribe((sts) => sts.forEach(st => {
      this.subjectService.getById(st.key.subjectId).subscribe(subject => this.subjects.push(subject));
    }));
    this.classLevelSubService.getAll().subscribe((classLevelSubs) => {
      classLevelSubs.forEach(cls => this.classLevelService.getById(cls.classLevelId).subscribe((cl) => {
        this.classes.push({
          id: cls.id, name: `${cl.name} - ${cls.name}`, sub_id: cls.id, classLevel: cl, classLevelSub: cls
        });
        this.classes.sort((a, b) => a.name < b.name ? -1 : 1);
      }));
    });
  }

}
