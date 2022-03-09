import {Injectable} from '@angular/core';
import {HttpMethod} from 'src/app/common/models/http-method';
import {HttpService} from 'src/app/common/services/index';
import {environment} from 'src/environments/environment';

const BASE_URL = `${environment.apiUrl}/driver`;

@Injectable({
  providedIn: 'root'
})
export class DriverServices {

  constructor(private httpService: HttpService) {
  }
  public findAllDrivers() {
    return this.httpService.sendHttp(BASE_URL, HttpMethod.GET);
  }
}
