import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildComponent } from './build,component';
import { BuildLayoutComponent } from 'src/app/layouts/build/layout/build-layout.component';
import { ManageSitesComponent } from './manage-sites/manage-sites.component';
import { SiteResolver } from './resolvers/site.resolver';
import { ViewSiteComponent } from './manage-sites/view-site/view-site.component';

const routes: Routes = [
  {
    path: '',
    component: BuildLayoutComponent,
    children: [
      { path: '', component: BuildComponent },
      {
        path: 'manage-sites',
        component: ManageSitesComponent,
        resolve: { sites: SiteResolver }
      },
      {
        path: 'manage-sites/add',
        component: ManageSitesComponent,
        resolve: { sites: SiteResolver }
      },
      {
        path: 'manage-sites/view/:sitename',
        component: ViewSiteComponent,
        resolve: { sites: SiteResolver }
      },
      {
        path: 'manage-sites/view/:sitename/:page',
        component: ViewSiteComponent,
        resolve: { sites: SiteResolver }
      },
      {
        path: 'manage-sites/:sitename',
        component: ManageSitesComponent,
        resolve: { sites: SiteResolver }
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SiteResolver]
})
export class BuildRoutingModule {}
