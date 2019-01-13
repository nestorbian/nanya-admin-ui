import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaLeafNewsAdminComponent } from './tea-leaf-news-admin.component';

describe('TeaLeafNewsAdminComponent', () => {
  let component: TeaLeafNewsAdminComponent;
  let fixture: ComponentFixture<TeaLeafNewsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaLeafNewsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaLeafNewsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
