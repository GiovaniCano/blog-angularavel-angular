import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { mT } from 'src/app/helpers';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/404', pathMatch: 'full' },
  {
    title: mT('Forgot Password'),
    path: 'forgot',
    component: ForgotPasswordComponent
  },
  {
    title: mT('Reset Password'),
    path: 'reset',
    component: ResetPasswordComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
