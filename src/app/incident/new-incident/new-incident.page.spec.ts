import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncidentPage } from './new-incident.page';

describe('NewIncidentPage', () => {
  let component: NewIncidentPage;
  let fixture: ComponentFixture<NewIncidentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIncidentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIncidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
