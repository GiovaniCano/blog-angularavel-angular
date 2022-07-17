import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseApiUrl: string = environment.API_BASE_URL

  constructor(private _http: HttpClient) { }

  createPost(body: FormData): Observable<Post> {
    const url = this.baseApiUrl + 'post'
    return this._http.post<Post>(url, body)
  }

  getCategories(): Observable<Category[]> {
    const url = this.baseApiUrl + 'post/categories'
    return this._http.get<Category[]>(url)
  }
}
