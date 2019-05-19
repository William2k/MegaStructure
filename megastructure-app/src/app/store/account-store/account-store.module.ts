import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AccountEffects } from './effects';
import { accountReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('account', accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ],
  providers: [AccountEffects]
})
export class AccountStoreModule {}
