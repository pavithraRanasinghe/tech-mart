import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoDashboardComponent} from './components';
import {OrderGridComponent} from './components/order-grid/order-grid.component';
import {OrderManagementComponent} from './components/order_management/order-management.component';

const routes: Routes = [
  {
    path: '',
    component: BoDashboardComponent,
    data: {title: 'DASHBOARD'}
  },
  {
    path: 'orders',
    component: OrderGridComponent,
    data: {title: 'PENDING_ORDERS'}
  },
  {
    path: 'detail',
    component: OrderManagementComponent,
    data: {title: 'ORDER_DETAIL'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule {
}
