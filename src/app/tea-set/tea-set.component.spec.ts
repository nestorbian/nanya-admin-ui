import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaSetComponent } from './tea-set.component';

describe('TeaSetComponent', () => {
  let component: TeaSetComponent;
  let fixture: ComponentFixture<TeaSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
