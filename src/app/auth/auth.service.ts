import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericResponse } from '../app-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl: string = environment.API_BASE_URL

  constructor(private _http: HttpClient) { }

  register(body: {}): Observable<GenericResponse> {
    const url = this.baseApiUrl + 'register'
    return this._http.post(url, body)
  }

  getCsrfToken(): Observable<any> {
    const url = this.baseApiUrl + 'sanctum/csrf-cookie'
    return this._http.get(url)
  }
}