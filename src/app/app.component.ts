import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.firstLoadVerifyLogin()
  }
}
