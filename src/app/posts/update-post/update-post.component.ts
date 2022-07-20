import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable, Subscription} from 'rxjs';
import { validateImage } from 'src/app/forms-extensions/image.validator';
import { mT } from 'src/app/helpers';
import { Category } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatePostComponent implements OnInit, OnDestroy {
  private updateSubs?: Subscription
  private routeResolverSubs!: Subscription

  categories$: Observable<Category[]> = this._postService.getCategories()

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    category_id: new FormControl(0, [Validators.required, Validators.min(1)]),
    content: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(65535)]),
    image: new FormControl('', []),
  })

  imageFile?: File

  baseImageUrl: string = environment.API_BASE_URL + 'post/image/'
  currentImage: string = ''

  get title() { return this.form.get('title') as FormControl }
  get category_id() { return this.form.get('category_id') as FormControl }
  get content() { return this.form.get('content') as FormControl }
  get image() { return this.form.get('image') as FormControl }

  // https://github.com/kolkov/angular-editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '20rem',
    placeholder: 'Start writing your post...',
    toolbarHiddenButtons: [
      [
        'subscript',
        'fontName'
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ]
  }

  postId!: number

  constructor(
    private _postService: PostService, 
    private _router: Router, 
    private _route: ActivatedRoute, 
    private _title: Title
  ) { }

  onSubmit() {
    const form = this.form.controls

    const body = new FormData()
      body.append('title', form.title.value ?? '')
      body.append('category_id', form.category_id.value?.toString() ?? '')
      body.append('content', form.content.value ?? '')
      body.append('_method', 'put')
      if(this.imageFile) body.append('image', this.imageFile)

    this.updateSubs = this._postService.updatePost(body, this.postId).subscribe(post => this._router.navigate([`/post/read/${post.id}`]))
  }

  setImage(event: any) {
    const image = event.target.files[0]
    const errors = validateImage(image)
    if (errors) {
      this.form.controls.image.setErrors(errors)
    } else {
      this.imageFile = image
    }
  }

  ngOnInit(): void {
    this.routeResolverSubs = this._route.data.subscribe(response => {
      const post = response['post']

      this._title.setTitle(mT(`Edit: ${post.title}`))
      this.postId = post.id

      this.title.setValue(post.title)
      this.category_id.setValue(post.category_id)
      this.content.setValue(post.content)
      this.currentImage = post.image
    })
  }

  ngOnDestroy(): void {
    this.updateSubs?.unsubscribe()
    this.routeResolverSubs.unsubscribe()
  }

}
