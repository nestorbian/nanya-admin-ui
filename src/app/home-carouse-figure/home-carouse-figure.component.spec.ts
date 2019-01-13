import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouseFigureComponent } from './home-carouse-figure.component';

describe('HomeCarouseFigureComponent', () => {
  let component: HomeCarouseFigureComponent;
  let fixture: ComponentFixture<HomeCarouseFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCarouseFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarouseFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
