import { TestBed } from '@angular/core/testing';

import { NgxMatFileService } from './ngx-mat-file.service';

describe('NgxMatFileService', () => {
  let service: NgxMatFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
