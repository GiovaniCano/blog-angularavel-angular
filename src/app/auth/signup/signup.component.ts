import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
    name: new FormControl('Lorem 01'),
    email: new FormControl('lorem@ipsum.com'),
    password: new FormControl('qQ@12345'),
    password_confirmation: new FormControl('qQ@12345'),
  })

  constructor(private _authService: AuthService) { }

  onSubmit() {
    const body = this.form.value

    this.csrfSubs = this._authService.getCsrfToken().subscribe(
      () => this.registerSubs = this._authService.register(body).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.csrfSubs?.unsubscribe()
    this.registerSubs?.unsubscribe()
  }
}
