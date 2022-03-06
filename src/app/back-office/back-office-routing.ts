import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoDashboardComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: BoDashboardComponent,
    data: {title: 'DASHBOARD'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule {
}
