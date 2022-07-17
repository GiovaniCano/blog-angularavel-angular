import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnDestroy {
  private resetSubs?: Subscription

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get email() { return this.form.controls.email }

  errorMsg: string = ''
  emailSent: boolean = false

  constructor(private _authService: AuthService, private _cd: ChangeDetectorRef) { }

  onSubmit(): void {
    this.form.markAsPending()
    const email = this.email.value ?? ''

    this.resetSubs = this._authService.sendPasswordResetEmail(email).pipe(
      tap(() => {
        this.emailSent = true
        this._cd.detectChanges()
        setTimeout(() => {
          this.emailSent = false
          this._cd.detectChanges()
        }, 2000);
      })
    ).subscribe({
      error: err => {
        this.form.setErrors({ invalid: true })
        if (err.status === 422 || err.status === 429) {
          this.errorMsg = err.error.message
          // setTimeout(() => {
          //   this.errorMsg = ''
          //   this._cd.detectChanges()
          // }, 4500);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.resetSubs?.unsubscribe()
  }
}
