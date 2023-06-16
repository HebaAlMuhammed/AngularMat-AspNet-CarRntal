/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AracComponent } from './arac.component';

describe('AracComponent', () => {
  let component: AracComponent;
  let fixture: ComponentFixture<AracComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
