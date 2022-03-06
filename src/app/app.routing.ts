import {RouterModule, Routes} from '@angular/router';
import {HomeComponent, LoginComponent} from './common/components';
import {AuthGuard} from './common/helpers';
import {NgModule} from '@angular/core';
import {UserType} from './common/models/enums/user-types';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {title: 'DASHBOARD'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {register: true, title: 'LOGIN'}
  },
  {
    path: 'back-office',
    loadChildren: () => import('./back-office/back-office-module').then(m => m.BackOfficeModule),
    canActivate: [AuthGuard],
    data: {userType: UserType.backOffice}
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {userType: UserType.admin}
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer-module').then(m => m.CustomerModule),
    canActivate: [AuthGuard],
    data: {userType: UserType.customer}
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
