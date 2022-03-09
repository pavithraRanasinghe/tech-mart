import {Injectable} from '@angular/core';
import {HttpMethod} from 'src/app/common/models/http-method';
import {HttpService} from 'src/app/common/services/index';
import {environment} from 'src/environments/environment';

const BASE_URL = `${environment.apiUrl}/branch`;

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpService: HttpService) {
  }
  public findAllBranches() {
    return this.httpService.sendHttp(BASE_URL, HttpMethod.GET);
  }
}
