import {Component, ViewChild} from '@angular/core';
import {SpinnerComponent} from '../../../common/components/spinner/spinner.component';

@Component({
  selector: 'app-bo-dashboard',
  templateUrl: './bo-dashboard.component.html',
  styleUrls: ['./bo-dashboard.component.scss']
})
export class BoDashboardComponent {

  @ViewChild('spinner') spinner: SpinnerComponent;
}
