import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Credentials } from 'src/app/app-types';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'container-sm'}
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('lorem@ipsum.com'),
    password: new FormControl('qQ@12345'),
  })

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credentials = this.form.value as Credentials

    const csrfSubs = this._authService.getCsrfToken().subscribe({
      next: res=>{
        console.log('csrf')
        const loginSubs = this._authService.login(credentials).subscribe({
          next: res=>console.log(res),
          error: error=>console.error(error),
        })
      },
      error: error=>console.error(error),
    })
  }
}
