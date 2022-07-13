import { Directive, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appPasswordConfirmationError]'
})
export class PasswordConfirmationErrorDirective {
  @Input('appPasswordConfirmationError') passwordsGroup!: FormGroup

  @HostBinding('class.error') get hasError() {
    return this.passwordsGroup.invalid && (this.passwordsGroup.touched || this.passwordsGroup.dirty)
  }
}
