import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsExtensionsModule } from '../forms-extensions/forms-extensions.module';



@NgModule({
  declarations: [
    IndexComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsExtensionsModule
  ]
})
export class PostsModule { }
