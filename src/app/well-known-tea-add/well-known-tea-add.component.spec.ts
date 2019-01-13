import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellKnownTeaAddComponent } from './well-known-tea-add.component';

describe('WellKnownTeaAddComponent', () => {
  let component: WellKnownTeaAddComponent;
  let fixture: ComponentFixture<WellKnownTeaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellKnownTeaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellKnownTeaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
