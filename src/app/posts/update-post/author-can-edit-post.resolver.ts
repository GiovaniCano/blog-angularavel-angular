import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorCanEditPostResolver implements Resolve<Post> {
  constructor(private _postService: PostService, private _router: Router, private _authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    return this._postService.getPost(route.params['id']).pipe(
      tap(post => {
        const sessionId = this._authService.getSession().id
        if(sessionId !== post.user_id) {
          this._router.navigate([`/post/read/${post.id}`])
        }
      })
    )
  }
}
