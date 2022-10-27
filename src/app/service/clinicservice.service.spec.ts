import { TestBed } from '@angular/core/testing';

import { ClinicserviceService } from './clinicservice.service';

describe('ClinicserviceService', () => {
  let service: ClinicserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
