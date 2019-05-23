import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'build', loadChildren: './modules/build/build.module#BuildModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
