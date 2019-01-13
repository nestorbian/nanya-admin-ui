import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoAdminComponent } from './user-info-admin.component';

describe('UserInfoAdminComponent', () => {
  let component: UserInfoAdminComponent;
  let fixture: ComponentFixture<UserInfoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
