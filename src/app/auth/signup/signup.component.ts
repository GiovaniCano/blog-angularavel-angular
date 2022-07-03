import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'container-sm'}
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('Lorem 01'),
    email: new FormControl('lorem@ipsum.com'),
    password: new FormControl('qQ@12345'),
    password_confirmation: new FormControl('qQ@12345'),
  })

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const body = this.form.value

    const csrfSubs = this._authService.getCsrfToken().subscribe({
      next: res=>{
        console.log('csrf')
        const registerSubs = this._authService.register(body).subscribe({
          next: res=>console.log('register'),
          error: error=>console.error(error),
        })
      },
      error: error=>console.error(error),
    })
  }
}
