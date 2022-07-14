import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mT } from './helpers';

import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './posts/index.component';
import { RedirectIfLoggedGuard } from './auth/guards/redirect-if-logged.guard';

const routes: Routes = [
  { title: mT('Home'), path: '', component: IndexComponent },
  { title: mT('Login'), path: 'login', component: LoginComponent, canActivate: [RedirectIfLoggedGuard] },

  { path: '', loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
