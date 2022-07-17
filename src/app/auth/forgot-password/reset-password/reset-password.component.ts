import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { password, passwordConfirmation } from 'src/app/forms-extensions/validators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnDestroy, OnInit {
  private resetSubs?: Subscription
  private paramsSubs!: Subscription
  private queryParams!: Subscription

  private _email!: string
  private _token!: string

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255), Validators.minLength(5)]),
    token: new FormControl(''),

    passwordsGroup: new FormGroup({
      password: new FormControl('', [Validators.required, password, Validators.maxLength(255), Validators.minLength(8)]),
      password_confirmation: new FormControl(''),
    }, [passwordConfirmation])
  })

  get email() { return this.form.controls.email }
  get passwordsGroup() { return this.form.controls.passwordsGroup }
  get password() { return this.form.controls.passwordsGroup.controls.password }
  get password_confirmation() { return this.form.controls.passwordsGroup.controls.password_confirmation }

  errorMsg: string = ''

  constructor(private _authService: AuthService, private _route: ActivatedRoute, private _router: Router, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.paramsSubs = this._route.params.subscribe(params => {
      this._token = params['token']
      this.form.controls.token.setValue(params['token'])
    })
    this.queryParams = this._route.queryParams.subscribe(
      params => {
        if (!params['email']) this._router.navigate(['/404'])
        this._email = params['email']
        this.form.controls.email.setValue(params['email'])
      }
    )
  }

  onSubmit(): void {
    this.form.markAsPending()
    const passwordsGroup = this.form.controls.passwordsGroup.controls

    const body = {
      email: this._email,
      password: passwordsGroup.password.value,
      password_confirmation: passwordsGroup.password_confirmation.value,
      token: this._token
    }

    this.resetSubs = this._authService.resetPassword(body).subscribe({
      error: err => {
        this.form.setErrors({ invalid: true })
        if (err.status === 422 || err.status === 429) {
          this.errorMsg = err.error.message
          setTimeout(() => {
            this.errorMsg = ''
            this._cd.detectChanges()
          }, 5500);
        }
      },
      next: () => this._router.navigate(['/login'])
    })
  }

  ngOnDestroy(): void {
    this.resetSubs?.unsubscribe()
    this.paramsSubs?.unsubscribe()
    this.queryParams?.unsubscribe()
  }
}
