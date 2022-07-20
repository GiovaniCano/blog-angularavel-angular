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
import { ModalsModule } from '../modals/modals.module';
import { ByCategoryComponent } from './index/by-category/by-category.component';



@NgModule({
  declarations: [
    IndexComponent,
    CreatePostComponent,
    ShowPostComponent,
    UpdatePostComponent,
    ByCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsExtensionsModule,
    RouterModule,
    AngularEditorModule,
    FormsModule,
    ModalsModule
  ]
})
export class PostsModule { }
