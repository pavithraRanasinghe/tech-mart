import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from './components';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {CartComponent} from './components/cart/cart.component';
import {ProductsComponent} from './components/products/products.component';

const routes: Routes = [
  {
    path: '12',
    component: AdminDashboardComponent,
    data: {title: 'ADMIN_DASHBOARD'}
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    data: {title: 'PRODUCT_MANAGEMENT'}
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
