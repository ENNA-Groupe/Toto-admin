import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifDistanceFormPageRoutingModule } from './tarif-distance-form-routing.module';

import { TarifDistanceFormPage } from './tarif-distance-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifDistanceFormPageRoutingModule
  ],
  declarations: [TarifDistanceFormPage]
})
export class TarifDistanceFormPageModule {}
