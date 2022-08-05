import {Component, OnInit} from '@angular/core';
import {
  ApplicationRequest,
  ApplicationResponse,
  StudentApplicationTrial
} from "../../../../models/dto/student-application.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevelService} from "../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  StudentApplicationComponent
} from "./student-application/student-application.component";
import {SAT, StudentClassLevel} from "../../../../app.types";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";


@Component({
  selector: 'app-rc-applications',
  templateUrl: './rc-applications.component.html',
  styleUrls: ['./rc-applications.component.scss']
})
export class RcApplicationsComponent implements OnInit {
  schoolId: number = -1;
  applicationsQueried: boolean = false;

  studentApplicationTrials: StudentApplicationTrial[] = [];

  studentATs: SAT[] = [];
  applicationRequest: { class_id: number; year_id: number };

  academicYears: AcademicYear[] = [];
  classes: StudentClassLevel[] = []

  constructor(
    private modalService: NgbModal,
    private classService: ClassLevelService,
    private classSubService: ClassLevelSubService,
    private academicYearService: AcademicYearService,
    private studentApplicationService: StudentApplicationService
  ) {
    this.schoolId = LocalStorageUtil.getSchoolId();
    this.applicationRequest = {year_id: -1, class_id: -1}
  }

  ngOnInit(): void {
    this.loadAcademicYears();
    this.loadClasses();
    const loadApplicationsInterval = setInterval(() => {
      if (this.applicationsQueried) clearInterval(loadApplicationsInterval);
      else this.loadApplications();
    }, 1000);
  }

  loadAcademicYears() {
    this.academicYearService.getAll().subscribe((years) => {
      this.academicYears = years;
      if (years.length > 0) this.applicationRequest.year_id = years[0].id
    });
  }

  loadClasses() {
    this.classService.getBySchool(this.schoolId).subscribe({
      next: (classes) => {
        classes.forEach(c => this.classSubService.getAllByClassLevelId(c.id)
          .subscribe( (classSubs) => {
            classSubs.forEach((cs) => {
              this.classes.push({id:c.id, sub_id: cs.id, name: `${c.name} ${cs.name}`, classLevel: c, classLevelSub: cs});
            });
            if (this.classes.length > 0) this.applicationRequest.class_id = this.classes[0].sub_id
          }))
      }
    });
  }

  loadApplications() {
    this.studentATs = [];
    console.log(this.applicationRequest);
    if (this.applicationRequest.year_id > 0 ) {
      const classId: number = this.applicationRequest.class_id;
      const yearId: number = this.applicationRequest.year_id;
      this.studentApplicationService.getTrialByClassAndYear(classId, yearId).subscribe({
        next: (response) => {
          this.studentApplicationTrials = response;
          response.forEach((sat) => {
            this.studentApplicationService.get(sat.applicationKey).subscribe((studentApplication) => {
              this.studentATs.push({sat: sat, application: studentApplication, student: studentApplication.student});
            })
          });
        },
        complete: () => this.applicationsQueried = true
      });
    } else this.studentATs = [];
  }

  deleteSatAction(id: number) {
    this.studentApplicationService.deleteTrial(id).subscribe(() => this.loadApplications());
  }
}
