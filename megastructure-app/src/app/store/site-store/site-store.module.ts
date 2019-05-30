import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SiteEffects } from './effects';
import { siteReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('site', siteReducer),
    EffectsModule.forFeature([SiteEffects])
  ],
  providers: [SiteEffects]
})
export class SiteStoreModule {}
