/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KullancisoruComponent } from './kullancisoru.component';

describe('KullancisoruComponent', () => {
  let component: KullancisoruComponent;
  let fixture: ComponentFixture<KullancisoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullancisoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullancisoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
