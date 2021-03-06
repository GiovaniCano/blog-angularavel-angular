import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {
  private navigationSubs!: Subscription

  posts$: Observable<Post[]> = this._route.params.pipe(
    switchMap(params => {
      const page: number = params['page'] ? +params['page'] : 1
      return this._postService.getAllPosts(page).pipe(
        tap(res => {
          const postsPerPage = environment.postsPerPage
          this.lastPage = Math.ceil(res.count / postsPerPage)
          this.currentPage = page
        }),
        map(res => res.posts)
      )
    })
  )

  baseImageUrl:string = environment.API_BASE_URL + 'post/image/'

  currentPage!: number 
  lastPage!: number
  
  constructor(
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _viewport: ViewportScroller,
    private _postService: PostService
  ) { }

  ngOnInit(): void {
    this.navigationSubs = this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this._viewport.scrollToPosition([0,0])
    })
  }

  ngOnDestroy(): void {
    this.navigationSubs.unsubscribe()
  }
}
