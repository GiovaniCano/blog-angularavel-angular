import { TestBed } from '@angular/core/testing';

import { MustBeVerifiedGuard } from './must-be-verified.guard';

describe('MustBeVerifiedGuard', () => {
  let guard: MustBeVerifiedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MustBeVerifiedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
