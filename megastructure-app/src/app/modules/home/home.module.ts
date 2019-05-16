import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { ContentLayoutComponent } from 'src/app/layouts/content-layout/content-layout.component';
import { NavComponent } from 'src/app/layouts/nav/nav.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContentLayoutComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [HomeRoutingModule, SharedModule],
  exports: [],
  providers: []
})
export class HomeModule {}
