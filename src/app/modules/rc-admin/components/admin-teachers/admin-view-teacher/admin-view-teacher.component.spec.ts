import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminViewTeacherComponent} from './admin-view-teacher.component';

describe('AdminViewTeacherComponent', () => {
  let component: AdminViewTeacherComponent;
  let fixture: ComponentFixture<AdminViewTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewTeacherComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
