import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifDistanceListPageRoutingModule } from './tarif-distance-list-routing.module';

import { TarifDistanceListPage } from './tarif-distance-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifDistanceListPageRoutingModule
  ],
  declarations: [TarifDistanceListPage]
})
export class TarifDistanceListPageModule {}
