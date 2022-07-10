import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {  
  isLogged$: Observable<boolean> = this._authService.session$.pipe(
    tap(session => {
      this.name = session.userName
      this.avatar = environment.API_BASE_URL + 'user/avatar/' + session.userAvatar
    }),
    map(session => session.isLogged)
  )
  name:string = ''
  avatar:string|null = null

  mobileMenu: boolean = false

  constructor(private _renderer: Renderer2, private _authService: AuthService) { }

  showMobileMenu() {
    this.mobileMenu = true
    this._renderer.addClass(document.body, 'no-scroll')
  }

  closeMobileMenu() {
    this.mobileMenu = false
    this._renderer.removeClass(document.body, 'no-scroll')
  }
}
