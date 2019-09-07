import { NgModule } from '@angular/core';

import { EditSiteRoutingModule } from './edit-site-routing.module';
import { EditSiteServiceModule } from './edit-site-service-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditSiteComponent } from './edit-site.component';
import { EditElementComponent } from './edit-element/edit-element.component';
import { SiteElementComponent } from './site-element/site-element.component';
import { JssPipe } from 'src/app/shared/pipes/jss.pipe';

@NgModule({
  declarations: [
    JssPipe,
    EditSiteComponent,
    EditElementComponent,
    SiteElementComponent
  ],
  imports: [EditSiteRoutingModule, SharedModule, EditSiteServiceModule]
})
export class EditSiteModule {}
