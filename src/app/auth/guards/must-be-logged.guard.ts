import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { concat, map, Observable } from 'rxjs';
import { Session } from 'src/app/interfaces';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MustBeLoggedGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): Observable<true | UrlTree> {
    return this.mustBeLogged();
  }
  canActivateChild(): Observable<true | UrlTree> {
    return this.mustBeLogged();
  }
  canLoad(): Observable<true | UrlTree> {
    return this.mustBeLogged();
  }

  private mustBeLogged(): Observable<true | UrlTree> {
    const isFirstLoad = this._authService.isFirstLoad()
    const session$ = this._authService.session$

    if(isFirstLoad) {
      const wait$ = this._authService.waitFirstLoadForGuard$
      return concat(wait$, session$).pipe(
        map(session => this.guard(session))
      )
    } else {
      return session$.pipe(
        map(session => this.guard(session))
      )
    }
  }

  private guard(session: Session): true | UrlTree {
    if(session.isLogged) {
      return true
    } else {
      return this._router.parseUrl('/login')
    }
  }
}