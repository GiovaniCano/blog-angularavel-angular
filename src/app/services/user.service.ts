import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_URL = environment.API_BASE_URL

  constructor(private _http: HttpClient, private _router: Router) { }

  getCurrentUserInfo(): Observable<User> {
    const url = this.API_BASE_URL + 'user/current'
    return this._http.get<User>(url)
  }

  getUser(name: string): Observable<User> {
    const url = this.API_BASE_URL + 'user/' + name
    return this._http.get<User>(url).pipe(
      tap({error: err => {
        if(err.status === 404) this._router.navigate(['/404'])
      }})
    )
  }
}
