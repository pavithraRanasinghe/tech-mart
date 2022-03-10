import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {DialogComponent, HeaderComponent, HomeComponent, LoginComponent, SidenavListComponent} from './common/components';
import {ErrorInterceptor, JwtInterceptor} from './common/helpers';
import {AppUserService} from './common/services';
import {MaterialModule} from './material.module';
import {LibModule} from './lib.module';
import {CommonModule} from './common/common.module';
import {RegisterComponent} from './common/components';

export function initializeApp(appUserService: AppUserService): any {
  return (): Promise<void> => appUserService.loadUserData();
}

@NgModule({
  imports: [
    AppRoutingModule,
    MaterialModule,
    LibModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidenavListComponent,
    HeaderComponent,
    DialogComponent,
    RegisterComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppUserService], multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
