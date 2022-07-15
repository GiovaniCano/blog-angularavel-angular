import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { mT } from 'src/app/helpers';
import { EmailVerificationNotificationComponent } from './notification/email-verification-notification.component';
import { EmailVerifyComponent } from './verify/email-verify.component';

const routes: Routes = [
  { path: '', redirectTo: '/404', pathMatch: 'full' },
  {
    title: mT('Email Sent'),
    path: 'notification',
    component: EmailVerificationNotificationComponent,
  },
  {
    title: mT('Email Verify'),
    path: 'verify/:token',
    component: EmailVerifyComponent,
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
export class emailVerificationRoutingModule { }
