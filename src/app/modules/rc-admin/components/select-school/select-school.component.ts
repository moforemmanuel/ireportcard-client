import {Component, OnInit} from '@angular/core';
import {SchoolService} from "../../../../services/school.service";
import {School} from "../../../../models/dto/school.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Router} from "@angular/router";
import {ReportCardService} from "../../../../services/report-card.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/dto/user.model";

@Component({
  selector: 'app-select-school',
  templateUrl: './select-school.component.html',
  styleUrls: ['./select-school.component.scss']
})
export class SelectSchoolComponent implements OnInit {

  selectedSchoolId: number = -1;
  schools: School[] = [];
  addSchoolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolService,
    private userService: UserService,
    private reportCardService: ReportCardService
  ) {
    const sid = LocalStorageUtil.readSchoolId();
    if (sid) {
      this.selectedSchoolId = sid;
    }
    this.addSchoolForm = this.fb.group({
      name: ["", Validators.required],
      maxGrade: [20, Validators.required],
      applicationOpen: [false, Validators.required],
    })
  }

  ngOnInit(): void {
    this.redirectToDashboard();
    this.loadSchools();
  }

  redirectToDashboard = () => {
    if (LocalStorageUtil.readSchoolId()) {
      console.log("Already selected school: " + LocalStorageUtil.readSchoolId());
      this.router.navigate(['/dashboard']).then();
    }
  }

  loadSchools = () => {
    this.schoolService.getAll().subscribe((schools) => this.schools = schools);
  }

  addSchoolAction() {
    const saveSchool = (user: User) => {
      const school: School = {
        id: -1, name: this.addSchoolForm.get('name')?.value, maxGrade: this.addSchoolForm.get('maxGrade')?.value,
        applicationOpen: this.addSchoolForm.get('applicationOpen')?.value, ownerId: user.id
      }
      this.schoolService.save(school).subscribe(() => this.loadSchools());
    }
    this.reportCardService.testAuthAdmin().subscribe(res => {
      if (res) {
        this.userService.getCompleteFromSession().subscribe(user => saveSchool(user.user))
      }
    });
  }

  setSchoolAction() {
    if (this.selectedSchoolId > 0) {
      console.log("e")
      LocalStorageUtil.writeSchoolId(this.selectedSchoolId);
      this.redirectToDashboard();
    } else {
      alert("Select a school to continue") // TODO produce a modal component for alerts, confirmations and messages
    }
  }
}
