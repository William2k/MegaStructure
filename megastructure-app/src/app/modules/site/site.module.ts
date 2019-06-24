import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site-routing.module';

@NgModule({
  declarations: [SiteComponent],
  imports: [SharedModule, SiteRoutingModule],
  exports: [],
  providers: []
})
export class SiteModule {}
