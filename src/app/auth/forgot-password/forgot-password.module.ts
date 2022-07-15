import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsExtensionsModule } from 'src/app/forms-extensions/forms-extensions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsExtensionsModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
