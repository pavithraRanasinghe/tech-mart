import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SpinnerComponent} from '../../../common/components/spinner/spinner.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  @ViewChild('spinner') spinner: SpinnerComponent;

  constructor(
    private router: Router) {
  }
  gotoViewWorkOrders() {
    this.router.navigateByUrl('back-office/view-work-orders').then(r => console.log(r));
  }

}
