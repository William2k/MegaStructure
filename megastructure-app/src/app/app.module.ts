import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RootStoreModule } from './store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { API_BASE_URL } from './config';
import { environment } from '../environments/environment';
import { AppService } from './core/services/app.service';
import { CustomHttpInterceptor } from './core/http-interceptor';

import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RootStoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    { provide: API_BASE_URL, useValue: environment.baseApiUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: (appService: AppService) => () => {
        appService.initialise();
      },
      deps: [AppService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
