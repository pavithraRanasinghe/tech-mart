import {Injectable} from '@angular/core';
import {HttpMethod} from 'src/app/common/models/http-method';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {OrderRequest} from '../models/order-request';

const BASE_URL = `${environment.apiUrl}/orders`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) {
  }
  public placeOrder(request: OrderRequest) {
    return this.httpService.sendHttp(BASE_URL, HttpMethod.POST, request);
  }

  public findByStatus(status) {
    return this.httpService.sendHttp(`${BASE_URL}/${status}`, HttpMethod.GET);
  }

  public confirm(request: any) {
    return this.httpService.sendHttp(`${BASE_URL}/confirm`, HttpMethod.PUT, request);
  }
}
