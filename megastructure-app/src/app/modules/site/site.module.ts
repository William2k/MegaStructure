import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site-routing.module';
import { ElementComponent } from './element/element.component';
import { StaticJssPipe } from 'src/app/shared/pipes/jss.pipe';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    SiteComponent,
    ElementComponent,
    NotFoundComponent,
    StaticJssPipe
  ],
  imports: [SharedModule, SiteRoutingModule],
  exports: [],
  providers: []
})
export class SiteModule {}
