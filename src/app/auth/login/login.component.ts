import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/app-types';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'container-sm'}
})
export class LoginComponent implements OnDestroy {
  private csrfSubs?: Subscription
  private loginSubs?: Subscription

  form = new FormGroup({
    email: new FormControl('lorem@ipsum.com'),
    password: new FormControl('qQ@12345'),
  })

  constructor(private _authService: AuthService) { }

  onSubmit() {
    const credentials = this.form.value as Credentials

    this.csrfSubs = this._authService.getCsrfToken().subscribe(
      () => this.loginSubs = this._authService.login(credentials).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.csrfSubs?.unsubscribe()
    this.loginSubs?.unsubscribe()
  }
}
