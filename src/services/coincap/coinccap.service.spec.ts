import { TestBed } from '@angular/core/testing';

import { CoinccapService } from './coinccap.service';

describe('CoinccapService', () => {
  let service: CoinccapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinccapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
