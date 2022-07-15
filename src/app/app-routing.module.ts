import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mT } from './helpers';

import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './posts/index.component';
import { RedirectIfLoggedGuard } from './auth/guards/redirect-if-logged.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MustBeLoggedGuard } from './auth/guards/must-be-logged.guard';
import { RedirectIfVerifiedGuard } from './auth/guards/redirect-if-verified.guard';

const routes: Routes = [
  { title: mT('Home'), path: '', component: IndexComponent },
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
