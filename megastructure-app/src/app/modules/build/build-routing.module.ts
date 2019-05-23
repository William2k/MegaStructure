import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildComponent } from './build,component';
import { BuildLayoutComponent } from 'src/app/layouts/build/layout/build-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BuildLayoutComponent,
    children: [
      { path: '', component: BuildComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildRoutingModule {}
