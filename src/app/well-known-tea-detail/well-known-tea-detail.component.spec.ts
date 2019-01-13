import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellKnownTeaDetailComponent } from './well-known-tea-detail.component';

describe('WellKnownTeaDetailComponent', () => {
  let component: WellKnownTeaDetailComponent;
  let fixture: ComponentFixture<WellKnownTeaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellKnownTeaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellKnownTeaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
