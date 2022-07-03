import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './posts/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: '', loadChildren: ()=>import('./auth/signup/signup.module').then(m=>m.SignupModule) },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
