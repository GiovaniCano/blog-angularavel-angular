import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { mT } from 'src/app/helpers';

import { SignupComponent } from './signup.component';
import { EmailVerificationNotificationComponent } from './email-verification/notification/email-verification-notification.component';
import { EmailVerifyComponent } from './email-verification/verify/email-verify.component';
import { RedirectIfLoggedGuard } from '../guards/redirect-if-logged.guard';
import { RedirectIfVerifiedGuard } from '../guards/redirect-if-verified.guard';
import { MustBeLoggedGuard } from '../guards/must-be-logged.guard';

const routes: Route[] = [
  { title: mT('SignUp'), path: 'signup', component: SignupComponent, canActivate: [RedirectIfLoggedGuard] },
  { title: mT('Email Sent'), path: 'email/notification', component: EmailVerificationNotificationComponent, canActivate: [MustBeLoggedGuard, RedirectIfVerifiedGuard] },
  { title: mT('Email Verify'), path: 'email/verify/:token', component: EmailVerifyComponent, canActivate: [MustBeLoggedGuard, RedirectIfVerifiedGuard] },
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
