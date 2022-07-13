import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsErrorMsgComponent } from './forms-error-msg.component';
import { InputErrorDetectorDirective } from './input-error-detector.directive';
import { PasswordConfirmationErrorDirective } from './password-confirmation-error.directive';



@NgModule({
  declarations: [
    FormsErrorMsgComponent,
    InputErrorDetectorDirective,
    PasswordConfirmationErrorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsErrorMsgComponent,
    InputErrorDetectorDirective,
    PasswordConfirmationErrorDirective
  ]
})
export class FormsExtensionsModule { }
