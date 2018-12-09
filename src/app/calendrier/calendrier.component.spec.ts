import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CalendrierComponent } from './calendrier.component';

describe('CalendrierComponent', () => {
  let component: CalendrierComponent;
  let fixture: ComponentFixture<CalendrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendrierComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Date start inf to Date end', () => {
    fixture = TestBed.createComponent(CalendrierComponent);
    component = fixture.componentInstance;

    component.d_start = '12/05/2018';
    component.d_end = '15/05/2018';
    expect(component.getDayInDate()).toBe(true);
  });
});
