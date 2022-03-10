import {Injectable} from '@angular/core';
import {HttpMethod} from 'src/app/common/models/http-method';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';

const BASE_URL = `${environment.apiUrl}/customer`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) {
  }
  public signUpCustomer(request: any) {
    return this.httpService.sendHttp(BASE_URL, HttpMethod.POST, request);
  }
}
