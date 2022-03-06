import {Injectable} from '@angular/core';
import {WorkOrderStatus} from 'src/app/common/models/enums/work-order-status';
import {HttpMethod} from 'src/app/common/models/http-method';
import {HttpService} from 'src/app/common/services';
import {environment} from 'src/environments/environment';

const SERVICE_URL = `${environment.apiUrl}/api/workorders`;

@Injectable({
  providedIn: 'root'
})

export class WorkOrderService {

  constructor(
    protected httpService: HttpService) {
  }

  public getNumberOfWorkOrdersByStatus(status: WorkOrderStatus) {
    const url = SERVICE_URL + '/count/' + status;
    return this.httpService.sendHttp<any>(url, HttpMethod.GET, null);
  }
}
