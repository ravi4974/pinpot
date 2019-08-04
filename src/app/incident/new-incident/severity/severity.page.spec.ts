import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverityPage } from './severity.page';

describe('SeverityPage', () => {
  let component: SeverityPage;
  let fixture: ComponentFixture<SeverityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeverityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeverityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
