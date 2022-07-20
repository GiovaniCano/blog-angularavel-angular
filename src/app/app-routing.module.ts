import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mT } from './helpers';
import { MustBeLoggedGuard } from './auth/guards/must-be-logged.guard';
import { MustBeVerifiedGuard } from './auth/guards/must-be-verified.guard';
import { RedirectIfLoggedGuard } from './auth/guards/redirect-if-logged.guard';
import { RedirectIfVerifiedGuard } from './auth/guards/redirect-if-verified.guard';
import { AuthorCanEditPostResolver } from './posts/update-post/author-can-edit-post.resolver';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EditUserInfoComponent } from './user/edit-user-info/edit-user-info.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { IndexComponent } from './posts/index/index.component';
import { ShowPostComponent } from './posts/show-post/show-post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { ByCategoryComponent } from './posts/index/by-category/by-category.component';

const routes: Routes = [
  { title: mT('Home'), path: '', component: IndexComponent },
  { title: mT('Home'), path: 'page/:page', component: IndexComponent },
  { title: mT('Category'), path: 'post/category/:category', component: ByCategoryComponent },
  { title: mT('Category'), path: 'post/category/:category/page/:page', component: ByCategoryComponent },

  { title: mT('Post'), path: 'post/read/:id', component: ShowPostComponent},
  { title: mT('New Post'), path: 'post/new', component: CreatePostComponent, canActivate: [MustBeLoggedGuard, MustBeVerifiedGuard] },
  { title: mT('Edit Post'), path: 'post/edit/:id', component: UpdatePostComponent, canActivate: [MustBeLoggedGuard, MustBeVerifiedGuard], resolve: { post: AuthorCanEditPostResolver } },

  { title: mT('User'), path: 'user/profile/:name', component: UserProfileComponent},
  { title: mT('Edit Profile'), path: 'user/edit', component: EditUserInfoComponent, canActivate: [MustBeLoggedGuard] },
  { title: mT('Update Password'), path: 'user/password', component: UpdatePasswordComponent, canActivate: [MustBeLoggedGuard] },
  { title: mT('Delete Account'), path: 'user/delete', component: DeleteUserComponent, canActivate: [MustBeLoggedGuard] },

  { title: mT('Login'), path: 'login', component: LoginComponent, canActivate: [RedirectIfLoggedGuard] },
  { title: mT('SignUp'), path: 'signup', component: SignupComponent, canActivate: [RedirectIfLoggedGuard] },
  {
    path: 'email',
    loadChildren: () => import('./auth/email-verification/email-verification.module').then(m => m.EmailVerificationModule),
    canLoad: [MustBeLoggedGuard, RedirectIfVerifiedGuard], canActivate: [MustBeLoggedGuard, RedirectIfVerifiedGuard]
  },
  {
    path: 'password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canLoad: [RedirectIfLoggedGuard], canActivate: [RedirectIfLoggedGuard]
  },

  { title: mT('Not Found'), path:'404', component: NotFoundComponent},
  { path:'**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
