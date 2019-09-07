import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { BuildComponent } from './build,component';
import { BuildLayoutComponent } from 'src/app/layouts/build/layout/build-layout.component';
import { BuildRoutingModule } from './build-routing.module';
import { BuildNavComponent } from 'src/app/layouts/build/nav/build-nav.component';
import { ManageSitesComponent } from './manage-sites/manage-sites.component';
import { SiteInfoComponent } from './manage-sites/site-info/site-info.component';
import { SiteMapComponent } from './manage-sites/site-map/site-map.component';
import { PageComponent } from './manage-sites/site-map/page/page.component';
import { EditPageComponent } from './manage-sites/site-map/edit-page/edit-page.component';

@NgModule({
  declarations: [
    BuildComponent,
    BuildLayoutComponent,
    BuildNavComponent,
    ManageSitesComponent,
    SiteInfoComponent,
    SiteMapComponent,
    PageComponent,
    EditPageComponent
  ],
  imports: [BuildRoutingModule, SharedModule],
  entryComponents: [SiteInfoComponent, SiteMapComponent],
  exports: [],
  providers: []
})
export class BuildModule {}
