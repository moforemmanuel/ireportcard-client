import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcSelectSchoolComponent} from './rc-select-school.component';

describe('SelectSchoolComponent', () => {
  let component: RcSelectSchoolComponent;
  let fixture: ComponentFixture<RcSelectSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcSelectSchoolComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcSelectSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
