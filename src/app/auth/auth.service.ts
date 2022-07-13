import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
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
    email: ''
  })
  public session$ = this._session.asObservable()

  private setSession(isLogged: boolean, user?: User): void {
    this._session.next({
      isLogged: isLogged,
      isVerified: user?.email_verified_at ? true : false,
      name: user?.name ?? '',
      avatar: user?.avatar ?? null,
      email: user?.email ?? '',
    })
  }

  constructor(private _http: HttpClient, private _router: Router) { }

  verifyLogin(): void {
    const url = this.baseApiUrl + 'user/current'
    this._http.get<User>(url).pipe(
      tap(user => {
        this.setSession(true, user)
      }), 
      catchError(error => {
        if (error.status === 401 || error.status === 419) {
          return EMPTY
        }
        return throwError(() => error)
      })
    ).subscribe()
  }

  sendVerificationEmail(): Observable<any> {
    const url = this.baseApiUrl + 'email/verification-notification'
    return this._http.post(url, {})
  }

  emailVerify(token:string): Observable<any> {
    const url = this.baseApiUrl + 'email/verify'
    return this._http.post(url, {token: token})
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

  register(body: RegisterCredentials): Observable<any> {
    const url = this.baseApiUrl + 'register'
    return this._http.post<User>(url, body).pipe(tap(
      user => {
        this.setSession(true, user)
        this._router.navigate(['email/notification'])
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
      tap({finalize:()=>{
        this.setSession(false)
        this._router.navigate([''])
      }})
    )
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const url = this.baseApiUrl + 'forms/isEmailAvailable'
    return this._http.post<boolean>(url, {email: email})
  }
  isNameAvailable(name: string): Observable<boolean> {
    const url = this.baseApiUrl + 'forms/isUsernameAvailable'
    return this._http.post<boolean>(url, {name: name})
  }
}