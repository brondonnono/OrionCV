import { TestBed } from '@angular/core/testing';

import { ConvertDataService } from './convert-data.service';

describe('ConvertDataService', () => {
  let service: ConvertDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
