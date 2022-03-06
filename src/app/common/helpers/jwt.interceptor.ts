import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {AppUserService, AuthenticationService} from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private appUserService: AppUserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url

    const currentUser = this.appUserService.currentUserValue;
    const isLoggedIn = currentUser;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      const t: any = JSON.parse(localStorage.getItem('user')).token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${t}`
        }
      });
    }

    return next.handle(request);
  }
}
