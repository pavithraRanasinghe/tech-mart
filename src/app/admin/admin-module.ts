import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {LibModule} from '../lib.module';
import {CommonModule} from '../common/common.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AdminDashboardComponent, ProductManagementComponent, SaleAgentComponent} from './components';
import {AdminRouting} from './admin-routing';

@NgModule({
  declarations: [
    SaleAgentComponent,
    AdminDashboardComponent,
    ProductManagementComponent
  ],
  imports: [
    LibModule,
    MaterialModule,
    AdminRouting,
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [],
  exports: [
  ],
  entryComponents: []
})
export class AdminModule { }
