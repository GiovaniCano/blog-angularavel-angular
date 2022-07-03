import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.isThirdPartyRequest(request.url)) return next.handle(request)

    const newReq = request.clone({
      withCredentials: true
    })
    return next.handle(newReq)
  }

  isThirdPartyRequest(requestUrl: string): boolean {
    return requestUrl.startsWith(environment.API_BASE_URL) ? false : true
  }
}
