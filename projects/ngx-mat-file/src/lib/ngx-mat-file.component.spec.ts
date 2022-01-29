import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatFileComponent } from './ngx-mat-file.component';

describe('NgxMatFileComponent', () => {
  let component: NgxMatFileComponent;
  let fixture: ComponentFixture<NgxMatFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
