import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { mT } from 'src/app/helpers';
import { Category } from 'src/app/interfaces';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ByCategoryComponent implements OnInit, OnDestroy {
  private navigationSubs?: Subscription

  posts$: Observable<Post[]> = this._route.params.pipe(
    switchMap(params => {
      const page: number = params['page'] ? +params['page'] : 1
      const categoryId: number = params['category'] ? +params['category'] : 0
      return this._postService.getPostsByCategory(page, categoryId).pipe(
        tap(res => {
          const postsPerPage = environment.postsPerPage
          this.lastPage = Math.ceil(res.count / postsPerPage)
          this.currentPage = page
          this.category = res.category

          const baseLink:string = `/post/category/${this.category.id}/page/`
          this.firstLink = baseLink + 1
          this.lastLink = baseLink + this.lastPage
          this.prevPageLink = baseLink + (this.currentPage-1)
          this.nextPageLink = baseLink + (this.currentPage+1)

          this._title.setTitle(mT(this.category.name))
        }),
        map(res => res.posts)
      )
    })
  )

  baseImageUrl:string = environment.API_BASE_URL + 'post/image/'

  category!: Category
  currentPage!: number
  lastPage!: number

  firstLink!:string
  lastLink!:string
  prevPageLink!:string
  nextPageLink!:string
  
  constructor(
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _viewport: ViewportScroller,
    private _title: Title,
    private _postService: PostService
  ) { }

  ngOnInit(): void {
    this.navigationSubs = this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this._viewport.scrollToPosition([0,0])
    })
  }

  ngOnDestroy(): void {
    this.navigationSubs?.unsubscribe()
  }
}
