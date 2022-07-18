import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { mT } from 'src/app/helpers';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPostComponent implements OnInit {
  baseImageUrl: string = environment.API_BASE_URL + 'post/image/'

  post$: Observable<Post> = this._route.params.pipe(
    switchMap(params => this._postService.getPost(params['id']).pipe(
      tap(post => this._title.setTitle(mT(post.title)))
    ))
  )

  userIdSession$: Observable<number> = this._authService.session$.pipe(
    map(session => session.id)
  )

  constructor(
    private _postService: PostService, 
    private _route: ActivatedRoute, 
    private _title: Title,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
