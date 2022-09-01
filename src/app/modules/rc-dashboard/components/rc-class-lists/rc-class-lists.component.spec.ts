import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcClassListsComponent} from './rc-class-lists.component';

describe('RcClasslistsComponent', () => {
  let component: RcClassListsComponent;
  let fixture: ComponentFixture<RcClassListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RcClassListsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcClassListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
