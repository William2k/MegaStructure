import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { BuildComponent } from './build,component';
import { BuildLayoutComponent } from 'src/app/layouts/build/layout/build-layout.component';
import { BuildRoutingModule } from './build-routing.module';
import { BuildNavComponent } from 'src/app/layouts/build/nav/build-nav.component';
import { ManageSitesComponent } from './manage-sites/manage-sites.component';
import { SiteInfoComponent } from './manage-sites/site-info/site-info.component';
import { EditSiteComponent } from './manage-sites/edit-site/edit-site.component';
import { SiteElementComponent } from './manage-sites/edit-site/site-element/site-element.component';
import { EditSiteServiceModule } from './manage-sites/edit-site/edit-site-service-module';
import { EditElementComponent } from './manage-sites/edit-site/edit-element/edit-element.component';
import { JssPipe } from 'src/app/shared/pipes/jss.pipe';
import { SiteMapComponent } from './manage-sites/site-map/site-map.component';
import { PageComponent } from './manage-sites/site-map/page/page.component';

@NgModule({
  declarations: [
    JssPipe,
    BuildComponent,
    BuildLayoutComponent,
    BuildNavComponent,
    ManageSitesComponent,
    SiteInfoComponent,
    SiteMapComponent,
    EditSiteComponent,
    SiteElementComponent,
    EditElementComponent,
    PageComponent
  ],
  imports: [BuildRoutingModule, SharedModule, EditSiteServiceModule],
  entryComponents: [SiteInfoComponent, SiteMapComponent],
  exports: [],
  providers: []
})
export class BuildModule {}
