import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { LibModule } from '../lib.module';
import { BackOfficeRoutingModule } from './sales-agent-routing';
import { BoDashboardComponent } from './components';
import { PermissionDirective } from '../common/helpers';
import { CommonModule } from '../common/common.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import {OrderGridComponent} from './components/order-grid/order-grid.component';
import {OrderManagementComponent} from './components/order_management/order-management.component';

@NgModule({
  declarations: [
    BoDashboardComponent,
    PermissionDirective,
    OrderGridComponent,
    OrderManagementComponent
  ],
  imports: [
    LibModule,
    MaterialModule,
    BackOfficeRoutingModule,
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  providers: [],
  exports: [
  ],
  entryComponents: []
})
export class SalesAgentModule { }
