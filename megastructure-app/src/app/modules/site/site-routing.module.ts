import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteComponent } from './site.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: SiteComponent,  pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {}
