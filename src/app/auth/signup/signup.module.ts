import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationNotificationComponent } from './email-verification/notification/email-verification-notification.component';
import { EmailVerifyComponent } from './email-verification/verify/email-verify.component';
import { FormsExtensionsModule } from 'src/app/forms-extensions/forms-extensions.module';



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
    FormsExtensionsModule,
  ]
})
export class SignupModule { }
