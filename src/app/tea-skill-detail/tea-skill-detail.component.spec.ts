import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaSkillDetailComponent } from './tea-skill-detail.component';

describe('TeaSkillDetailComponent', () => {
  let component: TeaSkillDetailComponent;
  let fixture: ComponentFixture<TeaSkillDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaSkillDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaSkillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
