import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaSetNewsComponent } from './tea-set-news.component';

describe('TeaSetNewsComponent', () => {
  let component: TeaSetNewsComponent;
  let fixture: ComponentFixture<TeaSetNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaSetNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaSetNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
