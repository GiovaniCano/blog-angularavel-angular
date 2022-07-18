import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsExtensionsModule } from '../forms-extensions/forms-extensions.module';
import { ShowPostComponent } from './show-post/show-post.component';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UpdatePostComponent } from './update-post/update-post.component';



@NgModule({
  declarations: [
    IndexComponent,
    CreatePostComponent,
    ShowPostComponent,
    UpdatePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsExtensionsModule,
    RouterModule,
    AngularEditorModule,
    FormsModule
  ]
})
export class PostsModule { }
