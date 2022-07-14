import { TestBed } from '@angular/core/testing';

import { RedirectIfLoggedGuard } from './redirect-if-logged.guard';

describe('RedirectIfLoggedGuard', () => {
  let guard: RedirectIfLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectIfLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
