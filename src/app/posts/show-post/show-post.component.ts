import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { mT } from 'src/app/helpers';
import { ModalsService } from 'src/app/modals/modals.service';
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
export class ShowPostComponent implements OnDestroy{
  private modalSubs?: Subscription
  private deleteSubs?: Subscription

  baseImageUrl: string = environment.API_BASE_URL + 'post/image/'

  post$: Observable<Post> = this._route.params.pipe(
    switchMap(params => this._postService.getPost(params['id']).pipe(
      tap(post => this._title.setTitle(mT(post.title)))
    ))
  )

  userIdSession$: Observable<number> = this._authService.session$.pipe(
    map(session => session.id)
  )

  showDeleteConfirmModal: boolean = false

  constructor(
    private _postService: PostService, 
    private _route: ActivatedRoute, 
    private _title: Title,
    private _authService: AuthService,
    private _modalsService: ModalsService,
    private _router: Router
  ) { }

  deletePost(id: number) {
    this.showDeleteConfirmModal =true

    this.modalSubs = this._modalsService.confirmModal$.subscribe(
      response => {
        this.showDeleteConfirmModal = false
        if(response === true) {
          this.deleteSubs = this._postService.deletePost(id).subscribe(
            () => this._router.navigate(['/'])
          )
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.modalSubs?.unsubscribe()
    this.deleteSubs?.unsubscribe()
  }
}
