import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, share} from 'rxjs/operators';
import {HttpMethod} from '../models/http-method';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.apiUrl;
  private timeURL = this.baseUrl + '/public/time';

  constructor(
    private http: HttpClient
  ) {
  }

  public sendHttp<T>(path: string, method: HttpMethod, body?: any, responseType?): Observable<T> {
    return new Observable<T>((observer) => {
      const options = {body, responseType};
      this.http.request<T>(method, path, options).pipe(first()).subscribe(value => {
        observer.next(value);
        observer.complete();
      }, err => {
        observer.error(err);
      });
    });
  }

  getTime() {
    return this.http.get<Date>(this.timeURL);
  }
}
