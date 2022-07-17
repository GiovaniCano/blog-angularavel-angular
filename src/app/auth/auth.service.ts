import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials, RegisterCredentials, Session } from '../app-types';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl: string = environment.API_BASE_URL

  private _session = new BehaviorSubject<Session>({
    isLogged: false,
    isVerified: false,
    name: '',
    avatar: null,
    email: '',
    firstLoad: true
  })
  public session$ = this._session.asObservable()

  private setSession(isLogged: boolean, user?: User): void {
    this._session.next({
      isLogged: isLogged,
      isVerified: user?.email_verified_at ? true : false,
      name: user?.name ?? '',
      avatar: user?.avatar ?? null,
      email: user?.email ?? '',
      firstLoad: false
    })
  }

  public isFirstLoad(): boolean {
    return this._session.getValue().firstLoad
  }
  private _waitFirstLoadForGuard = new Subject<never>()
  public waitFirstLoadForGuard$ = this._waitFirstLoadForGuard.asObservable()

  constructor(private _http: HttpClient, private _router: Router) { }

  firstLoadVerifyLogin(): void {
    const url = this.baseApiUrl + 'user/current'
    this._http.get<User>(url, { headers: { skipCheckIfSessionExpired: "true" } }).pipe(
      tap({
        next: user => {
          this.setSession(true, user)
          this._waitFirstLoadForGuard.complete()
        },
        error: () => {
          this.setSession(false)
          this._waitFirstLoadForGuard.complete()
        },
      })
    ).subscribe()
  }

  updateUserInfo(body: FormData): Observable<{mustVerifyEmail:boolean, user:User}> {
    const url = this.baseApiUrl + 'user/profile-information'
    return this._http.post<{mustVerifyEmail:boolean, user:User}>(url, body).pipe( // _method: put
      tap(res => this.setSession(true, res.user))
    )
  }
  deleteAvatar(): Observable<any> {
    const url = this.baseApiUrl + 'user/avatar'
    return this._http.delete(url).pipe(tap(()=>{
      const currentSession = this._session.getValue()
      this._session.next({
        avatar: null,
        isLogged: currentSession.isLogged,
        isVerified: currentSession.isVerified,
        name: currentSession.name,
        email: currentSession.email,
        firstLoad: currentSession.firstLoad
      })
    }))
  }
  updatePassword(body: {}): Observable<any> {
    const url = this.baseApiUrl + 'user/password'
    return this._http.put(url, body)
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    const url = this.baseApiUrl + 'forgot-password'
    return this._http.post(url, { email: email })
  }
  resetPassword(body: {}): Observable<any> {
    const url = this.baseApiUrl + 'reset-password'
    return this._http.post(url, body)
  }

  sendVerificationEmail(): Observable<any> {
    const url = this.baseApiUrl + 'email/verification-notification'
    return this._http.post(url, {})
  }

  emailVerify(token: string): Observable<any> {
    const url = this.baseApiUrl + 'email/verify'
    return this._http.post(url, { token: token })
  }

  login(credentials: Credentials): Observable<any> {
    const url = this.baseApiUrl + 'login'
    return this._http.post(url, credentials).pipe(tap(
      (response: { [key: string]: any }) => {
        const user = response['user'] as User
        this.setSession(true, user)
        this._router.navigate(['/'])
      }
    ))
  }

  register(body: RegisterCredentials): Observable<any> {
    const url = this.baseApiUrl + 'register'
    return this._http.post<User>(url, body).pipe(tap(
      user => {
        this.setSession(true, user)
        this._router.navigate(['/email/notification'])
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
      tap({
        finalize: () => {
          this.setSession(false)
          this._router.navigate(['/'])
        }
      })
    )
  }

  deleteUser(body: {}) {
    const url = this.baseApiUrl + 'user/delete'
    return this._http.delete(url, {body: body})
  }

  expireSession(): void {
    this.setSession(false)
    this._router.navigate(['/login'], { queryParams: { expired: 1 } })
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const url = this.baseApiUrl + 'forms/isEmailAvailable'
    return this._http.post<boolean>(url, { email: email })
  }
  isNameAvailable(name: string): Observable<boolean> {
    const url = this.baseApiUrl + 'forms/isUsernameAvailable'
    return this._http.post<boolean>(url, { name: name })
  }
}