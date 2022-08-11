import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddClassLevelComponent} from './add-class-level.component';

describe('AddClassLevelComponent', () => {
  let component: AddClassLevelComponent;
  let fixture: ComponentFixture<AddClassLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClassLevelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
