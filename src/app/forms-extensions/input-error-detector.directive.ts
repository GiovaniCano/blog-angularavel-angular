import { ContentChild, Directive, HostBinding } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: 'div.input'
})
export class InputErrorDetectorDirective {
  @ContentChild(FormControlName) input!: FormControlName

  @HostBinding('class.error') get hasError():boolean|null {
    return this.input.invalid && (this.input.touched || this.input.dirty)
  }
}
