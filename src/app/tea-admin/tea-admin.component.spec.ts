import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaAdminComponent } from './tea-admin.component';

describe('TeaAdminComponent', () => {
  let component: TeaAdminComponent;
  let fixture: ComponentFixture<TeaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
