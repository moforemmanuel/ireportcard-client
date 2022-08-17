import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rc-view-application',
  templateUrl: './rc-view-application.component.html',
  styleUrls: ['./rc-view-application.component.scss']
})
export class RcViewApplicationComponent implements OnInit {
  satId: number = -1;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.satId = this._activatedRoute.snapshot.params['id'];
    if (!this.satId) {
      this._router.navigate(['/dashboard/application']).then();
    }
  }

}
