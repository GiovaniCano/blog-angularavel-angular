import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { password, passwordConfirmation } from 'src/app/forms-extensions/validators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatePasswordComponent implements OnDestroy {
  private updateSubs?: Subscription

  form = new FormGroup({
    current_password: new FormControl('', [Validators.required]),
    passwordsGroup: new FormGroup({
      password: new FormControl('', [Validators.required, password, Validators.maxLength(255), Validators.minLength(8)]),
      password_confirmation: new FormControl(''),
    }, [passwordConfirmation])
  })

  get current_password() { return this.form.controls.current_password }
  get passwordsGroup() { return this.form.controls.passwordsGroup }
  get password() { return this.form.controls.passwordsGroup.controls.password }
  get password_confirmation() { return this.form.controls.passwordsGroup.controls.password_confirmation }

  serverError:string = ''

  constructor(private _authService: AuthService, private _router: Router, private _cd: ChangeDetectorRef) { }

  onSubmit() {
    this.form.markAsPending()

    const body: {} = {
      current_password: this.current_password.value ?? '',
      password: this.password.value ?? '',
      password_confirmation: this.password_confirmation.value ?? '',
    }

    this.updateSubs = this._authService.updatePassword(body).subscribe({
      next: () => this._router.navigate(['/user/edit']),
      error: err => {
        this.serverError = err.error.message
        this._cd.detectChanges()
        setTimeout(() => {
          this.serverError = ''
          this._cd.detectChanges()
        }, 3000);
      }
    })
  }

  ngOnDestroy(): void {
    this.updateSubs?.unsubscribe()
  }
}
