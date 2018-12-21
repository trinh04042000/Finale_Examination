import { TestBed } from '@angular/core/testing';

import { AwesomeService } from './awesome.service';

describe('AwesomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwesomeService = TestBed.get(AwesomeService);
    expect(service).toBeTruthy();
  });
});
