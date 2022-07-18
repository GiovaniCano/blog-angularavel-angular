import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseApiUrl: string = environment.API_BASE_URL

  constructor(private _http: HttpClient, private _router: Router) { }

  getPost(id: number): Observable<Post> {
    const url = this.baseApiUrl + 'post/' + id
    return this._http.get<Post>(url).pipe(
      tap({error: error => {
        if(error.status === 404) this._router.navigate(['/404'])
      }})
    )
  }

  createPost(body: FormData): Observable<Post> {
    const url = this.baseApiUrl + 'post'
    return this._http.post<Post>(url, body)
  }

  getCategories(): Observable<Category[]> {
    const url = this.baseApiUrl + 'post/categories'
    return this._http.get<Category[]>(url)
  }
}
