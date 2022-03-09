import {Component, ViewChild} from '@angular/core';
import {SpinnerComponent} from '../../../common/components/spinner/spinner.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  @ViewChild('spinner') spinner: SpinnerComponent;
}
