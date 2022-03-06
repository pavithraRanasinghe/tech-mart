import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpMethod} from '../models/http-method';
import {HttpService} from './http.service';
import {AppUserService} from './app-user.service';
import {environment} from '../../../environments/environment';
import {User} from '../models';
import {ReplaySubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

const LOGIN_URL = `${environment.apiUrl}/auth/login`;

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private user: User;
  private authState = new ReplaySubject<boolean>(1);
  private readonly returnUrl: string;

  constructor(
    private http: HttpClient,
    protected httpService: HttpService,
    private appUserService: AppUserService,
    private route: ActivatedRoute,
    private router: Router) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  basicLogin(request: {username: string, password: string}) {
    return this.httpService.sendHttp<any>(LOGIN_URL, HttpMethod.POST, request);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.appUserService.currentUserSubject.next(null);
  }

  setUser(user: User): void {
    this.user = user;
    const userJson = JSON.stringify(user);
    localStorage.setItem('user', userJson);
    if (user.loggedIn && user.registered) {
      this.authState.next(true);
    }
    this.appUserService.loadUserData();
  }

  getUser(): User {
    if (!this.user) {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        this.user = JSON.parse(userJson);
      }
    }
    return this.user;
  }
}
