import { TestBed } from '@angular/core/testing';

import { AuthorCanEditPostResolver } from './author-can-edit-post.resolver';

describe('AuthorCanEditPostResolver', () => {
  let resolver: AuthorCanEditPostResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthorCanEditPostResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
