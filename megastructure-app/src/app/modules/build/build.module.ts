import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { BuildComponent } from './build,component';
import { BuildLayoutComponent } from 'src/app/layouts/build/layout/build-layout.component';
import { BuildRoutingModule } from './build-routing.module';
import { BuildNavComponent } from 'src/app/layouts/build/nav/build-nav.component';
import { ManageSitesComponent } from './manage-sites/manage-sites.component';
import { SiteInfoComponent } from './manage-sites/Site/site-info.component';

@NgModule({
  declarations: [
    BuildComponent,
    BuildLayoutComponent,
    BuildNavComponent,
    ManageSitesComponent,
    SiteInfoComponent
  ],
  imports: [BuildRoutingModule, SharedModule],
  entryComponents: [SiteInfoComponent],
  exports: [],
  providers: []
})
export class BuildModule {}
