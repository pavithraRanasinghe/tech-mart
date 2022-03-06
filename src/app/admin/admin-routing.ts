import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent, ProductManagementComponent, SaleAgentComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: {title: 'ADMIN_DASHBOARD'}
  },
  {
    path: 'sale-agent',
    component: SaleAgentComponent,
    data: {title: 'SALES_AGENT'}
  },
  {
    path: 'product',
    component: ProductManagementComponent,
    data: {title: 'PRODUCT_MANAGEMENT'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {
}
