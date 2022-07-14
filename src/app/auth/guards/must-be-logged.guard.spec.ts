import { TestBed } from '@angular/core/testing';

import { MustBeLoggedGuard } from './must-be-logged.guard';

describe('MustBeLoggedGuard', () => {
  let guard: MustBeLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MustBeLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
