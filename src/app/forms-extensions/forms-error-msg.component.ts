import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errorsDictionary } from './form-errors.dictionary';

@Component({
  selector: 'app-forms-error-msg',
  styleUrls: ['./forms-error-msg.component.scss'],
  template: `
    <p *ngIf="control.invalid && (control.dirty || control.touched)">{{errorText}}</p>
    <!-- <pre>{{control.errors | json}}</pre> -->
  `
})
export class FormsErrorMsgComponent {
  @Input() control!: AbstractControl

  errors = errorsDictionary

  get errorText():string {
    let text = this.errors[this.currentError]

    if(this.currentError === 'minlength' || this.currentError === 'maxlength') {
      const requiredLength:number = this.control.errors![this.currentError]['requiredLength']
      const actualLength:number = this.control.errors![this.currentError]['actualLength']
      text = text
            .replace('{n}', requiredLength.toString())
            .replace('{n2}', actualLength.toString())
    }

    return text
  }

  get currentError(): string {
    return this.control.errors ? Object.keys(this.control.errors)[0] : ''
  }
}
