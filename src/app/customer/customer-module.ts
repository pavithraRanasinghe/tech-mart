import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {LibModule} from '../lib.module';
import {CustomerRoutingModule} from './customer-routing';
import {CommonModule} from '../common/common.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AdminDashboardComponent} from './components';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {NgImageSliderModule} from 'ng-image-slider';
import {CartComponent} from './components/cart/cart.component';
import {ProductsComponent} from './components/products/products.component';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductDetailComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent
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
