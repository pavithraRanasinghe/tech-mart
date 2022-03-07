import {NgModule} from '@angular/core';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TwoDigitDecimaNumberDirective} from './directives/two-digit-decima-number.directive';
import {FilterPipe} from './directives/filter.pipe';


@NgModule({
  declarations: [
    SpinnerComponent,
    TwoDigitDecimaNumberDirective,
    FilterPipe

  ],
  imports: [
    NgxSpinnerModule
  ],
  exports: [
    SpinnerComponent,
    FilterPipe
  ]
})
export class CommonModule {
}
