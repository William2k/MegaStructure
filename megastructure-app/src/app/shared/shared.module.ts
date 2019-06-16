import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MaterialModule } from './material.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    AngularFontAwesomeModule,
    ColorPickerModule
  ]
})
export class SharedModule {}
