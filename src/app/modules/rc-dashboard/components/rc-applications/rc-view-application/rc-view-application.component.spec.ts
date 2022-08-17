import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcViewApplicationComponent } from './rc-view-application.component';

describe('RcViewApplicationComponent', () => {
  let component: RcViewApplicationComponent;
  let fixture: ComponentFixture<RcViewApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcViewApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcViewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
