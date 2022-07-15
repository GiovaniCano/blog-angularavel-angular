import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsExtensionsModule } from 'src/app/forms-extensions/forms-extensions.module';
import { emailVerificationRoutingModule } from './email-verification-routing.module';
import { EmailVerificationNotificationComponent } from './notification/email-verification-notification.component';
import { EmailVerifyComponent } from './verify/email-verify.component';



@NgModule({
  declarations: [
    EmailVerificationNotificationComponent,
    EmailVerifyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsExtensionsModule,
    emailVerificationRoutingModule
  ]
})
export class EmailVerificationModule { }
