import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Credentials } from 'src/app/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  private csrfSubs?: Subscription
  private loginSubs?: Subscription

  expired$: Observable<boolean> = this._route.queryParams.pipe(
    map(params => params['expired'] === '1' ? true : false)
  )

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false),
  })

  get email() { return this.form.controls.email }
  get password() { return this.form.controls.password }

  errorMsg: string = ''

  constructor(private _authService: AuthService, private _route: ActivatedRoute, private _cd: ChangeDetectorRef) { }

  onSubmit() {
    this.form.markAsPending()
    const credentials = this.form.value as Credentials

    this.csrfSubs = this._authService.getCsrfToken().subscribe(
      () => this.loginSubs = this._authService.login(credentials).subscribe({
        error: err => {
          this.form.setErrors({ invalid: true })
          if (err.status === 422 || err.status === 429) {
            this.errorMsg = err.status === 422 ? err.error.message : 'Too Many Attempts, wait a minute.'
            setTimeout(() => {
              this.errorMsg = ''
              this._cd.detectChanges()
            }, 4500);
          }
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.csrfSubs?.unsubscribe()
    this.loginSubs?.unsubscribe()
  }
}
