import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent, ProductManagementComponent} from './components';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: {title: 'ADMIN_DASHBOARD'}
  },
  {
    path: 'product',
    component: ProductManagementComponent,
    data: {title: 'PRODUCT_MANAGEMENT'}
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    data: {title: 'PRODUCT_MANAGEMENT'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
