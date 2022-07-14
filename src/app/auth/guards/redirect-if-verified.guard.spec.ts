import { TestBed } from '@angular/core/testing';

import { RedirectIfVerifiedGuard } from './redirect-if-verified.guard';

describe('RedirectIfVerifiedGuard', () => {
  let guard: RedirectIfVerifiedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectIfVerifiedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
