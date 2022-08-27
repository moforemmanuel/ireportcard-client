import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentApplication, StudentApplicationTrial} from "../../../../../models/dto/student-application.model";
import {StudentApplicationService} from "../../../../../services/student-application.service";

@Component({
  selector: 'app-student-view-application',
  templateUrl: './student-view-application.component.html',
  styleUrls: ['./student-view-application.component.scss']
})
export class StudentViewApplicationComponent implements OnInit {
  satId: number = -1;
  studentApplication!: StudentApplication;
  studentApplicationTrial!: StudentApplicationTrial;
  studentId: number = -1;
  classSubId: number = -1;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _studentApplicationService: StudentApplicationService,
  ) {

  }

  ngOnInit(): void {
    this.satId = this._activatedRoute.snapshot.params['id'];
    if (this.satId) {
      this.loadStudentApplicationTrial(this.satId);
    } else {
      this._router.navigate(['/student/application']).then();
    }
  }

  loadStudentApplicationTrial = (satId: number) => {
    this._studentApplicationService.getTrial(satId).subscribe((sat) => {
      this.studentApplicationTrial = sat;
      this._studentApplicationService.get(sat.applicationKey).subscribe((application) => {
        this.studentApplication = application;
      });
    });
  }
}
