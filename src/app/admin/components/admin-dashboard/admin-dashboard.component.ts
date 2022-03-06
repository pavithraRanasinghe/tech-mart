import { WorkOrderStatus } from './../../../common/models/enums/work-order-status';
import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { MessageService } from './../../../common/services/message.service';
import { dematerialize, first } from 'rxjs/operators';
import { WorkOrderService } from './../../../customer/services/work-order.service';
import {SpinnerComponent} from '../../../common/components/spinner/spinner.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('spinner') spinner: SpinnerComponent;
  public numberOfNewWorkOrders = 0;
  public numberOfInprogressWorkOrders = 0

  constructor(
    private router: Router,
    private workOrderService: WorkOrderService,
    private message: MessageService) {}

  ngAfterViewInit(): void {
    if(this.spinner){
      this.spinner.showSpinner();
    }
    this.getNumberOfNewWOs();
    this.getNumberOfInprogressWOs();
  }

  ngOnInit(): void {

  }

  gotoViewWorkOrders() {
    this.router.navigateByUrl('back-office/view-work-orders').then(r => console.log(r));
  }

  getNumberOfNewWOs(){
    this.workOrderService.getNumberOfWorkOrdersByStatus(WorkOrderStatus.ACCEPTED).pipe(first()).subscribe(
      data => {
        try{
          this.numberOfNewWorkOrders = data.count;
       }catch (e){
          console.log(e);
          this.spinner.hideSpinner();
       }
      },
      error => {
        console.log(error);
        this.message.error('ERROR', error);
        this.spinner.hideSpinner();
      }
    );
  }

  getNumberOfInprogressWOs(){
    this.workOrderService.getNumberOfWorkOrdersByStatus(WorkOrderStatus.IN_PROGRESS).pipe(first()).subscribe(
      data => {
        try{
          this.numberOfInprogressWorkOrders = data.count;
          this.spinner.hideSpinner();
       }catch (e){
          console.log(e);
          this.spinner.hideSpinner();
       }
      },
      error => {
        console.log(error);
        this.message.error('ERROR', error);
        this.spinner.hideSpinner();
      }
    );
  }

}
