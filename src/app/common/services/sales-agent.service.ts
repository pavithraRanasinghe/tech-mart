import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpMethod } from '../models/http-method';
import { HttpService } from './http.service';
import {SalesAgent} from '../models/sales-agent.model';

const BASE_URL = `${environment.apiUrl}/api/sales_agent`;

@Injectable({
  providedIn: 'root'
})
export class SalesAgentService {

  constructor(private httpService: HttpService) { }

  public saveSalesAgent(salesAgents: SalesAgent) {
    return this.httpService.sendHttp(BASE_URL, HttpMethod.POST, salesAgents);
  }

  public updateSalesAgent(salesAgent: SalesAgent) {
    return this.httpService.sendHttp(BASE_URL, HttpMethod.PUT, salesAgent);
  }

  public deleteSalesAgent(id: number) {
    return this.httpService.sendHttp(`${BASE_URL}/${id}`, HttpMethod.DELETE);
  }

  public getAllSalesAgents(){
    return this.httpService.sendHttp(BASE_URL, HttpMethod.GET);
  }
}
