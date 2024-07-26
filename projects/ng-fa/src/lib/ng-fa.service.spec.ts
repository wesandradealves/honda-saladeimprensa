import { TestBed } from '@angular/core/testing';

import { NgFaService } from './ng-fa.service';

describe('NgFaService', () => {
  let service: NgFaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
