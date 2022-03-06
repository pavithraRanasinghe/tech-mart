import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { LibModule } from '../lib.module';
import { BackOfficeRoutingModule } from './back-office-routing';
import { BoDashboardComponent } from './components';
import { PermissionDirective } from '../common/helpers';
import { CommonModule } from '../common/common.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    BoDashboardComponent,
    PermissionDirective,
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
export class BackOfficeModule { }
