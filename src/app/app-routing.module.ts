import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mkTitle } from './helpers';

import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './posts/index.component';

const routes: Routes = [
  { title:mkTitle('Home'), path: '', component: IndexComponent },
  { title:mkTitle('Login'), path: 'login', component: LoginComponent },

  { path: '', loadChildren: ()=>import('./auth/signup/signup.module').then(m=>m.SignupModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
