import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationNotificationComponent } from './email-verification/notification/email-verification-notification.component';
import { EmailVerifyComponent } from './email-verification/verify/email-verify.component';



@NgModule({
  declarations: [
    SignupComponent,
    EmailVerificationNotificationComponent,
    EmailVerifyComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SignupModule { }
