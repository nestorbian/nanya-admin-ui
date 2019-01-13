import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaHistoryComponent } from './tea-history.component';

describe('TeaHistoryComponent', () => {
  let component: TeaHistoryComponent;
  let fixture: ComponentFixture<TeaHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
