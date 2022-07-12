import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { mkTitle } from 'src/app/helpers';

import { SignupComponent } from './signup.component';
import { EmailVerificationNotificationComponent } from './email-verification/notification/email-verification-notification.component';
import { EmailVerifyComponent } from './email-verification/verify/email-verify.component';

const routes: Route[] = [
  { title:mkTitle('SignUp'), path: 'signup', component: SignupComponent },
  { title:mkTitle('Email Sent'), path: 'email/notification', component: EmailVerificationNotificationComponent },
  { title:mkTitle('Email Verify'), path: 'email/verify/:token', component: EmailVerifyComponent },
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
