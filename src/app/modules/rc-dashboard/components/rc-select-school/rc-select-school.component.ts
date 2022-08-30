import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {School} from "../../../../models/dto/school.model";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Observable} from "rxjs";

@Component({
  selector: 'rc-app-select-school',
  templateUrl: './rc-select-school.component.html',
  styleUrls: ['./rc-select-school.component.scss']
})
export class RcSelectSchoolComponent implements OnInit {

  selectedSchoolId: number = -1;
  @Input() schools: School[] = [];
  @Output() onSchoolSelect = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    const schoolsOb = new Observable<School[]>((schools) => {
      setTimeout(() => schools.next(this.schools), 1000);
    });

    schoolsOb.subscribe((s) => {
      if (s.length == 1) {
        this.selectedSchoolId = this.schools[0].id;
        this.setSchoolAction();
      }
    });
  }


  setSchoolAction() {
    if (this.selectedSchoolId > 0) {
      LocalStorageUtil.writeSchoolId(this.selectedSchoolId);
      this.onSchoolSelect.emit(true);
    } else {
      alert("Select a school to continue") // TODO produce a modal component for alerts, confirmations and messages
    }
  }
}
