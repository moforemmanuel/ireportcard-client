import {Component, OnInit} from '@angular/core';
import {SchoolService} from "../../services/school.service";
import {School} from "../../models/dto/school.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageUtil} from "../../utils/local-storage.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-school',
  templateUrl: './select-school.component.html',
  styleUrls: ['./select-school.component.scss']
})
export class SelectSchoolComponent implements OnInit {

  showSchoolForm: boolean = false;
  selectedSchoolId: number = -1;
  schools: School[] = [];
  addSchoolForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private schoolService: SchoolService,) {
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
      this.router.navigate(['/dashboard/home']).then();
    }
  }

  loadSchools = () => {
    this.schoolService.getAll().subscribe((schools) => this.schools = schools);
  }

  toggleSchoolForm() {
    this.showSchoolForm = !this.showSchoolForm;
  }

  addSchoolAction() {
    const school: School = {
      id: -1, name: this.addSchoolForm.get('name')?.value, max_grade: this.addSchoolForm.get('maxGrade')?.value,
      application_is_open: this.addSchoolForm.get('applicationOpen')?.value,
    }
    this.schoolService.save(school).subscribe(() => this.loadSchools());
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
