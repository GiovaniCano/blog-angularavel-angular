import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';
import { mkTitle } from 'src/app/helpers';

const routes: Route[] = [
  { title:mkTitle('SignUp'), path: 'signup', component: SignupComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
