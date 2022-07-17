import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mobilemenu',
  templateUrl: './mobilemenu.component.html',
  styleUrls: ['./mobilemenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobilemenuComponent implements OnInit, OnDestroy {
  private navigationSubs!: Subscription

  isLogged$: Observable<boolean> = this._authService.session$.pipe(
    tap(session => {
      this.name = session.name
      this.avatar = session.avatar ? environment.API_BASE_URL + 'user/avatar/' + session.avatar : null
    }),
    map(session => session.isLogged)
  )

  name!: string
  avatar!: string|null

  @Output() closeMobileMenu = new EventEmitter<false>()

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.navigationSubs = this._router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(event => {
      this.closeMobileMenu.emit(false)
    })
  }

  closeMenu(): void {
    this.closeMobileMenu.emit(false)
  }

  ngOnDestroy(): void {
    this.navigationSubs.unsubscribe()
  }
}
