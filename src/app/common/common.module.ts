import {NgModule} from '@angular/core';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TwoDigitDecimaNumberDirective} from './directives/two-digit-decima-number.directive';


@NgModule({
  declarations: [
    SpinnerComponent,
    TwoDigitDecimaNumberDirective

  ],
  imports: [
    NgxSpinnerModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class CommonModule {
}
