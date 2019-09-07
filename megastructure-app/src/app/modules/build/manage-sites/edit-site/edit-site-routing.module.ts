import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSiteComponent } from './edit-site.component';

const routes: Routes = [
  { path: '**', component: EditSiteComponent,  pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSiteRoutingModule {}
