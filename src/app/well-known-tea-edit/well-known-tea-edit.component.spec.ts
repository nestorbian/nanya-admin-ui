import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellKnownTeaEditComponent } from './well-known-tea-edit.component';

describe('WellKnownTeaEditComponent', () => {
  let component: WellKnownTeaEditComponent;
  let fixture: ComponentFixture<WellKnownTeaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellKnownTeaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellKnownTeaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
