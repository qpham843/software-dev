import { TestBed } from '@angular/core/testing';

import { BuzzQueryService } from './buzz-query.service';

describe('BuzzQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuzzQueryService = TestBed.get(BuzzQueryService);
    expect(service).toBeTruthy();
  });
});
