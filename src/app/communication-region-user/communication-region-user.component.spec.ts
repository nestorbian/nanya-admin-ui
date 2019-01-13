import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationRegionUserComponent } from './communication-region-user.component';

describe('CommunicationRegionUserComponent', () => {
  let component: CommunicationRegionUserComponent;
  let fixture: ComponentFixture<CommunicationRegionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationRegionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationRegionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
