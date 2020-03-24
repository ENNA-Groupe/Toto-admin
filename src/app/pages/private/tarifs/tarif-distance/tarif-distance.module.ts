import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifDistancePageRoutingModule } from './tarif-distance-routing.module';

import { TarifDistancePage } from './tarif-distance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifDistancePageRoutingModule
  ],
  declarations: [TarifDistancePage]
})
export class TarifDistancePageModule {}
