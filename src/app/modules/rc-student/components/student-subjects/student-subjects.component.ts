import {Component, OnInit} from '@angular/core';
import {Student} from "../../../../models/dto/student.model";
import {UserService} from "../../../../services/user.service";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {StudentApplicationTrial} from "../../../../models/dto/student-application.model";
import {SchoolService} from "../../../../services/school.service";
import {SubjectRegistrationService} from "../../../../services/subject-registration.service";
import {RcSubjectRegistered} from "../../../../app.types";
import {SubjectService} from "../../../../services/subject.service";

@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.scss']
})
export class StudentSubjectsComponent implements OnInit {
  student!: Student;
  currentTrial?: StudentApplicationTrial;
  studentApplicationTrials: StudentApplicationTrial[] = [];
  subjectsRegistered: RcSubjectRegistered[] = [];

  constructor(
    private userService: UserService,
    private schoolService: SchoolService,
    private subjectService: SubjectService,
    private studentApplicationService: StudentApplicationService,
    private subjectRegistrationService: SubjectRegistrationService,
  ) {
  }

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent = () => {
    this.userService.getCompleteFromSession().subscribe(user => {
      this.student = user.account as Student;
      this.schoolService.getById(this.student.schoolId).subscribe(school => {
        this.studentApplicationService.getTrialByStudent(this.student.id).subscribe((res) => {
          this.currentTrial = res.find(sat => sat.academicYearId == school.currentYearId);
          if (this.currentTrial) {
            this.loadSubjects(this.currentTrial.id);
          }
        });
      });
    });
  }

  loadSubjects = (satId: number) => {
    this.subjectRegistrationService.getBySatId(satId).subscribe((res) => {
      this.subjectsRegistered = [];
      res.forEach(sr => this.subjectService.getById(sr.id).subscribe(subject => {
        this.subjectsRegistered.push({registration: sr, subject: subject});
      }));
      console.log(this.subjectsRegistered)
    })
  }

}
