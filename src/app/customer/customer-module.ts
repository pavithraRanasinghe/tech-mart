import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {LibModule} from '../lib.module';
import {CustomerRoutingModule} from './customer-routing';
import {CommonModule} from '../common/common.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AdminDashboardComponent, ProductManagementComponent} from './components';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {NgImageSliderModule} from 'ng-image-slider';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductManagementComponent,
    ProductDetailComponent
  ],
  imports: [
    LibModule,
    MaterialModule,
    CustomerRoutingModule,
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgImageSliderModule
  ],
  providers: [],
  exports: [
  ],
  entryComponents: []
})
export class CustomerModule { }
