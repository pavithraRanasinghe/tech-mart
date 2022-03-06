import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  // tslint:disable-next-line:variable-name
  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User> = null;

  constructor(private http: HttpClient) {}

  public loadUserData(): Promise<void> {
    return new Promise<void>((resolve, reject): void => {
      this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.currentUser = this._currentUserSubject.asObservable();
      resolve();
    });
  }

  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  public get currentUserSubject(): BehaviorSubject<User> {
    return this._currentUserSubject;
  }

}
