import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserComponent implements OnDestroy {
  private deleteSubs?: Subscription
  private logoutSubs?: Subscription

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
  })

  get password() { return this.form.controls.password }

  serverError:string = ''

  constructor(private _authService: AuthService, private _cd: ChangeDetectorRef) { }

  onSubmit() {
    this.form.markAsPending()

    const body: {} = {
      password: this.password.value ?? '',
    }

    this.deleteSubs = this._authService.deleteUser(body).subscribe({
      error: err => {
        this.serverError = err.error.message
        this._cd.detectChanges()
      },
      next: () => this.logoutSubs = this._authService.logout().subscribe()
    })
  }

  ngOnDestroy(): void {
    this.deleteSubs?.unsubscribe()
    this.logoutSubs?.unsubscribe()
  }
}
