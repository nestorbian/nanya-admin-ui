import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaLeafNewsComponent } from './tea-leaf-news.component';

describe('TeaLeafNewsComponent', () => {
  let component: TeaLeafNewsComponent;
  let fixture: ComponentFixture<TeaLeafNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaLeafNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaLeafNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
