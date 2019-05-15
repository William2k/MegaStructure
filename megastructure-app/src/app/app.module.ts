import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { API_BASE_URL } from './config';
import { environment } from '../environments/environment';
import { AppService } from './core/services/app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
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
