import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailAdminComponent } from './post-detail-admin.component';

describe('PostDetailAdminComponent', () => {
  let component: PostDetailAdminComponent;
  let fixture: ComponentFixture<PostDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
