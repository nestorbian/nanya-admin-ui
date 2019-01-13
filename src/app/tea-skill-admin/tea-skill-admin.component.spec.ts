import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaSkillAdminComponent } from './tea-skill-admin.component';

describe('TeaSkillAdminComponent', () => {
  let component: TeaSkillAdminComponent;
  let fixture: ComponentFixture<TeaSkillAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaSkillAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaSkillAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
