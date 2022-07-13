import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegisterCredentials } from 'src/app/app-types';
import { alphaNumExtras, isEmailAvailable, isNameAvailable, password, passwordConfirmation } from 'src/app/forms-extensions/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'container-sm'}
})
export class SignupComponent implements OnDestroy {
  private csrfSubs?: Subscription
  private registerSubs?: Subscription

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(255), Validators.minLength(5)],
      asyncValidators: isEmailAvailable(this._authService),
      updateOn: "blur"
    }),
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(25), Validators.minLength(2), alphaNumExtras],
      asyncValidators: isNameAvailable(this._authService),
      updateOn: "blur"
    }),

    passwordsGroup: new FormGroup({
      password: new FormControl('', [Validators.required, password, Validators.maxLength(255), Validators.minLength(8)]),
      password_confirmation: new FormControl(''),
    }, [passwordConfirmation])
  })

  get name() { return this.form.controls.name }
  get email() { return this.form.controls.email }
  get passwordsGroup() { return this.form.controls.passwordsGroup }
  get password() { return this.form.controls.passwordsGroup.controls.password }
  get password_confirmation() { return this.form.controls.passwordsGroup.controls.password_confirmation }

  constructor(private _authService: AuthService) { }

  onSubmit() {
    this.form.markAsPending()

    const body: RegisterCredentials = {
      name: this.name.value ?? '',
      email: this.email.value ?? '',
      password: this.password.value ?? '',
      password_confirmation: this.password_confirmation.value ?? '',
    }

    this.csrfSubs = this._authService.getCsrfToken().subscribe(
      () => this.registerSubs = this._authService.register(body).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.csrfSubs?.unsubscribe()
    this.registerSubs?.unsubscribe()
  }
}
