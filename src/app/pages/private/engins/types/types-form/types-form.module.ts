import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypesFormPageRoutingModule } from './types-form-routing.module';

import { TypesFormPage } from './types-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypesFormPageRoutingModule
  ],
  declarations: [TypesFormPage]
})
export class TypesFormPageModule {}
