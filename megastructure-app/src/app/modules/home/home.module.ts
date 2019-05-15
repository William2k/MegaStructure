import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { ContentLayoutComponent } from 'src/app/layouts/content-layout/content-layout.component';
import { NavComponent } from 'src/app/layouts/nav/nav.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, ContentLayoutComponent, NavComponent, FooterComponent],
  imports: [HomeRoutingModule],
  exports: [],
  providers: []
})
export class HomeModule {}
