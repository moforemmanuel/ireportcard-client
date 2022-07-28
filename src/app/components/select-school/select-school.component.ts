import {Component, OnInit} from '@angular/core';
import {SchoolService} from "../../services/school.service";
import {SchoolSettingsService} from "../../services/school-settings.service";
import {School} from "../../models/dto/school.model";

@Component({
  selector: 'app-select-school',
  templateUrl: './select-school.component.html',
  styleUrls: ['./select-school.component.scss']
})
export class SelectSchoolComponent implements OnInit {

  schools: School[] = [];

  constructor(
    private schoolService: SchoolService,
    private schoolSettingService: SchoolSettingsService
  ) {
  }

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools = () => {
    this.schoolService.getAll().subscribe((schools) => this.schools = schools);
  }

}
