import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaSkillUserComponent } from './tea-skill-user.component';

describe('TeaSkillUserComponent', () => {
  let component: TeaSkillUserComponent;
  let fixture: ComponentFixture<TeaSkillUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaSkillUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaSkillUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
