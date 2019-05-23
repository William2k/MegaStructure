import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { BuildComponent } from './build,component';
import { BuildLayoutComponent } from 'src/app/layouts/build/layout/build-layout.component';
import { BuildRoutingModule } from './build-routing.module';
import { BuildNavComponent } from 'src/app/layouts/build/nav/build-nav.component';

@NgModule({
  declarations: [BuildComponent, BuildLayoutComponent, BuildNavComponent],
  imports: [BuildRoutingModule, SharedModule],
  exports: [],
  providers: []
})
export class BuildModule {}
