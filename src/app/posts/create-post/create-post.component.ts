import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { validateImage } from 'src/app/forms-extensions/image.validator';
import { Category } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostComponent implements OnDestroy {
  private createSubs?: Subscription

  categories$: Observable<Category[]> = this._postService.getCategories()

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    category_id: new FormControl(0, [Validators.required, Validators.min(1)]),
    content: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(65535)]),
    image: new FormControl('', [Validators.required]),
  })

  imageFile!: File

  get title() { return this.form.get('title') as FormControl }
  get category_id() { return this.form.get('category_id') as FormControl }
  get content() { return this.form.get('content') as FormControl }
  get image() { return this.form.get('image') as FormControl }

  constructor(private _postService: PostService, private _router: Router) { }

  onSubmit() {
    const form = this.form.controls

    const body = new FormData()
      body.append('title', form.title.value ?? '')
      body.append('category_id', form.category_id.value?.toString() ?? '')
      body.append('content', form.content.value ?? '')
      body.append('image', this.imageFile)

    this.createSubs = this._postService.createPost(body).subscribe(post=>this._router.navigate([`/post/read/${post.id}`]))
  }

  setImage(event: any) {
    const image = event.target.files[0]
    const errors = validateImage(image)
    if(errors) {
      this.form.controls.image.setErrors(errors)
    } else {
      this.imageFile = image
    }
  }

  ngOnDestroy(): void {
    this.createSubs?.unsubscribe()
  }

}
