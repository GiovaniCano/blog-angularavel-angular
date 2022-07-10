import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Observable, share, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials, Session } from '../app-types';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl: string = environment.API_BASE_URL

  private session = new BehaviorSubject<Session>({
    isLogged: false,
    isVerified: false,
    userName: '',
    userAvatar: null
  })
  public session$ = this.session.asObservable().pipe(share())

  private setSession(isLogged: boolean, user?: User): void {
    this.session.next({
      isLogged: isLogged,
      isVerified: user?.email_verified_at ? true : false,
      userName: user?.name ?? '',
      userAvatar: user?.avatar ?? null
    })
  }

  constructor(private _http: HttpClient, private _router: Router) { }

  verifyLogin(): void {
    const url = this.baseApiUrl + 'user/current'
    this._http.get<User>(url).pipe(
      tap(user => {
        this.setSession(true, user)
      }), catchError(error => {
        const code = error.status
        if (code === 401 || code === 419) {
          this.setSession(false)
          return EMPTY
        } else if (code === 403 && error.error?.message == 'Your email address is not verified.') {
          this._router.navigate(['']) //to email verify
          return EMPTY
        }
        return throwError(() => error)
      })
    ).subscribe()
  }

  login(credentials: Credentials): Observable<any> {
    const url = this.baseApiUrl + 'login'
    return this._http.post(url, credentials).pipe(tap(
      (response: { [key: string]: any }) => {
        const user = response['user'] as User
        this.setSession(true, user)
        this._router.navigate([''])
      }
    ))
  }

  register(body: {}): Observable<any> {
    const url = this.baseApiUrl + 'register'
    return this._http.post<User>(url, body).pipe(tap(
      user => {
        this.setSession(true, user)
        this._router.navigate(['']) //to email verify
      }
    ))
  }

  getCsrfToken(): Observable<any> {
    const url = this.baseApiUrl + 'sanctum/csrf-cookie'
    return this._http.get(url)
  }

  logout(): Observable<any> {
    const url = this.baseApiUrl + 'logout'
    return this._http.post(url, {}).pipe(
      tap(() => {
        this.setSession(false)
        this._router.navigate([''])
      })
    )
  }
}