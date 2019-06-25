import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'build',
    loadChildren: () =>
      import('./modules/build/build.module').then(mod => mod.BuildModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'site',
    loadChildren: () =>
      import('./modules/site/site.module').then(mod => mod.SiteModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
