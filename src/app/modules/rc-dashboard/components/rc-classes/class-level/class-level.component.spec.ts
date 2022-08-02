import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassLevelComponent} from './class-level.component';

describe('SaveClassComponent', () => {
  let component: ClassLevelComponent;
  let fixture: ComponentFixture<ClassLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassLevelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
