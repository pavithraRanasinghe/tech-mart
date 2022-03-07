import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpMethod } from '../models/http-method';
import { HttpService } from './http.service';

const BASE_URL = `${environment.apiUrl}/supplier`;

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpService: HttpService) { }

  public getAllSuppliers(){
    return this.httpService.sendHttp(BASE_URL, HttpMethod.GET);
  }
}
