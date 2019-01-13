import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellKnownTeaComponent } from './well-known-tea.component';

describe('WellKnownTeaComponent', () => {
  let component: WellKnownTeaComponent;
  let fixture: ComponentFixture<WellKnownTeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellKnownTeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellKnownTeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
